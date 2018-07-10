"use strict";

const { es_new, es_old, success, assert, json } = require("./libs/runners");
const { getAsyncValue } = require("./libs/utils");

// ES2017
// ======

// #region String padding
// ----------------------

es_new(() => {

	assert(`abc`.padStart(10)        === `       abc`);
	assert(`abc`.padStart(10, `foo`) === `foofoofabc`);
	assert(`abc`.padStart(8, `0`)    === `00000abc`);
	assert(`abc`.padStart(1)         === `abc`);

});

es_old(() => {

	// Polyfill

});

// #endregion

// #region Object.values() and Object.entries()
// --------------------------------------------

es_new(() => {

	const obj = { foo: `bar`, baz: 42 };

	const values = Object.values(obj);

	assert(json(values) === `["bar",42]`);

	const entries = Object.entries(obj);

	assert(json(entries) === `[["foo","bar"],["baz",42]]`);

});

es_old(() => {

	const obj = { foo: `bar`, baz: 42 };

	const values = [];
	for (const key in obj) {
		if (obj.hasOwnProperty(key)) {
			values.push(obj[key]);
		}
	}

	assert(json(values) === `["bar",42]`);

	const entries = [];
	for (const key in obj) {
		if (obj.hasOwnProperty(key)) {
			entries.push([key, obj[key]]);
		}
	}

	assert(json(entries) === `[["foo","bar"],["baz",42]]`);

});

// #endregion

// #region Object.getOwnPropertyDescriptors()
// ------------------------------------------

es_new(() => {

	const obj = { normal: Infinity };
	const enumDescriptor = {
		enumerable: false,
		writable: false,
		configurable: true,
		value: true
	};
	const writableDescriptor = {
		enumerable: true,
		writable: true,
		configurable: true,
		value: 42
	};

	Object.defineProperty(obj, `enumerable`, enumDescriptor);
	Object.defineProperty(obj, `writable`, writableDescriptor);

	const descriptors = Object.getOwnPropertyDescriptors(obj);

	assert(json(descriptors) === `{"normal":{"value":null,"writable":true,"enumerable":true,"configurable":true},"enumerable":{"value":true,"writable":false,"enumerable":false,"configurable":true},"writable":{"value":42,"writable":true,"enumerable":true,"configurable":true}}`);

	// Whereas the Object.assign() method will only copy enumerable 
	// and own properties from a source object to a target object, 
	// you are able to use this method and Object.create() for a 
	// shallow copy between two unknown objects:
	const copy = Object.create(
		Object.getPrototypeOf(obj),
		Object.getOwnPropertyDescriptors(obj)
	);

});

es_old(() => {

	// Polyfill

});

// #endregion

// #region Trailing commas in function parameter lists and calls
// -------------------------------------------------------------

es_new(() => {

	const obj = {
		x: 1,
		y: 2,
	};

	assert(obj.x === 1);
	assert(obj.y === 2);

	function sum(
		x,
		y,
	) {
		return x + y;
	}

	const result = sum(
		1,
		2,
	);

	assert(result === 3);

});

es_old(() => {

	// No equivalent

});

// #endregion

// #region Async functions
// -----------------------

es_new(async () => {

	async function getUserNameById(userId) {
		return getAsyncValue(`Bob`);
	}

	try {
		const username = await getUserNameById(123);

		console.log(`Done`);

		assert(username === `Bob`);
	} catch (error) {
		console.error(error);
	}

});

es_old(() => {

	function getUserNameById(userId) {
		return getAsyncValue(`Bob`);
	}

	getUserNameById(123)
		.then(username => {
			console.log(`Done`);

			assert(username === `Bob`);
		})
		.catch(error => {
			console.error(error);
		});

});

// #endregion

// #region Shared memory and atomics
// ---------------------------------

/* TODO */

// #endregion

success();
