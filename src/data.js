import dom_items from './dom.js';

console.log(dom_items);

const temp = (url) => {
	let isloading = false;
	let chunks = [];
	let results = null;
	let error = null;

	const data = async (url) => {
		isloading = true;

		try {
			const response = await fetch(url, { mode: 'cors' });

			if (response.status >= 200 && response.status < 300) {
				results = await response.json();

				return results;
			} else {
				throw response.statusText;
			}
		} catch (err) {
			error = err;
			results = null;
			return error;
		}
	};

	return { data };
};

export default temp;
