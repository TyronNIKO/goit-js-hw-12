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
  const colors = { error: 'red', info: 'blue', success: 'green' };
  const color = colors[type.toLowerCase()];

  iziToast.show({
    title: `${type}`,
    color: color,
    maxWidth: window.innerWidth < 768 ? '100%' : '33%',
    iconUrl: icons[type.toLowerCase()],
    position: 'topRight', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
    message: `${text}`,
  });
}
function createItem(obj) {
  return `<li>
            <a href="${obj.largeImageURL}"><img src='${obj.webformatURL}' alt='${obj.tags}'></a>
            <div class="content">
                <div class="item"><h3>Likes</h3><p>${obj.likes}</p></div>
                <div class="item"><h3>Views</h3><p>${obj.views}</p></div>
                <div class="item"><h3>Comments</h3><p>${obj.comments}</p></div>
                <div class="item"><h3>Downloads</h3><p>${obj.downloads}</p></div>
            </div>
        </li>`;
}
export function createMarkup(array) {
  return array.map(photo => createItem(photo)).join('');
}
export function clearMarkup(container) {
  container.innerHTML = '';
}
export function renderMarkup(markup, container) {
  container.insertAdjacentHTML('beforeend', markup);
  galleryItem.refresh();
}
