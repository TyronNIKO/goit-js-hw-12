export function scrollItems() {
  const firstItem = document.querySelector('.gallery li');
  if (firstItem) {
    const { height } = firstItem.getBoundingClientRect();
    window.scrollBy({ top: (height + 20) * 2, behavior: 'smooth' });
  }
}
