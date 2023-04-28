import styles from "./styles.scss";

const cardTemplate = document.createElement("template");

cardTemplate.innerHTML = `
  <div class="card-container">
    <div class="card-image">
      <slot name="image"></slot>
    </div>
    <div class="card-description">
      <slot
        name="name"
        class="card-description-title"
      >
      </slot>
      <div class="card-description-stars">
        <slot name="stars"></slot>
      </div>
      <div class="card-details">
        <div class="card-details-item">
          <h3>
            DESTINATIONS
          </h3>
          <div class="card-details-item--operator">
            <slot name="destinations"></slot>
            <div class="card-details-item--moreDestinations">
              <slot name="more-destinations"></slot>
            </div>
          </div>
        </div>
        <div class="card-details-item">
          <h3>
            STARTS/ ENDS IN
          </h3>
          <div class="card-details-item--operator">
            <slot name="starts-ends"></slot>
          </div>
        </div>
        <div class="card-details-item">
          <h3>
            OPERATOR
          </h3>
          <div class="card-details-item--operator">
            <slot name="operator"></slot>
          </div>
        </div>
      </div>
      <div class="card-values">
        <div class="card-values-duration">
          <h3>
            Duration
          </h3>
          <div class="card-values-duration--slot">
            <slot name="duration"> 4 days </slot>
          </div>
        </div>
        <div class="card-values-from">
          <h3>
            From
          </h3>
          <div class="card-values-from--slot">
            <slot name="from"></slot>
          </div>
        </div>
      </div>
      <div class="card-dates">
        <div class="card-dates-item">
          <div class="card-dates-date">
            <slot name="firstDate">28 APR 2019</slot>
          </div>
          <div class="card-dates-availability">
            <slot name="firstAvailability"> 10 spaces left</slot>
          </div>
        </div>
        <div class="card-dates-item">
          <div class="card-dates-date">
            <slot name="secondDate"> 29 APR 2019</slot>
          </div>
          <div class="card-dates-availability">
            <slot name="secondAvailability"> 10 spaces left </slot>
          </div>
        </div>
      </div>
      <button class="card-button">
        View Tour
      </button>
    </div>
  </div>
  <style>
    ${styles}
  </style>
`;

export class Card extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    const card = cardTemplate.content.cloneNode(true);
    shadow.append(card);
  }
}
