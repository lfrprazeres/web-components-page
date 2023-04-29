import cardTemplate from './template.html';
const template = document.createElement("template");
import './styles.scss';
template.innerHTML = cardTemplate;

export class Card extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    const cardList = template.content.cloneNode(true);
    shadow.append(cardList);
  }
  
  static get observedAttributes() {
    return ["show"];
  }

  attributeChangedCallback(
    attrName: string,
    oldValue: string,
    newValue: string
  ) {
    if (oldValue === newValue) return;

    if (attrName === "show") {
      this.style.display = newValue === "true" ? "block" : "none";
    }
  }
}
