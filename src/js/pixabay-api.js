import { renderPhotoList, renderMore, showError } from './render-function';
import JsLoader from './js-loader';

export function pixabayRequestNew(searchParams, container) {
  const jsLoader = new JsLoader();
  jsLoader.createInterval(jsLoader.options);
  //   setTimeout(() => {
  fetch(`https://pixabay.com/api/?${searchParams}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(photos => {
      //   console.log(photos);
      if (!photos.hits || photos.hits.length === 0)
        throw new Error('Error! Nothing to load');
      renderPhotoList(photos, container);
    })
    .catch(error => {
      //   console.log(error);
      showError(
        'Error',
        'Sorry, there are no images matching your search query. Please try again!'
      );
    })
    .finally(() => jsLoader.removeInterval(jsLoader.interval));
  //   }, 2000);
}
export function pixabayRequestMore(searchParams, container) {
  const jsLoader = new JsLoader();
  jsLoader.createInterval(jsLoader.options);
  //   setTimeout(() => {
  fetch(`https://pixabay.com/api/?${searchParams}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(photos => {
      //   console.log(photos);
      if (!photos.hits || photos.hits.length === 0)
        throw new Error('Error! Nothing to load');
      renderMore(photos, container).then(() => {
        let rect = document.querySelector('.gallery li');
        rect = rect.getBoundingClientRect();
        console.log(rect);
        window.scrollBy({
          top: rect.height * 2,
          behavior: 'smooth',
        });
      });
    })

    .catch(error => {
      //   console.log(error);
      showError(
        'Error',
        "We're sorry, but you've reached the end of search results."
      );
    })
    .finally(() => jsLoader.removeInterval(jsLoader.interval));
  //   }, 2000);
}
