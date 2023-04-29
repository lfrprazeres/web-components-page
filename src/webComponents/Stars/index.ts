import starsTemplate from "./template.html";
import styles from './styles.scss';

import fillStar from "./fillStar.svg";
import halfStar from "./halfStar.svg";
import outlineStar from "./outlineStar.svg";

const template = document.createElement("template");

template.innerHTML = starsTemplate + `<style>${styles}</style>`;

export class Stars extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const rating = parseFloat(this.getAttribute('rating'));
    const stars = template.content.cloneNode(true);

    this.shadowRoot.appendChild(stars);
    Array.from({ length: 5 }, (_, index) => {
      const id = index + 1;
      let currentSvg = fillStar;
      if (id > rating) currentSvg = outlineStar;

      if ((id - 1) === Math.floor(rating) && rating % 1 !== 0) {
        currentSvg = halfStar
      };
      
      this.shadowRoot.querySelector('.stars-container').innerHTML += currentSvg;
    });
    const reviews = this.getAttribute('reviews');
    const reviewsElement = document.createElement('span');
    reviewsElement.classList.add('reviews');
    reviewsElement.innerHTML = `${reviews} reviews`;
    this.shadowRoot.querySelector('.stars-container').appendChild(reviewsElement);
  }
}

customElements.define('tr-stars-rate', Stars);
