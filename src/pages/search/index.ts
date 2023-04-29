import "./styles.scss";
import { createCard } from "../../components/Card";
import { getSearchResults } from "../../services/searchPage";

const formatDate = (date: Date) =>
  date.toLocaleDateString("de-AT", { month: "short", year: "numeric" });

export async function renderSearchPage() {
  const data = await getSearchResults();
  const cardsContainer = document.createElement("div");
  const dates = data
    .map((card) => card.dates.map((date) => new Date(date.start)))
    .flat()
    .sort((a: Date, b: Date) => (a.getTime() > b.getTime() ? 1 : -1));

  const filteredDates = [...new Set(dates?.map((date) => formatDate(date)))];

  const filterByOptions = filteredDates
    .map(
      (filteredDate) =>
        `<option value="${filteredDate}">${filteredDate}</option>`
    )
    .join();

  const filterBySelect = `<tr-select label="Filter by" id="filterBy"><option value="">Departure Date</option>${filterByOptions}</tr-select>`;
  $("#container").append(`
    <div class="filters-container">
      <tr-select label="Sort by" id="sortBy">
        <option value="">Popularity</option>
        <option value="lowest"> Lowest Price </option>
        <option value="highest"> Highest Price </option>
        <option value="longest"> Longest Tour </option>
        <option value="shortest"> Shortest Tour </option>
      </tr-select>
      ${filterBySelect}
    </div>
  `);

  $("#container").attr('style', 'height: 100%');
  $(cardsContainer).attr("id", "cards-container").attr('style', 'height: 100%');
  $("#container").append(cardsContainer);
  for (const card of data) {
    createCard("cards-container", card);
  }

  const sortByElement = document
    .querySelector("#sortBy")
    .shadowRoot.querySelector("select");
  const filterByElement = document
    .querySelector("#filterBy")
    .shadowRoot.querySelector("select");
  $(sortByElement).on("change", (event) => {
    const sortType = event.target.value;
    const cards = $("tr-card");
    const sortedCards = Array.prototype.sort.call(
      cards,
      (a: HTMLElement, b: HTMLElement) => {
        if (sortType === '') {
          const aReviews = parseFloat($(a).attr("reviews"));
          const bReviews = parseFloat($(b).attr("reviews"));
          return aReviews < bReviews ? 1 : -1;
        }
        if (['lowest', 'highest'].includes(sortType)) {
          const aPrice = parseFloat($(a).attr("price"));
          const bPrice = parseFloat($(b).attr("price"));
          if (sortType === 'lowest') return aPrice > bPrice ? 1 : -1;
          if (sortType === 'highest') return aPrice < bPrice ? 1 : -1;
        }
        if (['longest', 'shortest'].includes(sortType)) {
          const aTour = parseFloat($(a).attr("tour"));
          const bTour = parseFloat($(b).attr("tour"));
          if (sortType === 'longest') return aTour < bTour ? 1 : -1;
          if (sortType === 'shortest') return aTour > bTour ? 1 : -1;
        }
      }
    );
    $("#cards-container").append(sortedCards);
  });
  $(filterByElement).on("change", (event) => {
    $("tr-card").each((_, element) => {
      if (event.target.value === "") {
        $(element).attr("show", "true");
        return;
      }
      const cardName = $(element).attr("name");
      const currentData = data.find((card) => card.name === cardName);
      const someDeparture = currentData.dates.some((date) => {
        const formatedDate = formatDate(new Date(date.start));
        return formatedDate === event.target.value;
      });

      $(element).attr("show", String(someDeparture));
    });
  });
}
