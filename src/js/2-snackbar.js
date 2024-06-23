import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', event => {
  event.preventDefault();
  const delay = document.querySelector('input[name="delay"]').value;
  const state = document.querySelector('input[name="state"]:checked').value;
  makePromise({ delay, state })
    .then(message => iziToast.show({ message, color: 'green' }))
    .catch(message => iziToast.show({ message, color: 'red' }));
});

const makePromise = ({ delay, state }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(`✅ Fulfilled promise in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise in ${delay}ms`);
      }
    }, delay);
  });
};
