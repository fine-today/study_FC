export default class ImageSlider {
  #slideWidth = 0;
  #slideCount = 0;
  #currentPosition = 0;
  #intervalId;
  #playId = true;
  sliderWrapEl;
  sliderEl;
  nextBtnEl;
  previousBtnEl;
  indicatorWrapEl;
  controlWrapEl;
  constructor() {
    this.assignElement();
    this.initSlideCount();
    this.initSlideWidth();
    this.initIndicator();
    this.initPlay();
    // this.initCurrentPosition();
    this.addEvent();
    this.setIndicator();
  }
  assignElement() {
    this.sliderWrapEl = document.querySelector('#slider-wrap');
    this.sliderEl = this.sliderWrapEl.querySelector('#slider');
    this.nextBtnEl = this.sliderWrapEl.querySelector('#next');
    this.previousBtnEl = this.sliderWrapEl.querySelector('#previous');
    this.indicatorWrapEl = this.sliderWrapEl.querySelector('#indicator-wrap');
    this.controlWrapEl = this.sliderWrapEl.querySelector('#control-wrap');
  }
  initPlay() {
    this.#intervalId = setInterval(this.onClickNext.bind(this), 3000);
  }

  initSlideWidth() {
    this.#slideWidth = this.sliderEl.clientWidth;
  }
  initSlideCount() {
    this.#slideCount = this.sliderEl.querySelectorAll('li').length;
  }
  initIndicator() {
    const docFragment = document.createDocumentFragment();
    for (let i = 0; i < this.#slideCount; i++) {
      const li = document.createElement('li');
      li.dataset.index = i;
      docFragment.appendChild(li);
    }
    this.indicatorWrapEl.querySelector('ul').appendChild(docFragment);
  }
  setIndicator() {
    this.indicatorWrapEl.querySelector('li.active')?.classList.remove('active');
    this.indicatorWrapEl
      .querySelector(`li:nth-child(${this.#currentPosition + 1})`)
      ?.classList.add('active');
  }

  addEvent() {
    this.sliderEl.style.width = `${this.#slideWidth * this.#slideCount}px`;
    this.nextBtnEl.addEventListener('click', this.onClickNext.bind(this));
    this.previousBtnEl.addEventListener(
      'click',
      this.onClickPrevious.bind(this),
    );
    this.indicatorWrapEl.addEventListener(
      'click',
      this.onClickIndicator.bind(this),
    );
    this.controlWrapEl.addEventListener(
      'click',
      this.onClickControl.bind(this),
    );
  }
  onClickNext() {
    this.#currentPosition += 1;
    if (this.#currentPosition >= this.#slideCount) {
      this.#currentPosition = 0;
    }
    this.sliderEl.style.left = `-${this.#currentPosition * this.#slideWidth}px`;
    this.setIndicator();
    if (this.#playId) {
      clearInterval(this.#intervalId);
      this.#intervalId = setInterval(this.onClickNext.bind(this), 3000);
    }
  }
  onClickPrevious() {
    this.#currentPosition -= 1;
    if (this.#currentPosition < 0) {
      this.#currentPosition = this.#slideCount - 1;
    }
    this.sliderEl.style.left = `-${this.#currentPosition * this.#slideWidth}px`;
    this.setIndicator();
    if (this.#playId) {
      clearInterval(this.#intervalId);
      this.#intervalId = setInterval(this.onClickNext.bind(this), 3000);
    }
  }
  onClickIndicator(event) {
    this.#currentPosition = parseInt(event.target.dataset.index);
    this.sliderEl.style.left = `-${this.#currentPosition * this.#slideWidth}px`;
    this.setIndicator();
  }
  onClickControl(event) {
    if (event.target.dataset.status === 'play') {
      this.#playId = true;
      this.controlWrapEl.classList.add('play');
      this.controlWrapEl.classList.remove('pause');
      this.initPlay();
    } else if (event.target.dataset.status === 'pause') {
      this.#playId = false;
      this.controlWrapEl.classList.add('pause');
      this.controlWrapEl.classList.remove('play');
      clearInterval(this.#intervalId);
    }
  }
}
