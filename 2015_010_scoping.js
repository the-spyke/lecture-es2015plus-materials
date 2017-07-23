"use strict";

const { es_new, es_old, assert } = require("./libs/runners");

// Scoping
// =======

// Block-Scoped Variables
// ----------------------

// Block-scoped variables (and constants) without hoisting.

es_new(function () {

	const a = [1, 2, 3];

	for (let i = 0; i < a.length; i++) {
		let x = a[i];
	}

	var error;

	try {
		i = 1; // ReferenceError: i is not defined
		x = 1; // ReferenceError: x is not defined
	} catch (e) {
		error = e;
	}

	assert(error);

	const callbacks = [];

	for (let i = 0; i <= 2; i++) {
		callbacks[i] = function () { return i * 2; };
	}

	assert(callbacks[0]() === 0);
	assert(callbacks[1]() === 2);
	assert(callbacks[2]() === 4);

});

es_old(function () {

	var a = [1, 2, 3];

	for (var i = 0; i < a.length; i++) {
		var x = a[i];
	}

	i = 5; // OK
	x = 5; // OK

	var callbacks = [];

	for (var i = 0; i <= 2; i++) {
		(function (i) {
			callbacks[i] = function () { return i * 2; };
		})(i);
	}

	assert(callbacks[0]() === 0);
	assert(callbacks[1]() === 2);
	assert(callbacks[2]() === 4);

});

// Block-Scoped Functions
// ----------------------

// Block-scoped function definitions.

es_new(function () {

	function foo() { return 1; }

	{
		function foo() { return 2; }

		assert(foo() === 2);
	}

	assert(foo() === 1);

});

es_old(function () {

	// Only in ES5 with the help of block-scope emulating
	// function scopes and function expressions
	function foo() { return 1; }

	(function () {

		function foo() { return 2; }

		assert(foo() === 2);

	})();

	assert(foo() === 1);

});

console.log("OK");
