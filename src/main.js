import { pixabayRequest } from './js/pixabay-api';
import {
  createMarkup,
  renderMarkup,
  clearMarkup,
  showError,
} from './js/render-function';
import JsLoader from './js/js-loader';
import { scrollItems } from './js/scrollItems';
import { loadMore } from './js/loadMoreBtn';

const REFS = {
  form: document.querySelector('form'),
  gallery: document.querySelector('.photo-list'),
};
const ERROR = {
  inputEmpty: 'Search input must be filled!',
  noData: "We're sorry, but you've reached the end of search results.",
  wrongInput:
    'Sorry, there are no images matching your search query. Please try again!',
};

const jsLoader = new JsLoader();

let searchParams = new URLSearchParams({
  key: '7706316-da1567048322714709989c4f8',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  page: 1,
  per_page: 15,
});
let OPTIONS = {
  request_page: 1,
  perPage: searchParams.get('per_page'),
};
const validateData = {
  pageLimit(data) {
    OPTIONS.limit = Math.ceil(data.totalHits / OPTIONS.perPage);
    return OPTIONS.request_page >= OPTIONS.limit;
  },
  hits(data) {
    return !data.hits || data.hits.length == 0;
  },
};

function handleError(message, error) {
  console.log(error);
  showError('Error', message);
  jsLoader.remove();
}

function handleData(data, more) {
  if (validateData.hits(data)) {
    handleError(ERROR.noData, new Error('No data'));
    loadMore.hide();
    clearMarkup(REFS.gallery);
    return;
  }

  if (!more) clearMarkup(REFS.gallery);
  renderMarkup(createMarkup(data.hits), REFS.gallery, false);

  if (validateData.pageLimit(data)) {
    loadMore.hide();
    throw new Error('No more pages');
  } else {
    loadMore.show();
  }
}

async function fetchData(message, more) {
  jsLoader.show();
  setTimeout(async () => {
    try {
      const data = await pixabayRequest(searchParams);
      handleData(data, more);
      jsLoader.remove();
    } catch (error) {
      handleError(message, error);
    }
  }, 2000);
}

//SUBMIT or NEW SEARCH
REFS.form.addEventListener('submit', async e => {
  e.preventDefault();
  OPTIONS.request_page = 1;
  const inputValue = REFS.form.elements[0].value.trim();
  if (!inputValue) {
    showError('Info', ERROR.inputEmpty);
    return;
  }
  searchParams.set('q', inputValue);
  searchParams.set('page', 1);

  await fetchData(ERROR.noData, false);
});
//CLICK or LOAD MORE
loadMore.btn.addEventListener('click', async e => {
  e.preventDefault();
  loadMore.hide();
  searchParams.set('page', ++OPTIONS.request_page);

  await fetchData(ERROR.wrongInput, true);
  scrollItems();
});
