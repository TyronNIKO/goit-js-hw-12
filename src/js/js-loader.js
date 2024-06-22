export default class JsLoader {
  constructor() {
    this.element = document.querySelector('.js-loader-text');
    this.options = {
      text: 'Loading images, please wait',
      loader: '.',
      count: 3,
    };
  }
  show() {
    // console.log('New interval');
    // console.log(this);
    this.element.classList.remove('js-hidden');
    let acc = 0;
    this.interval = setInterval(() => {
      if (acc > this.options.count) acc = 0;
      this.element.innerText = this.options.text.padEnd(
        this.options.text.length + acc,
        this.options.loader
      );
      acc++;
    }, 200);
  }
  remove() {
    // console.log('Interval cleared', id);
    clearInterval(this.interval);
    this.element.classList.add('js-hidden');
  }
}
