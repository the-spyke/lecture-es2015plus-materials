"use strict";

const { es_new, es_old, success, assert, json } = require("./libs/runners");

// Iterators
// =========

// #region Iteration protocol
// --------------------------

es_new(function () {

	function makeIterator(array) {
		var nextIndex = 0;

		return {
			next: function () {
				if (nextIndex < array.length) {
					return { value: array[nextIndex++], done: false };
				} else {
					return { done: true };
				}
			}
		};
	}

	var iterator = makeIterator(["yo", "ya"]);

	assert(iterator.next().value === "yo");
	assert(iterator.next().value === "ya");
	assert(iterator.next().done === true);

});

es_old(function () {

	// No equivalent in ES5

});

// #endregion

// #region Iterator & for...of operator
// ------------------------------------

// Support "iterable" protocol to allow objects to customize their
// iteration behaviour. Additionally, support "iterator" protocol to produce
// sequence of values (either finite or infinite). Finally, provide
// convenient `of` operator to iterate over all values of an iterable object.

es_new(function () {

	var collection = {};

	collection[Symbol.iterator] = function () {
		var array = ["yo", "ya"];
		var nextIndex = 0;

		return {
			next: function () {
				if (nextIndex < array.length) {
					return { value: array[nextIndex++], done: false };
				} else {
					return { done: true };
				}
			}
		};
	}

	var results = [];

	for (var item of collection) {
		results.push(item);
	}

	assert(json(results) === `["yo","ya"]`);

});

es_old(function () {

	// No equivalent in ES5

});

// #endregion

success();
