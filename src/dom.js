/* eslint-disable linebreak-style */

const dom_items = (() => {
	const progress_container = document.querySelector('.progress_container');
	const progress_bar = document.querySelector('.loading_color');
	const city = document.querySelector('header div');
	const weather_symbol = document.querySelector('header img');
	const loading_area = document.querySelector('main');
	const weather_data = document.querySelectorAll('section+section p');
	const weather_data_arr = [...weather_data];
	const weather_input = document.querySelector('.weather_input');
	const submit_button = document.querySelector('button');

	return {
		progress_container,
		progress_bar,
		city,
		weather_symbol,
		loading_area,
		weather_data_arr,
		weather_input,
		submit_button,
	};
})();

export default dom_items;
