const array = ["h", "e", "l", "l", "o"];

const DELAY = 700;

exports.getAsyncValue = function (value = "Async value!") {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve(value);
		}, DELAY);
	});
};

exports.getIterator = function () {
	let nextIndex = 0;

	return {
		next() {
			if (nextIndex < array.length) {
				return { value: array[nextIndex++], done: false };
			}

			return { done: true };
		}
	};
}

exports.getAsyncIterator = function () {
	let nextIndex = 0;

	return {
		next() {
			return new Promise(resolve => {
				setTimeout(() => {
					if (nextIndex < array.length) {
						resolve({ value: array[nextIndex++], done: false });
					}

					resolve({ done: true });
				}, DELAY);
			});
		}
	};
}
