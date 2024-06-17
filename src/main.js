import { pixabayRequest } from './js/pixabay-api';
import { showError } from './js/render-function';
import JsLoader from './js/js-loader';

const REFS = {
  searchForm: document.querySelector('form'),
  photoList: document.querySelector('.photo-list'),
  loadMore: document.querySelector('button[data-request="load-more"]'),
};

const jsLoader = new JsLoader();
jsLoader.init();

let searchParams = new URLSearchParams({
  key: '7706316-da1567048322714709989c4f8',
  q: '',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  page: 1,
  per_page: 15,
  //   per_page: 50,
});
let REQUEST_PAGE = 1;
REFS.searchForm.addEventListener('submit', e => {
  e.preventDefault();
  const inputValue = REFS.searchForm.elements[0].value.trim();
  if (!inputValue) {
    showError('Info', 'Search input must be filled!');
    return;
  }
  searchParams.set('q', inputValue);
  REQUEST_PAGE = 1;
  pixabayRequest(searchParams, REFS.photoList, false).then(() => {
    REFS.loadMore.classList.remove('js-hidden');
  });
});

REFS.loadMore.addEventListener('click', e => {
  e.preventDefault();
  REFS.loadMore.classList.add('js-hidden');
  searchParams.set('page', ++REQUEST_PAGE);
  pixabayRequest(searchParams, REFS.photoList, true).then(() => {
    REFS.loadMore.classList.remove('js-hidden');
  });
});
