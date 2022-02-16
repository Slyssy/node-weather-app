// const url = 'http://localhost:3000/weather?address=Boston';

const weatherForm = document.querySelector('form');
const address = document.querySelector('input');
const main = document.querySelector('main');
const errorMessage = document.querySelector('.error__msg');
const addressMessage = document.querySelector('.address__msg');
const forecastMessage = document.querySelector('.forecast__msg');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const search = address.value;
  const url = `/weather?address=${search}`;

  //*By setting the values to these elements before we call fetch, we ensure the
  //*elements are cleared after each time we click submit.
  errorMessage.textContent = ' ';
  addressMessage.textContent = ' ';
  forecastMessage.textContent = 'Getting Forecast...';

  fetch(url).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        errorMessage.textContent = `${data.error}`;
        console.log(data.error);
      } else {
        const searchLocation = data.location;
        const locationForecast = data.forecast;

        addressMessage.textContent = searchLocation;
        forecastMessage.textContent = locationForecast;
      }
    });
  });
});
