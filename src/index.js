import './style.css';
import './normalize.css';
import './dom.js';
import './data.js';

import dom_items from './dom.js';
import data_conversion from './data.js';

const { data } = data_conversion();

const setProgressbarValue = (payload) => {
	const { received, length } = payload;
	const value = ((received / length) * 100).toFixed(2);
	dom_items.progress_bar.style.width = value + '%';
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
			dom_items.loading_area.setAttribute('style', 'margin-top:9rem;');
		}, 1000);
		console.log(final_data);
	}
);
//does not matter where this is at since it is tied to the window object
window.addEventListener('fetch-progress', (e) => {
	setProgressbarValue(e.detail);
});

window.addEventListener('fetch-finished', (e) => {
	setProgressbarValue(e.detail);
});
