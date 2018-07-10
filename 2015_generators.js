"use strict";

const { es_new, es_old, success, assert, json } = require("./libs/runners");

// Generators
// ==========

// #region Direct use
// ------------------

// Support for generator functions, a special variant of functions where
// the control flow can be paused and resumed, in order to produce sequence
// of values (either finite or infinite).

es_new(function () {

	function* range(start, end, step) {
		var current = start;

		while (current < end) {
			yield current;

			current += step;
		}
	}

	var results = [];

	for (var item of range(0, 10, 2)) {
		results.push(item);
	}

	assert(json(results) === "[0,2,4,6,8]");

});

es_old(function () {

	// No equivalent in ES5

	// This is what happens inside very trivial:
	function Range(start, end, step) {
		var current = start;

		this.next = function () {
			if (current < end) {
				var result = { value: current, done: false };
				current += step;

				return result;
			} else {
				return { done: true };
			}
		};
	}

	var results = [];

	var range = new Range(0, 10, 2);

	for (var result = range.next(); result.done == false; result = range.next()) {
		results.push(result.value);
	}

	assert(json(results) === "[0,2,4,6,8]");

});

// #endregion

// #region Iterator protocol
// -------------------------

// Support for generators, a special case of Iterators containing a
// generator function, where the control flow can be paused and resumed, in
// order to produce sequence of values (either finite or infinite).

es_new(function () {

	var myIterable = {};
	myIterable[Symbol.iterator] = function* () {
		yield 1;
		yield 2;
		yield 3;
	};

	var results = [];

	for (let item of myIterable) {
		results.push(item);
	}

	assert(json(results) === "[1,2,3]");

});

es_old(function () {

	// No equivalent in ES5

});

// #endregion

// #region Generator matching
// --------------------------

// Support for generator functions, i.e., functions where the control flow
// can be paused and resumed, in order to produce and spread sequence of
// values (either finite or infinite).

es_new(function () {

	function* myIterable() {
		yield 1;
		yield 2;
		yield 3;
	};

	var items = [...myIterable()];

	assert(json(items) === "[1,2,3]");

	var [i1, i2, i3, ...others] = myIterable();

	assert(i1 === 1);
	assert(i2 === 2);
	assert(i3 === 3);
	assert(json(others) === "[]");

});

es_old(function () {

	// No equivalent in ES5

});

// #endregion

success();
