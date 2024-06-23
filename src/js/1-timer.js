import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// refs
const startBtn = document.querySelector('button[data-start]');
const inputEl = document.getElementById('datetime-picker');
const daysEl = document.querySelector('span[data-days]');
const hoursEl = document.querySelector('span[data-hours]');
const minutesEl = document.querySelector('span[data-minutes]');
const secondsEl = document.querySelector('span[data-seconds]');

// options flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    if (userSelectedDate.getTime() < currentDate) {
      startBtn.disabled = true;
      iziToast.show({
        message: 'Please choose a date in the future',
        position: 'topRight',
        backgroundColor: '#ef4040',
        color: '#fff',
      });
    } else {
      startBtn.disabled = false;
    }
  },
};

// functions
// get time object
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
// difference current time and choosed future time
function startCountTime() {
  const timeDefference = userSelectedDate - currentDate;
  let timeCounter = timeDefference;
  const intervalID = setInterval(() => {
    if (!timeCounter || timeCounter <= 1000) {
      clearInterval(intervalID);
      inputEl.disabled = false;
      return;
    } else {
      timeCounter -= 1000;
      convertMs(timeCounter);
      setTimeValueHTML(convertMs(timeCounter));
    }
    startBtn.disabled = true;
    inputEl.disabled = true;

    console.log(convertMs(timeCounter));
  }, 1000);
}
// set markup values
function setTimeValueHTML(obj) {
  const { days, hours, minutes, seconds } = obj;
  daysEl.innerHTML = String(days).padStart(2, '0');
  hoursEl.innerHTML = String(hours).padStart(2, '0');
  minutesEl.innerHTML = String(minutes).padStart(2, '0');
  secondsEl.innerHTML = String(seconds).padStart(2, '0');
}

// start count time event
startBtn.addEventListener('click', startCountTime);
// choose date event
flatpickr('#datetime-picker', options);
// default set
startBtn.disabled = true;
inputEl.disabled = false;
let userSelectedDate = null;
const currentDate = new Date().getTime();
