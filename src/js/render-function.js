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

const gallery = new SimpleLightbox('.gallery li a');

export function showError(type, text) {
  let color;

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
  iziToast.show({
    title: `${type}`,
    color: color,
    maxWidth: '33%',
    iconUrl: icons[type.toLowerCase()],
    position: 'topRight', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
    message: `${text}`,
  });
}
export function renderPhotoList(photos, container) {
  console.log(photos);
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
  gallery.refresh();
}
