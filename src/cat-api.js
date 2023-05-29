import Notiflix from 'notiflix';

const BASE_URL = 'https://api.thecatapi.com/v1/breeds';
const API = "live_XTVqmtwZCRUux0xyyuBoz9aUlTLhAmYM8XZI7lwTTnN9wNP285Bwa4shn7cLcow8";
const CAT_SEARCH = 'https://api.thecatapi.com/v1/images/search';

export function fetchBreeds(keyword){
      const params = new URLSearchParams({
          apikey: API,
          keyword
    });
    return fetch(`${BASE_URL}?${params}`)
    .then((r) => {
        if (!r.ok) {
            throw new error(r.status)
        }
        return r.json()
    })
    .catch((error) => Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!'));
};

export function fetchCatByBreed(breedId) {
    return fetch(`${CAT_SEARCH}?breed_ids=${breedId}&apikey=${API}`)
    .then((r) => {
        if (!r.ok) {
            throw new error(r.status)
        }
        return r.json()
    })
    .catch((error) => Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!'));
};