export const loadMore = {
  btn: document.querySelector('button[data-request="load-more"]'),
  show() {
    loadMore.btn.classList.remove('js-hidden');
  },
  hide() {
    loadMore.btn.classList.add('js-hidden');
  },
};
