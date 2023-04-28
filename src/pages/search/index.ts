import "./styles.scss";
import { createCard } from "../../components/Card";
import { getSearchResults } from "../../services/searchPage";

export async function renderSearchPage() {
  const data = await getSearchResults();
  const cardsContainer = document.createElement("div");
  const dates = data
    .map((card) => card.dates.map((date) => new Date(date.start)))
    .flat()
    .sort((a: Date, b: Date) => a.getTime() > b.getTime() ? 1 : -1);

  const filteredDates = [
    ...new Set(dates.map(date => date.toLocaleDateString('de-AT', { month: 'short', year: 'numeric' })))
  ];
  
  const filterByOptions = filteredDates.map(filteredDate => `<option value="${filteredDate}">${filteredDate}</option>`).join();

  const filterBySelect = `<tr-select label="Filter by">${filterByOptions}</tr-select>`

  $(cardsContainer).attr("id", "cards-container");
  $(cardsContainer).append(`
    <div class="filters-container">
      <tr-select label="Sort by">
        <option value="lowest"> Lowest Price </option>
        <option value="highest"> Highest Price </option>
        <option value="longest"> Longest Tour </option>
        <option value="shortest"> Shortest Tour </option>
      </tr-select>
      ${filterBySelect}
    </div>
  `);
  $("#container").append(cardsContainer);
  for (const card of data) {
    createCard("cards-container", card);
  }
}
