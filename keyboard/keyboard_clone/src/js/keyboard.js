export class Keyboard {
	#switchEl;
	#fontSelectEl;
	#containerEl;
	#keyboardEl;
	#inputGroupEl;
	#inputEl;
	#keyPress = false;
	#mouseDown = false;
	constructor() {
		this.#assignElement();
		this.#addEvent();
	}
	#assignElement() {
		this.#containerEl = document.getElementById('container');
		this.#switchEl = this.#containerEl.querySelector('#switch');
		this.#fontSelectEl = this.#containerEl.querySelector('#font');
		this.#keyboardEl = this.#containerEl.querySelector('#keyboard');
		this.#inputGroupEl = this.#containerEl.querySelector('#input-group');
		this.#inputEl = this.#containerEl.querySelector('#input');
	}
	#addEvent() {
		this.#switchEl.addEventListener('change', this.#onChangeTheme);
		this.#fontSelectEl.addEventListener('change', this.#onChangeFont);
		document.addEventListener('keydown', (event) => {
			if (this.#mouseDown) return;
			this.#keyPress = true;
			console.log(event.code);
			this.#keyboardEl.querySelector(`[data-code=${event.code}]`)?.classList.add('active');
			this.#inputGroupEl.classList.toggle('error', /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(event.key));
		});
		document.addEventListener('keyup', (event) => {
			if (this.#mouseDown) return;
			this.#keyPress = false;

			this.#keyboardEl.querySelector(`[data-code=${event.code}]`)?.classList.remove('active');
		});
		this.#keyboardEl.addEventListener('mousedown', this.#onMouseDown.bind(this));
		document.addEventListener('mouseup', this.#onMouseup.bind(this));
	}
	#onChangeTheme(event) {
		document.documentElement.setAttribute('theme', event.target.checked ? 'dark-mode' : '');
		console.log(event.target.checked);
	}

	#onChangeFont(event) {
		document.body.style.fontFamily = event.target.value;
	}
	#onMouseDown(event) {
		if (this.#keyPress) return;
		this.#mouseDown = true;
		event.target.closest('div.key')?.classList.add('active');
	}
	#onMouseup(event) {
		if (this.#keyPress) return;
		this.#mouseDown = false;
		const keyEl = event.target.closest('div.key');
		// undefind가 됐을 때 false로 변환하기 위함
		const isActive = !!keyEl?.classList.contains('active');
		const val = keyEl?.dataset.val;
		if (isActive && val && val !== 'Space' && val !== 'Backspace') {
			this.#inputEl.value += val;
		}
		if (isActive && val === 'Space') {
			this.#inputEl.value += ' ';
		}
		if (isActive && val === 'Backspace') {
			this.#inputEl.value = this.#inputEl.value.slice(0, -1);
		}
		this.#keyboardEl.querySelector('.active')?.classList.remove('active');
	}
}
