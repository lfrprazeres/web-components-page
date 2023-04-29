import CardProps from 'types/card';

const URL_PREFIX = ' https://mocki.io/v1/11356aa2-6371-41d4-9d49-77a5e9e9924f';

async function getSearchResults(): Promise<CardProps[]> {
  await setTimeout(() => {}, 5000)
  return fetch(URL_PREFIX)
    .then(response => response.json())
    .then(data => data);
}

export { getSearchResults };