import styles from './styles.scss';

const selectTemplate = document.createElement('template');

selectTemplate.innerHTML = `
  <div class="select-container">
    <h2></h2>
    <select>
      <slot></slot>
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
    const selectClone = selectTemplate.content.cloneNode(true);
    const options = this.querySelectorAll('option');
    this.shadowRoot.appendChild(selectClone);
    const select = this.shadowRoot.querySelector('select');
    options.forEach(option => { select.appendChild(option) })
    this.shadowRoot.querySelector('h2').append(this.getAttribute('label'));
    
  }
}