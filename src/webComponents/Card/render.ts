import CardProps, { CardImage } from "types/card";

const dateOptions: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "short",
  day: "numeric",
};

const handleAvailability = (availability: number = 0): string[] => [
  `${availability > 10 ? "10+" : availability} ${
    availability !== 1 ? "spaces left" : "space left"
  }`,
  `${availability <= 5 ? "red" : "black"}`,
];

export function createCard(
  root: Element,
  props: CardProps,
  show?: boolean
): void {
  const {
    name,
    images,
    rating,
    reviews,
    operator_name,
    cities,
    length,
    dates,
    description,
  } = props;

  const primaryImage = images.find((image: CardImage) => image.is_primary);

  const destinations = cities.map((city) => city.name);
  const twoFirstDestinations = [destinations[0], destinations[1]].join(", ");
  const firstDestination = cities[0].name;
  const lastDestination = cities[cities.length - 1].name;
  const moreDestinations = destinations.length - 2;

  const firstDateData = dates[0];
  const [firstAvailabilityText, firstAvailabilityColor] = handleAvailability(
    firstDateData?.availability
  );
  const firstDate = new Date(firstDateData?.start).toLocaleDateString(
    "de-AT",
    dateOptions
  );

  const secondDateData = dates[1];
  const [secondAvailabilityText, secondAvailabilityColor] = handleAvailability(
    secondDateData?.availability
  );
  const secondDate = new Date(secondDateData?.start).toLocaleDateString(
    "de-AT",
    dateOptions
  );
  const discount = firstDateData?.discount || secondDateData?.discount;
  const currentImageURL = primaryImage?.url || images[0]?.url;
  const cardElement = document.createElement("tr-card");
  
  cardElement.setAttribute("show", `${show || true}`);
  cardElement.setAttribute("name", `${name}`);
  cardElement.setAttribute("price", `${firstDateData?.eur || 0}`);
  cardElement.setAttribute("tour", `${length}`);
  cardElement.setAttribute("reviews", `${reviews || 0}`);
  cardElement.setAttribute("discount", discount);

  cardElement.innerHTML = `
    ${
      currentImageURL
        ? `<img
        slot="image"
        src="${currentImageURL}"
        alt="${name}"
        loading="lazy"
      />`
        : `<span slot="image" ></span>`
    }
    <h2 slot="name" data-testid="card-title"> ${name} </h2>
    <tr-stars-rate slot="stars" rating="${rating}" reviews="${reviews}"></tr-stars-rate>
    <p slot="description"> "${description}" </p>
    <p slot="operator"> ${operator_name} </p>
    <p slot="destinations"> ${twoFirstDestinations} </p>
    <span slot="more-destinations">+${moreDestinations} more</span>
    <p slot="starts-ends">${firstDestination} / ${lastDestination}</p>
    <p slot="duration"> ${length} day${length === 1 ? "" : "s"} </p>
    <p slot="from"> ${firstDateData?.eur ? "€" + firstDateData.eur : ""} </p>
    <p slot="firstDate"> ${firstDate || ""} </p>
    <p slot="firstAvailability" style="color: ${firstAvailabilityColor}"> ${firstAvailabilityText} </p>
    <p slot="secondDate"> ${secondDate || ""} </p>
    <p slot="secondAvailability" style="color: ${secondAvailabilityColor}"> ${secondAvailabilityText} </p>
  `;

  root.appendChild(cardElement);
}
