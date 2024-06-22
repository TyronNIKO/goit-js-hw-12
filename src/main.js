import { pixabayRequest } from './js/pixabay-api';
import { renderPhoto, showError } from './js/render-function';
import JsLoader from './js/js-loader';

const REFS = {
  form: document.querySelector('form'),
  gallery: document.querySelector('.photo-list'),
  loadMore: document.querySelector('button[data-request="load-more"]'),
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
let OPTIONS = {};
OPTIONS.request_page = 1;
OPTIONS.perPage = searchParams.get('per_page');
const validateData = {
  pageLimit(data) {
    OPTIONS.limit = Math.ceil(data.totalHits / OPTIONS.perPage);
    console.log(OPTIONS);
    const result = OPTIONS.request_page >= OPTIONS.limit;
    console.log(this, result);
    return result;
  },
  hits(data) {
    const result = !data.hits || data.hits.length == 0;
    console.log(this, result);
    return result;
  },
};
function scrollItems() {
  const firstItem = document.querySelector('.gallery li');
  if (firstItem) {
    const { height } = firstItem.getBoundingClientRect();
    window.scrollBy({ top: (height + 20) * 2, behavior: 'smooth' });
  }
}
const LoadMore = {
  show() {
    REFS.loadMore.classList.remove('js-hidden');
  },
  hide() {
    REFS.loadMore.classList.add('js-hidden');
  },
};
//SUBMIT or FIRST SEARCH
REFS.form.addEventListener('submit', async e => {
  e.preventDefault();
  OPTIONS.request_page = 1;

  const inputValue = REFS.form.elements[0].value.trim();
  if (!inputValue) {
    showError('Info', 'Search input must be filled!');
    return;
  }
  searchParams.set('q', inputValue);

  jsLoader.show();
  try {
    const data = await pixabayRequest(searchParams);
    console.log(data);

    if (validateData.hits(data)) {
      jsLoader.remove();
      throw new Error('Error! No data privided');
    }

    renderPhoto(data.hits, REFS.gallery, false);

    if (validateData.pageLimit(data)) {
      LoadMore.hide();
      jsLoader.remove();
      throw new Error('Error! No more pages');
    } else {
      LoadMore.show();
      jsLoader.remove();
    }
  } catch (error) {
    console.log(error);
    showError(
      'Error',
      "We're sorry, but you've reached the end of search results."
    );
  }
});
//CLICK or LOAD MORE
REFS.loadMore.addEventListener('click', async e => {
  e.preventDefault();
  LoadMore.hide();
  searchParams.set('page', ++OPTIONS.request_page);
  OPTIONS.perPage = searchParams.get('per_page');
  try {
    const data = await pixabayRequest(searchParams);
    if (validateData.hits(data)) throw new Error('Error! Nothing to load');

    renderPhoto(data.hits, REFS.gallery, true);
    scrollItems();

    if (validateData.pageLimit(data)) {
      jsLoader.remove();
      LoadMore.hide();
      throw new Error('Error! Nothing to load');
    } else {
      jsLoader.remove();
      LoadMore.show();
    }
  } catch (error) {
    console.log(error);
    showError(
      'Error',
      'Sorry, there are no images matching your search query. Please try again!'
    );
  }
});
