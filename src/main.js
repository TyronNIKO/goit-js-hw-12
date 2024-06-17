import { pixabayRequest } from './js/pixabay-api';
import { showError } from './js/render-function';
import JsLoader from './js/js-loader';

const fetchPhotoForm = document.querySelector('form');
const photoList = document.querySelector('.photo-list');
const jsLoader = new JsLoader();
jsLoader.init();

let searchParams = new URLSearchParams({
  key: '7706316-da1567048322714709989c4f8',
  q: '',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
});

fetchPhotoForm.addEventListener('submit', e => {
  e.preventDefault();
  const inputValue = fetchPhotoForm.elements[0].value.trim();
  if (!inputValue) {
    showError('Info', 'Search input must be filled!');
    return;
  }
  searchParams.set('q', fetchPhotoForm.elements[0].value);
  pixabayRequest(searchParams, photoList);
});
