import './styles.scss';
import { createCard } from '../../components/Card';
import { getSearchResults } from '../../services/searchPage';

export async function renderSearchPage() {
  const data = await getSearchResults();
  const cardsContainer = document.createElement("div");
  $(cardsContainer).attr("id", "cards-container");
  $("#container").append(cardsContainer);
  for (const card of data) {
    console.log("card: ", card);
    createCard("cards-container", card);
  }
}