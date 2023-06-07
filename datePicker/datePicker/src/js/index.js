class DatePicker {
	#selectedDate = {
		data: '',
		date: 0,
		month: 0,
		year: 0,
	};
	currentDate = {
		data: '',
		date: 0,
		month: 0,
		year: 0,
	};
	dateWrap;
	dateInputEl;
	calendarEl;
	monthEl;
	prevBtnEl;
	nextBtnEl;
	daysEl;

	constructor() {
		this.assignElement();
		this.addEvent();
	}
	assignElement() {
		this.dateWrap = document.querySelector('#date-picker');
		this.dateInputEl = this.dateWrap.querySelector('#date-input');
		this.calendarEl = this.dateWrap.querySelector('#calendar');
		this.monthEl = this.dateWrap.querySelector('#month');
		this.prevBtnEl = this.dateWrap.querySelector('#prev');
		this.nextBtnEl = this.dateWrap.querySelector('#next');
		this.daysEl = this.dateWrap.querySelector('#days');
	}
	addEvent() {}
}

new DatePicker();
