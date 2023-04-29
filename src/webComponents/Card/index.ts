import styles from "./styles.scss";

const cardTemplate = document.createElement("template");

cardTemplate.innerHTML = `
  <div class="card-container">
    <div class="card-image">
      <slot name="image"></slot>
    </div>
    <div class="card-content">
      <div class="card-description">
        <slot
          name="name"
          class="card-description-title"
        >
        </slot>
        <div class="card-description-stars">
          <slot name="stars"></slot>
        </div>
        <div class="card-description-text">
          <slot
            name="description"
          ></slot>
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
      </div>
      <div class="card-actions">
        <div class="card-actions-values">
          <div class="card-actions-values--duration">
            <h3>
              Duration
            </h3>
            <slot name="duration"> 7 days </slot>
          </div>
          <div class="card-actions-values--from">
            <h3>
              From
            </h3>
            <slot name="from"></slot>
          </div>
        </div>
        <div class="card-actions-dates">
          <div class="card-actions-dates--item">
            <div class="card-actions-dates--date">
              <slot name="firstDate"></slot>
            </div>
            <div class="card-actions-dates--availability">
              <slot name="firstAvailability"></slot>
            </div>
          </div>
          <div class="card-actions-dates--item">
            <div class="card-actions-dates--date">
              <slot name="secondDate"></slot>
            </div>
            <div class="card-actions-dates--availability">
              <slot name="secondAvailability"></slot>
            </div>
          </div>
        </div>
        <button class="card-actions-button">
          View Tour
        </button>
      </div>
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

  static get observedAttributes() { 
    return ['show']; 
  }

  attributeChangedCallback(attrName: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;

    if(attrName === 'show') {
      this.style.display = newValue === 'true' ? 'block' : 'none';
    }
  }
}
