import selectTemplate from './template.html';
import styles from './styles.scss';

const template = document.createElement("template");

template.innerHTML = selectTemplate + `<style>${styles}</style>`;

export class Select extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    const selectClone = template.content.cloneNode(true);
    const options = this.querySelectorAll("option");
    this.shadowRoot.appendChild(selectClone);
    const select = this.shadowRoot.querySelector("select");
    options.forEach((option) => {
      select.appendChild(option);
    });
    this.shadowRoot.querySelector("h2").append(this.getAttribute("label"));
  }
}
