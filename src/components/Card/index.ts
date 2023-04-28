import CardProps, { CardImage } from 'types/card';

const dateOptions: Intl.DateTimeFormatOptions  = { year: 'numeric', month: 'short', day: 'numeric' };

const handleAvailabilityText = (availability: number): string => availability === 1 ? 'spaces left' : 'space left';

export function createCard(
  root: string,
  props: CardProps
): void {
  const { name, images, rating, reviews, operator_name, cities, length, dates } = props;

  const primaryImage = images.find((image: CardImage) => image.is_primary);

  const destinations = cities.map(city => city.name);
  const twoFirstDestinations = [destinations[0], destinations[1]].join(', ');
  const firstDestination = cities[0].name;
  const lastDestination = cities[cities.length - 1].name;
  const moreDestinations = destinations.length - 2;

  const firstDateData = dates[0];
  const firstAvailabilityText = handleAvailabilityText(firstDateData.availability);
  const firstDate = new Date(firstDateData.start).toLocaleDateString('de-AT', dateOptions);

  const secondDateData = dates[1];
  const secondAvailabilityText = handleAvailabilityText(secondDateData.availability);
  const secondDate = new Date(secondDateData.start).toLocaleDateString('de-AT', dateOptions);
  
  $(`#${root}`).append(`
    <card-container>
      <img
        slot="image"
        src="${primaryImage?.url || images[0]?.url}"
        alt="${name}"
      />
      <h2 slot="name"> ${name} </h2>
      <stars-rate slot="stars" rating="${rating}" reviews="${reviews}">
      </stars-rate>
      <p slot="operator"> ${operator_name} </p>
      <p slot="destinations"> ${twoFirstDestinations} </p>
      <span slot="more-destinations">+${moreDestinations} more</span>
      <p slot="starts-ends">${firstDestination} / ${lastDestination}</p>
      <p slot="duration">${length} day${length === 1 ? '' : 's'}</p>
      <p slot="from"> €${firstDateData.eur} </p>
      <p slot="firstDate"> ${firstDate} </p>
      <p slot="firstAvailability"> ${firstDateData.availability} ${firstAvailabilityText} </p>
      <p slot="secondDate"> ${secondDate} </p>
      <p slot="secondAvailability"> ${secondDateData.availability} ${secondAvailabilityText} </p>
    </card-container>
  `);
}

