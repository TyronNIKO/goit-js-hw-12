import { pixabayRequest } from './js/pixabay-api';
import { renderPhoto, showError } from './js/render-function';
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
  //   per_page: 15,
  per_page: 50,
});
let OPTIONS = {};
OPTIONS.request_page = 1;
REFS.searchForm.addEventListener('submit', async e => {
  e.preventDefault();
  const inputValue = REFS.searchForm.elements[0].value.trim();
  if (!inputValue) {
    showError('Info', 'Search input must be filled!');
    return;
  }
  searchParams.set('q', inputValue);
  OPTIONS.request_page = 1;
  try {
    jsLoader.createInterval(jsLoader.options);
    const data = await pixabayRequest(searchParams);
    if (!data.hits || data.hits.length === 0)
      throw new Error('Error! Nothing to load');
    await renderPhoto(data.hits, REFS.photoList, false);
    jsLoader.removeInterval(jsLoader.interval);
    REFS.loadMore.classList.remove('js-hidden');
  } catch (error) {
    showError(
      'Error',
      "We're sorry, but you've reached the end of search results."
    );
  }
});
REFS.loadMore.addEventListener('click', async e => {
  e.preventDefault();
  REFS.loadMore.classList.add('js-hidden');
  searchParams.set('page', ++OPTIONS.request_page);
  OPTIONS.perPage = searchParams.get('per_page');
  try {
    const data = await pixabayRequest(searchParams);
    if (!data.hits || data.hits.length === 0)
      throw new Error('Error! Nothing to load');
    await renderPhoto(data.hits, REFS.photoList, true);
    const firstItem = document.querySelector('.gallery li');
    if (firstItem) {
      const { height } = firstItem.getBoundingClientRect();
      window.scrollBy({ top: (height + 20) * 2, behavior: 'smooth' });
    }
    OPTIONS.limit = Math.ceil(data.totalHits / OPTIONS.perPage);
    if (OPTIONS.limit < OPTIONS.request_page) {
      REFS.loadMore.classList.add('js-hidden');
      throw new Error('Error! Nothing to load');
    }
    jsLoader.removeInterval(jsLoader.interval);
    REFS.loadMore.classList.remove('js-hidden');
  } catch (error) {
    showError(
      'Error',
      'Sorry, there are no images matching your search query. Please try again!'
    );
  }
});
