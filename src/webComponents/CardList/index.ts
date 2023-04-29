import { getSearchResults } from "services/searchPage";
import { createCard } from "components/Card";
import cardListTemplate from "./template.html";
const template = document.createElement("template");

const formatDate = (date: Date) =>
  date.toLocaleDateString("de-AT", { month: "short", year: "numeric" });

template.innerHTML = cardListTemplate;

export class CardList extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    const card = template.content.cloneNode(true);
    shadow.append(card);
  }

  async connectedCallback() {
    const data = await getSearchResults();
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

    const filterBySelect = this.shadowRoot
      .querySelector("#filterBy")
      .shadowRoot.querySelector("select");

    const sortBySelect = this.shadowRoot
      .querySelector("#sortBy")
      .shadowRoot.querySelector("select");

    $(filterBySelect).append(filterByOptions);
    const cardsContainer = this.shadowRoot.querySelector("#cards-container");
    $(cardsContainer).empty();
    for (const card of data) {
      createCard(cardsContainer, card);
    }

    $(sortBySelect).on("change", (event) => {
      const sortType = event.target.value;
      const cards = $(this.shadowRoot).find("tr-card");
      const sortedCards = Array.prototype.sort.call(
        cards,
        (a: HTMLElement, b: HTMLElement) => {
          if (sortType === "") {
            const aReviews = parseFloat($(a).attr("reviews"));
            const bReviews = parseFloat($(b).attr("reviews"));
            return aReviews < bReviews ? 1 : -1;
          }
          if (["lowest", "highest"].includes(sortType)) {
            const aPrice = parseFloat($(a).attr("price"));
            const bPrice = parseFloat($(b).attr("price"));
            if (sortType === "lowest") return aPrice > bPrice ? 1 : -1;
            if (sortType === "highest") return aPrice < bPrice ? 1 : -1;
          }
          if (["longest", "shortest"].includes(sortType)) {
            const aTour = parseFloat($(a).attr("tour"));
            const bTour = parseFloat($(b).attr("tour"));
            if (sortType === "longest") return aTour < bTour ? 1 : -1;
            if (sortType === "shortest") return aTour > bTour ? 1 : -1;
          }
        }
      );
      $(this.shadowRoot.querySelector("#cards-container")).append(sortedCards);
    });
    $(filterBySelect).on("change", (event) => {
      $(this.shadowRoot)
        .find("tr-card")
        .each((_, element) => {
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
}
