export default class JsLoader {
  constructor() {
    this.element = document.querySelector('.js-loader-text');
    this.options = {
      text: 'Loading images, please wait',
      loader: '.',
      count: 3,
    };
  }

  createInterval({ count, text, loader }) {
    // console.log('New interval');
    // console.log(this);
    this.element.classList.remove('js-hidden');
    let acc = 0;
    this.interval = setInterval(() => {
      if (acc > count) acc = 0;
      this.element.innerText = text.padEnd(text.length + acc, loader);
      acc++;
    }, 200);
  }
  removeInterval(id) {
    // console.log('Interval cleared', id);
    clearInterval(id);
    this.element.classList.add('js-hidden');
  }
  init() {
    this.element.classList.add('js-hidden');
  }
}
