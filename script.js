const input = document.querySelector('.search_input');
const search = document.querySelector('.search_button');
const apiKey = '45c47f3d2235f186ac29a68562de1e07';

const cardWeather = document.querySelector('.card_weather');
const cityHTML = document.querySelector('.weather_city');
const cityInfoHTML = document.querySelector('.city_info');
const tempHTML = document.querySelector('.weather_temperature');
const descriptionHTML = document.querySelector('.weather_description');
const iconDescriptionHTML = document.querySelector('.weather_icon');
const humidityHTML = document.querySelector('.weather_humidity');
const windHTML = document.querySelector('.weather_wind');

function renderWeather(data) {
    const {name} = data;
    const {temp} = data.main;
    const {country} = data.sys;
    const {description} = data.weather[0];
    const {icon} = data.weather[0];
    const {humidity} = data.main;
    const {speed} = data.wind;
    const {deg} = data.wind;

    cityHTML.firstChild.data = name;
    cityInfoHTML.textContent = country;
    tempHTML.firstChild.data = Math.round(temp);
    descriptionHTML.textContent = description[0].toUpperCase() + description.slice(1);
    iconDescriptionHTML.src = `http://openweathermap.org/img/wn/${icon}.png`;
    humidityHTML.textContent = "Влажность: " + humidity + '%';
    windHTML.textContent = "Скорость ветра: " + speed.toFixed(1) + " м/с";

    cardWeather.classList.remove('start');
}

async function searchWeather (event) {
    cardWeather.classList.add('loading');
    try {
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${apiKey}&units=metric&lang=ru`);
        let result = await response.json();
        renderWeather(result);
    } catch(err) {
        alert('Попробуйте ввести другое название');
    }
    cardWeather.classList.remove('loading');
}

search.addEventListener('click', searchWeather);
input.addEventListener('keydown', (e) => {
    if(e.key == 'Enter') searchWeather();
});
