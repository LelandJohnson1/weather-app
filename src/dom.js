/* eslint-disable linebreak-style */

const dom_items = (() => {
	const progress_container = document.querySelector('.progress_container');
	const progress_bar = document.querySelector('.loading_color');
	const progress_label = document.querySelector('label');
	const city = document.querySelector('header div');
	const weather_symbol = document.querySelector('header img');
	const loading_area = document.querySelector('.container');
	const weather_data = document.querySelectorAll('section+section p');
	const weather_data_arr = [...weather_data];
	const weather_input = document.querySelector('.weather_input');
	const submit_button = document.querySelector('button');
	const icons = document.querySelectorAll('header span');
	const icons_arr = [...icons];

	return {
		progress_container,
		progress_bar,
		city,
		weather_symbol,
		progress_label,
		loading_area,
		weather_data_arr,
		weather_input,
		submit_button,
		icons_arr,
	};
})();

export default dom_items;
