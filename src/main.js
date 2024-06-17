import { pixabayRequestNew, pixabayRequestMore } from './js/pixabay-api';
import { showError } from './js/render-function';
import JsLoader from './js/js-loader';

const serachForm = document.querySelector('form');
const photoList = document.querySelector('.photo-list');
const loadMore = document.querySelector('button[data-request="load-more"]');
const jsLoader = new JsLoader();
jsLoader.init();

let searchParams = new URLSearchParams({
  key: '7706316-da1567048322714709989c4f8',
  q: '',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  page: 1,
  //   per_page: 15,
  per_page: 50,
});
let REQUEST_PAGE = 1;
serachForm.addEventListener('submit', e => {
  e.preventDefault();
  const inputValue = serachForm.elements[0].value.trim();
  if (!inputValue) {
    showError('Info', 'Search input must be filled!');
    return;
  }
  searchParams.set('q', inputValue);
  pixabayRequestNew(searchParams, photoList);
});
loadMore.addEventListener('click', e => {
  e.preventDefault();
  searchParams.set('page', REQUEST_PAGE);
  REQUEST_PAGE++;
  pixabayRequestMore(searchParams, photoList);
});
