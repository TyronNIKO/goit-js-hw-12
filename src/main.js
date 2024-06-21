import { pixabayRequest } from './js/pixabay-api';
import { renderPhoto, showError } from './js/render-function';
import JsLoader from './js/js-loader';

const REFS = {
  form: document.querySelector('form'),
  gallery: document.querySelector('.photo-list'),
  loadMore: document.querySelector('button[data-request="load-more"]'),
};

const jsLoader = new JsLoader();
jsLoader.init();

let searchParams = new URLSearchParams({
  key: '7706316-da1567048322714709989c4f8',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  page: 1,
  per_page: 15,
  //   per_page: 50,
});
let OPTIONS = {};
OPTIONS.request_page = 1;
function validatePageLimit() {
  OPTIONS.limit = Math.ceil(data.totalHits / OPTIONS.perPage);
  return OPTIONS.limit < OPTIONS.request_page;
}
function scrollItems() {
  const firstItem = document.querySelector('.gallery li');
  if (firstItem) {
    const { height } = firstItem.getBoundingClientRect();
    window.scrollBy({ top: (height + 20) * 2, behavior: 'smooth' });
  }
}
REFS.form.addEventListener('submit', async e => {
  e.preventDefault();
  console.log(OPTIONS);

  const inputValue = REFS.form.elements[0].value.trim();
  if (!inputValue) {
    showError('Info', 'Search input must be filled!');
    return;
  }
  searchParams.set('q', inputValue);
  OPTIONS.request_page = 1;
  try {
    jsLoader.init(jsLoader.options);
    const data = await pixabayRequest(searchParams);
    if (!data.hits || data.hits.length === 0)
      throw new Error('Error! Nothing to load');
    await renderPhoto(data.hits, REFS.gallery, false);
    if (validatePageLimit()) {
      REFS.loadMore.classList.add('js-hidden');
      throw new Error('Error! Nothing to load');
    }
    jsLoader.remove(jsLoader.interval);
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
  console.log(OPTIONS);
  REFS.loadMore.classList.add('js-hidden');
  searchParams.set('page', ++OPTIONS.request_page);
  OPTIONS.perPage = searchParams.get('per_page');
  try {
    const data = await pixabayRequest(searchParams);
    if (!data.hits || data.hits.length === 0)
      throw new Error('Error! Nothing to load');
    await renderPhoto(data.hits, REFS.gallery, true);

    scrollItems();

    if (validatePageLimit()) {
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
