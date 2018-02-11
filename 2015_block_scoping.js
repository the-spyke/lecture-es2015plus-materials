"use strict";

const { es_new, es_old, assert, json } = require("./libs/runners");

// Block-scoped variables and functions
// ====================================

// #region Block-scoped variables (and constants) without hoisting
// ---------------------------------------------------------------

es_new(function () {

	let a = [1, 2, 3];

	for (let i = 0; i < a.length; i++) {
		let x = a[i];
	}

	let error;

	try {
		i = 1; // ReferenceError: i is not defined
		x = 1; // ReferenceError: x is not defined
	} catch (e) {
		error = e;
	}

	assert(error);

});

es_old(function () {

	var a = [1, 2, 3];

	for (var i = 0; i < a.length; i++) {
		var x = a[i];
	}

	i = 5; // OK
	x = 5; // OK

});

// #endregion

// #region Block-scoped function definitions
// -----------------------------------------

es_new(function () {

	function foo() { return 1; }

	{
		function foo() { return 2; }

		assert(foo() === 2);
	}

	assert(foo() === 1);

});

es_old(function () {

	function foo() { return 1; }

	(function () {

		function foo() { return 2; }

		assert(foo() === 2);

	})();

	assert(foo() === 1);

});

// #endregion

// #region Closures
// ----------------

es_new(function () {

	let callbacks = [];

	for (let i = 0; i <= 2; i++) {
		callbacks[i] = function () { return i * 2; };
	}

	assert(callbacks[0]() === 0);
	assert(callbacks[1]() === 2);
	assert(callbacks[2]() === 4);

});

es_old(function () {

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

// #endregion

console.log("OK");
