import './style.css';
import './normalize.css';
import './dom.js';
import './data.js';

import dom_items from './dom.js';
import temp from './data.js';

const { data } = temp();
console.log(data);

dom_items.submit_button.addEventListener(
	'click',

	async () => {
		let city = dom_items.weather_input.value;
		console.log(city);

		const temp2 = await data(
			`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3341726c87ea59ba818ce1372f50d4fe`
		);
		console.log(temp2);
	}
);
