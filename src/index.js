/* eslint-disable no-useless-escape */
import './style.css';
import './normalize.css';
import './dom.js';
import './data.js';
import '@fortawesome/fontawesome-free/js/all';

import dom_items from './dom.js';
import data_conversion from './data.js';

const { data } = data_conversion();

const setProgressbarValue = (payload) => {
	const { received, length } = payload;
	const value = ((received / length) * 100).toFixed(2);
	dom_items.progress_bar.style.width = value + '%';
	dom_items.progress_label.innerHTML = value + '%';
};

dom_items.submit_button.addEventListener(
	'click',

	async () => {
		let city = dom_items.weather_input.value;

		const final_data = await data(
			`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3341726c87ea59ba818ce1372f50d4fe`
		);
		setTimeout(function temp() {
			dom_items.progress_container.style.display = 'none';
			dom_items.progress_bar.style.width = '0';
			dom_items.progress_label.innerHTML = '0' + '%';
			dom_items.loading_area.setAttribute('style', 'margin-top:4rem;');
		}, 1000);

		data_placement(final_data, city);

		for (let i = 0; i < dom_items.icons_arr.length; i++) {
			dom_items.icons_arr[i].style.display = 'none';
		}

		image_manipulation(final_data);
	}
);
//does not matter where this is at since it is tied to the window object
window.addEventListener('fetch-progress', (e) => {
	setProgressbarValue(e.detail);
});

window.addEventListener('fetch-finished', (e) => {
	setProgressbarValue(e.detail);
});

const data_placement = (info, city) => {
	console.log(info);
	dom_items.city.innerHTML = city;
	dom_items.weather_data_arr[0].innerHTML = info.weather[0].description;
	dom_items.weather_data_arr[1].innerHTML = info.main.temp + '°';
	dom_items.weather_data_arr[2].innerHTML =
		Math.round(((info.main.temp - 32) * 5) / 9) + '°';
	dom_items.weather_data_arr[3].innerHTML = info.main.feels_like + '°';
	dom_items.weather_data_arr[4].innerHTML = info.main.pressure;
	dom_items.weather_data_arr[5].innerHTML = info.main.humidity;
	dom_items.weather_data_arr[6].innerHTML = info.wind.speed + ' MPH';
};

const image_manipulation = (info) => {
	if (info.weather[0].description.match(/clou/i) == 'clou') {
		document.body.style.backgroundImage = 'url("clouds.jpg")';
		dom_items.icons_arr[2].style.display = 'block';
	}

	if (info.weather[0].description.match(/rain/i) == 'rain') {
		document.body.style.backgroundImage = 'url("rain.jpg")';
		dom_items.icons_arr[0].style.display = 'block';
	}
	if (info.weather[0].description.match(/fog/i) == 'fog') {
		document.body.style.backgroundImage = 'url("fog.jpg")';
		dom_items.icons_arr[4].style.display = 'block';
	}
	if (info.weather[0].description.match(/sun/i) == 'sun') {
		document.body.style.backgroundImage = 'url("sunny.jpg")';
		dom_items.icons_arr[3].style.display = 'block';
	}
	if (info.weather[0].description.match(/clear/i) == 'clear') {
		document.body.style.backgroundImage = 'url("clear.jpg")';
		dom_items.icons_arr[5].style.display = 'block';
	}

	if (info.weather[0].description.match(/snow/i) == 'snow') {
		document.body.style.backgroundImage = 'url("snow.jpg")';
		dom_items.icons_arr[1].style.display = 'block';
	}
};

(async function defaultValue() {
	const final_data = await data(
		'https://api.openweathermap.org/data/2.5/weather?q=London&units=imperial&appid=3341726c87ea59ba818ce1372f50d4fe',
		true
	);
	data_placement(final_data, 'London');
	image_manipulation(final_data);
})();
