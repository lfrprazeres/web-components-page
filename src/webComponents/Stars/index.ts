import starsTemplate from './template.html';

import fillStar from './fillStar.svg';
import halfStar from './halfStar.svg';
import outlineStar from './outlineStar.svg';

const template = document.createElement('template');

template.innerHTML = starsTemplate;

export class Stars extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    const rating = parseFloat(this.getAttribute('rating'));
    const stars = template.content.cloneNode(true);
    this.shadowRoot.appendChild(stars);
    Array.from({ length: 5 }, (_, index) => {
      const id = index + 1;
      const star = document.createElement('span');
      $(star).attr('class', 'star')
      let currentSvg = fillStar;
      if (id > rating) currentSvg = outlineStar;

      if ((id - 1) === Math.floor(rating) && rating % 1 !== 0) {
        currentSvg = halfStar
      };
      star.innerHTML = currentSvg;
      this.shadowRoot.querySelector('.stars-container').appendChild(star);
    });
    const reviews = this.getAttribute('reviews');
    const reviewsElement = document.createElement('span');
    $(reviewsElement).attr('class', 'reviews')
    reviewsElement.innerHTML = `${reviews} reviews`;
    this.shadowRoot.querySelector('.stars-container').appendChild(reviewsElement);
  }
}