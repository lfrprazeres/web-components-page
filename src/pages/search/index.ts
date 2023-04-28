import './styles.scss';
import { createCard } from '../../components/Card';
import { getSearchResults } from '../../services/searchPage';

export async function renderSearchPage() {
  const data = await getSearchResults();
  const cardsContainer = document.createElement("div");
  $(cardsContainer).attr("id", "cards-container");
  $(cardsContainer).append(`
    <div class="filters-container">
      <tr-select>Sort by</tr-select>
      <tr-select> Filter by </tr-select>
    </div>
  `);
  $("#container").append(cardsContainer);
  for (const card of data) { createCard("cards-container", card); }
}