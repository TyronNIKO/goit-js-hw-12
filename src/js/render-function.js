import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import info from '/img/icons/info.svg';
import error from '/img/icons/icon-error.svg';

const icons = {
  info,
  error,
};

const galleryItem = new SimpleLightbox('.gallery li a');

export function showError(type, text) {
  let color, maxWidth;

  switch (type.toLowerCase()) {
    case 'error':
      color = 'red';
      break;
    case 'info':
      color = 'blue';
      break;
    case 'success':
      color = 'green';
      break;
    default:
      break;
  }
  window.innerWidth < 768 ? (maxWidth = '100%') : (maxWidth = '33%');
  iziToast.show({
    title: `${type}`,
    color: color,
    maxWidth: maxWidth,
    iconUrl: icons[type.toLowerCase()],
    position: 'topRight', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
    message: `${text}`,
  });
}
export async function renderPhotoList(photos, container) {
  //   console.log(photos);
  const markup = photos.hits
    .map(photo => {
      return `<li>
                <a href="${photo.largeImageURL}"><img src='${photo.webformatURL}' alt='${photo.tags}'></a>
                <div class="content">
                    <div class="item"><h3>Likes</h3><p>${photo.likes}</p></div>
                    <div class="item"><h3>Views</h3><p>${photo.views}</p></div>
                    <div class="item"><h3>Comments</h3><p>${photo.comments}</p></div>
                    <div class="item"><h3>Downloads</h3><p>${photo.downloads}</p></div>
                </div>
            </li>`;
    })
    .join('');
  container.textContent = '';
  container.insertAdjacentHTML('beforeend', markup);
  galleryItem.refresh();
}
export async function renderMore(photos, container) {
  //   console.log(photos);
  const markup = photos.hits
    .map(photo => {
      return `<li>
                  <a href="${photo.largeImageURL}"><img src='${photo.webformatURL}' alt='${photo.tags}'></a>
                  <div class="content">
                      <div class="item"><h3>Likes</h3><p>${photo.likes}</p></div>
                      <div class="item"><h3>Views</h3><p>${photo.views}</p></div>
                      <div class="item"><h3>Comments</h3><p>${photo.comments}</p></div>
                      <div class="item"><h3>Downloads</h3><p>${photo.downloads}</p></div>
                  </div>
              </li>`;
    })
    .join('');
  // container.textContent = '';
  container.insertAdjacentHTML('beforeend', markup);
  galleryItem.refresh();
}
