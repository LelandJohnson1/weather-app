/* eslint-disable linebreak-style */
import './style.css';
import './normalize.css';
import './data.js';

document.querySelector('body').innerHTML = 1100101010;
const dom_items = (() => {
	const city = document.querySelector('header div');
	const weather_symbol = document.querySelector('header img');
	const loading_area = document.querySelector('main');
	const weather_data = document.querySelectorAll('section+section p');
	const weather_data_arr = [...weather_data];
	const weather_input = document.querySelector('.weather_input');

	return {
		city,
		weather_symbol,
		loading_area,
		weather_data_arr,
		weather_input,
	};
})();

export default dom_items;
