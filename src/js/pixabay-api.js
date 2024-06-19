import axios from 'axios';
import { renderPhoto, showError } from './render-function';
import JsLoader from './js-loader';

// export async function pixabayRequestNew(searchParams, container) {
export async function pixabayRequest(
  searchParams,
  container,
  more = false,
  limit = null
) {
  //   console.log(more);
  const jsLoader = new JsLoader();
  jsLoader.createInterval(jsLoader.options);

  //   await fetch(`https://pixabay.com/api/?${searchParams}`)
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error(response.status);
  //       }
  //       return response.json();
  //     })
  //     .then(photos => {
  //       console.log(photos);
  //       if (!photos.hits || photos.hits.length === 0)
  //         throw new Error('Error! Nothing to load');
  //       renderPhoto(photos, container, more).finally(() => {
  //         let rect = document.querySelector('.gallery li');
  //         rect = rect.getBoundingClientRect();
  //         let gap = 20;
  //         // console.log(rect, rect.height);
  //         window.scrollBy({
  //           top: (rect.height + gap) * 2,
  //           behavior: 'smooth',
  //         });
  //       });
  //     })
  //     .catch(error => {
  //       showError(
  //         'Error',
  //         !more
  //           ? 'Sorry, there are no images matching your search query. Please try again!'
  //           : "We're sorry, but you've reached the end of search results."
  //       );
  //     })
  //     .finally(() => jsLoader.removeInterval(jsLoader.interval));

  //   try {
  //     const response = await fetch(`https://pixabay.com/api/?${searchParams}`);
  //     if (!response.ok) throw new Error(response.status);

  //     const photos = await response.json();
  //     if (!photos.hits || photos.hits.length === 0)
  //       throw new Error('Error! Nothing to load');

  //     await renderPhoto(photos, container, more);

  //     const firstItem = document.querySelector('.gallery li');
  //     if (more && firstItem) {
  //       const { height } = firstItem.getBoundingClientRect();
  //       window.scrollBy({ top: (height + 20) * 2, behavior: 'smooth' });
  //     }
  //   } catch (error) {
  //     showError(
  //       'Error',
  //       more
  //         ? "We're sorry, but you've reached the end of search results."
  //         : 'Sorry, there are no images matching your search query. Please try again!'
  //     );
  //   } finally {
  //     jsLoader.removeInterval(jsLoader.interval);
  //   }
  try {
    const response = await axios.get(
      `https://pixabay.com/api/?${searchParams}`
    );
    const photos = response.data;
    if (limit) {
      console.log(photos.totalHits, limit);
      console.log(Math.ceil(photos.totalHits / limit.curPage));
      console.log(limit.page > Math.ceil(photos.totalHits / limit.curPage));
    }

    if (!photos.hits || photos.hits.length === 0)
      throw new Error('Error! Nothing to load');

    await renderPhoto(photos, container, more);

    const firstItem = document.querySelector('.gallery li');
    if (more && firstItem) {
      const { height } = firstItem.getBoundingClientRect();
      window.scrollBy({ top: (height + 20) * 2, behavior: 'smooth' });
    }
    if (photos.totalHits % limit <= 0) {
      throw new Error('Error! Nothing to load');
    }
  } catch (error) {
    showError(
      'Error',
      more
        ? "We're sorry, but you've reached the end of search results."
        : 'Sorry, there are no images matching your search query. Please try again!'
    );
  } finally {
    jsLoader.removeInterval(jsLoader.interval);
  }
}
