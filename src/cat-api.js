// Define the API URL
const fetchBreedsUrl = 'https://api.thecatapi.com/v1/breeds';
const fetchCatByBreedUrl =
  'https://api.thecatapi.com/v1/images/search?breed_ids=';
export function fetchBreeds() {
  return fetch(fetchBreedsUrl).then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  });
}

export function fetchCatByBreed(breedId) {
  return fetch(fetchCatByBreedUrl + breedId).then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  });
}
