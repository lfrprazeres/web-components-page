import styles from './styles.scss';

const selectTemplate = document.createElement('template');

selectTemplate.innerHTML = `
  <div class="select-container">
    <h2><slot></slot></h2>
    <select>
    </select>
    <style>
      ${styles}
    </style>
  </div>
`;

export class Select extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    const select = selectTemplate.content.cloneNode(true);
    this.shadowRoot.appendChild(select);
  }
}