import { getSearchResults } from "services/searchPage";
import { createCard } from "components/Card";
import cardListTemplate from "./template.html";
import styles from "./styles.scss";

const template = document.createElement("template");

const formatDate = (date: Date) =>
  date.toLocaleDateString("de-AT", { month: "short", year: "numeric" });

template.innerHTML = cardListTemplate + `<style>${styles}</style`;

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

    filterBySelect.innerHTML += filterByOptions;
    const cardsContainer = this.shadowRoot.querySelector("#cards-container");

    cardsContainer.textContent = "";
    for (const card of data) {
      createCard(cardsContainer, card);
    }

    sortBySelect.addEventListener("change", (event: Event) => {
      const sortType = (event.target as HTMLSelectElement).value;
      const cards = [...this.shadowRoot.querySelectorAll("tr-card")];
      const sortedCards = cards.sort((a: Element, b: Element) => {
        switch (sortType) {
          case "lowest":
          case "highest":
            const aPrice = parseFloat(a.getAttribute("price"));
            const bPrice = parseFloat(b.getAttribute("price"));
            if (sortType === "lowest") return aPrice > bPrice ? 1 : -1;
            if (sortType === "highest") return aPrice < bPrice ? 1 : -1;
            break;
          case "longest":
          case "shortest":
            const aTour = parseFloat(a.getAttribute("tour"));
            const bTour = parseFloat(b.getAttribute("tour"));
            if (sortType === "longest") return aTour < bTour ? 1 : -1;
            if (sortType === "shortest") return aTour > bTour ? 1 : -1;
            break;
          default:
            const aReviews = parseFloat(a.getAttribute("reviews"));
            const bReviews = parseFloat(b.getAttribute("reviews"));
            return aReviews < bReviews ? 1 : -1;
        }
      });

      for (const card of sortedCards) {
        this.shadowRoot.querySelector("#cards-container").append(card);
      }
    });

    filterBySelect.addEventListener("change", (event) => {
      const filterValue = (event.target as HTMLSelectElement).value;
      const cards = [...this.shadowRoot.querySelectorAll("tr-card")];
      cards.forEach((element) => {
        if (filterValue === "") {
          element.setAttribute('show', 'true');
          return;
        }
        const cardName = element.getAttribute("name");
        const currentData = data.find((card) => card.name === cardName);
        const someDeparture = currentData.dates.some((date) => {
          const formatedDate = formatDate(new Date(date.start));
          return formatedDate === filterValue;
        });
        element.setAttribute('show', String(someDeparture));
      });
    });
  }
}

customElements.define("tr-card-list", CardList);
