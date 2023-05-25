export class Keyboard {
	#containerEl;
	#switchEl;
	#fontSelectEl;
	#inputGroupEl;
	#inputEl;
	#keyboard;

	constructor() {
		this.#assignElement();
		this.#addEvent();
	}
	#assignElement() {
		this.#containerEl = document.querySelector('#container');
		this.#switchEl = this.#containerEl.querySelector('#switch');
		this.#fontSelectEl = this.#containerEl.querySelector('#font');
		this.#inputGroupEl = this.#containerEl.querySelector('#input-group');
		this.#inputEl = this.#inputGroupEl.querySelector('#input');
		this.#keyboard = this.#containerEl.querySelector('#keyboard');
	}
	#addEvent() {
		//theme, font 변경
		this.#switchEl.addEventListener('change', this.#changeSwitch.bind(this));
		this.#fontSelectEl.addEventListener('change', this.#changeFont);

		// 키보드 실행
		this.#inputEl.addEventListener('keydown', this.#onKeyDown.bind(this));
		this.#inputEl.addEventListener('keyup', this.#onKeyUp.bind(this));

		//click 실행
		this.#keyboard.addEventListener('mousedown', this.#onMouseDown.bind(this));
		this.#keyboard.addEventListener('mouseup', this.#onMouseUp.bind(this));
	}
	#changeSwitch(event) {
		document.querySelector('html').setAttribute('theme', event.target.checked ? 'dark-mode' : '');
	}
	#changeFont(event) {
		document.querySelector('body').style.fontFamily = event.target.value;
	}
	#onKeyDown(event) {
		this.#keyboard.querySelector(`.key[data-code=${event.code}]`)?.classList.add('active');
	}
	#onKeyUp(event) {
		this.#inputGroupEl.classList.toggle('error', /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(event.target.value));
		this.#keyboard.querySelector('.key.active').classList.remove('active');
	}
	#onMouseDown(event) {
		console.log(event.target);
		const value = !!event.target?.dataset.val ? event.target?.dataset.val : '';
		this.#inputEl.value += value;
		event.target?.classList.add('active');
	}
	#onMouseUp(event) {
		event.target?.classList.remove('active');
	}
}
