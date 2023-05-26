export default class ImageSlider {
  #slideWidth = 0;
  #slideCount = 0;
  #currentPosition = 0;
  sliderWrapEl;
  sliderEl;
  nextBtnEl;
  previousBtnEl;
  indicatorWrapEl;
  constructor() {
    this.assignElement();
    this.initSlideCount();
    this.initSlideWidth();
    this.initIndicator();
    // this.initCurrentPosition();
    this.addEvent();
  }
  assignElement() {
    this.sliderWrapEl = document.querySelector('#slider-wrap');
    this.sliderEl = this.sliderWrapEl.querySelector('#slider');
    this.nextBtnEl = this.sliderWrapEl.querySelector('#next');
    this.previousBtnEl = this.sliderWrapEl.querySelector('#previous');
    this.indicatorWrapEl = this.sliderWrapEl.querySelector('#indicator-wrap');
  }
  initSlideWidth() {
    this.#slideWidth = this.sliderEl.clientWidth;
  }
  initSlideCount() {
    this.#slideCount = this.sliderEl.querySelectorAll('li').length;
  }
  initIndicator() {}

  addEvent() {
    this.sliderEl.style.width = `${this.#slideWidth * this.#slideCount}px`;
    this.nextBtnEl.addEventListener('click', this.onClickNext.bind(this));
    this.previousBtnEl.addEventListener(
      'click',
      this.onClickPrevious.bind(this),
    );
  }
  onClickNext() {
    this.#currentPosition += 1;
    if (this.#currentPosition >= this.#slideCount) {
      this.#currentPosition = 0;
    }
    this.sliderEl.style.left = `-${this.#currentPosition * this.#slideWidth}px`;
  }
  onClickPrevious() {
    this.#currentPosition -= 1;
    if (this.#currentPosition < 0) {
      this.#currentPosition = this.#slideCount - 1;
    }
    this.sliderEl.style.left = `-${this.#currentPosition * this.#slideWidth}px`;
  }
}
