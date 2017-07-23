"use strict";

const { es_new, es_old, assert, simulate } = require("./libs/runners");

// ES2017
// ======

// Object.values() and Object.entries()
// ---------------

es_new(function () {

	var obj = { foo: "bar", baz: 42 };

	var values = Object.values(obj);

	assert(JSON.stringify(values) === `["bar",42]`);

	var entries = Object.entries(obj);

	assert(JSON.stringify(entries) === `[["foo","bar"],["baz",42]]`);

});

es_old(function () {

	var obj = { foo: "bar", baz: 42 };

	var values = [];
	for (var key in obj) {
		if (obj.hasOwnProperty(key)) {
			values.push(obj[key]);
		}
	}

	assert(JSON.stringify(values) === `["bar",42]`);

	var entries = [];
	for (var key in obj) {
		if (obj.hasOwnProperty(key)) {
			entries.push([key, obj[key]]);
		}
	}

	assert(JSON.stringify(entries) === `[["foo","bar"],["baz",42]]`);

});

// String padding
// ----------------

es_new(function () {

	assert('abc'.padStart(10) === "       abc");
	assert('abc'.padStart(10, "foo") === "foofoofabc");
	assert('abc'.padStart(8, "0") === "00000abc");
	assert('abc'.padStart(1) === "abc");

});

es_old(function () {

	// Polyfill

});

// Object.getOwnPropertyDescriptors()
// ----------------

es_new(function () {

	var obj = { normal: Infinity };
	var enumDescriptor = {
		enumerable: false,
		writable: false,
		configurable: true,
		value: true
	};
	var writableDescriptor = {
		enumerable: true,
		writable: true,
		configurable: true,
		value: 42
	};

	Object.defineProperty(obj, 'enumerable', enumDescriptor);
	Object.defineProperty(obj, 'writable', writableDescriptor);

	var descriptors = Object.getOwnPropertyDescriptors(obj);

	assert(JSON.stringify(descriptors) === `{"normal":{"value":null,"writable":true,"enumerable":true,"configurable":true},"enumerable":{"value":true,"writable":false,"enumerable":false,"configurable":true},"writable":{"value":42,"writable":true,"enumerable":true,"configurable":true}}`);

	// Whereas the Object.assign() method will only copy enumerable 
	// and own properties from a source object to a target object, 
	// you are able to use this method and Object.create() for a 
	// shallow copy between two unknown objects:
	var copy = Object.create(
		Object.getPrototypeOf(obj),
		Object.getOwnPropertyDescriptors(obj)
	);

});

es_old(function () {

	// Polyfill

});

// Trailing commas in function parameter lists and calls
// ----------------

es_new(function () {

	var obj = {
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

	var result = sum(
		1,
		2,
	);

	assert(result === 3);

});

es_old(function () {

	// No equivalent in ES2016

});

// Async functions
// ----------------

es_new(async function () {

	async function getUserNameById(userId) {
		return simulate().then(() => Promise.resolve("Bob"));
	}

	try {
		var username = await getUserNameById(123);
	} catch (error) {
		console.error(error);
	}

	assert(username === "Bob");

});

es_old(function () {

	function getUserNameById(userId) {
		return simulate().then(() => "Bob");
	}

	getUserNameById(123)
		.then(function (username) {
			console.log("In then");
			assert(username === "Bob");
		})
		.catch(function (error) {
			console.error(error);
		});

});

// Shared memory and atomics
// ----------------

es_new(function () {

	// TODO

});

es_old(function () {

	// No equivalent in ES2016

});

console.log("OK");
