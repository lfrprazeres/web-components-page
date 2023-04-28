export default interface CardProps {
  description: string,
  length: number,
  length_type: string,
  name: string,
  operator_name: string,
  cities: CardCity[],
  dates: CardDate[],
  images: CardImage[],
  rating: number,
  reviews: number
}

export interface CardCity {
  name: string,
  lng: number,
  lat: number
}

export interface CardDate {
  start: string,
  aud: number,
  cad: number,
  eur: number,
  gbp: number,
  nzd: number,
  usd: number,
  availability: number,
  departure_type: string,
  discount: string
}

export interface CardImage {
  is_primary: boolean,
  url: string
}