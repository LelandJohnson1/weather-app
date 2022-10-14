import dom_items from './dom.js';

console.log(dom_items);

const data_conversion = (url) => {
	let isloading = true;
	let chunks = [];
	let results = null;
	let error = null;

	const data = async (url) => {
		resetVars();
		isloading = true;
		dom_items.progress_container.style.display = 'block';
		dom_items.loading_area.setAttribute('style', 'margin-top:0;');
		dom_items.loading_area.style.opacity = 0.4;
		dom_items.weather_input.value = '';

		try {
			const response = await fetch(url, { mode: 'cors' });

			if (response.status >= 200 && response.status < 300) {
				results = await processChunk(response);
				//you can use parse because results is not a promise;
				return JSON.parse(results);
			} else {
				throw response.statusText;
			}
		} catch (err) {
			error = err;
			results = null;
			return error;
		}
	};

	const processChunk = async (response) => {
		const reader = response.body.getReader();

		const length = +response.headers.get('content-length');

		let received = 0;

		while (isloading) {
			const { done, value } = await reader.read();
			const payload = { detail: { received, length, isloading } };
			const onProgress = new CustomEvent('fetch-progress', payload);
			const onFinished = new CustomEvent('fetch-finished', payload);

			console.log(value);

			if (done) {
				isloading = false;
				window.dispatchEvent(onFinished);
				dom_items.loading_area.style.opacity = 1;
			} else {
				chunks.push(value);
				received += value.length;
				window.dispatchEvent(onProgress);
			}
		}
		//put separate chunks back into one array

		//creates blank array with a bunch of 0 values based on the number of the parameter
		let body = new Uint8Array(received);
		let position = 0;

		for (let chunk of chunks) {
			//sets the body array; at position 0 put in all the values of chunk (about 400 of them)
			//starting from 0 on up
			body.set(chunk, position);
			//if position is at 490 then the next chunk will be inserted after into the body
			position += chunk.length;
		}

		return new TextDecoder('utf-8').decode(body);
	};

	const resetVars = () => {
		isloading = false;

		chunks = [];
		results = null;
		error = null;
	};

	return { data };
};

export default data_conversion;
