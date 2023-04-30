import cardTemplate from './template.html';
import style from './styles.scss';

const template = document.createElement("template");
template.innerHTML = cardTemplate + `<style>${style}</style>`;

export class Card extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    const card = template.content.cloneNode(true);
    shadow.append(card);
  }

  connectedCallback() {
    const discount = this.getAttribute('discount');
    if (discount !== 'undefined') {
      const discountContainer = document.createElement('div');
      discountContainer.classList.add('card-container-discount');
      const div = document.createElement('div');
      div.innerHTML = discount;
      discountContainer.append(div);
      this.shadowRoot.querySelector('.card-container').append(discountContainer);
    };
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

customElements.define('tr-card', Card);
