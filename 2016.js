"use strict";

const { es_new, es_old, assert } = require("./libs/runners");

// ES2017
// ======

// Super tiny. Only two features!

// Array.prototype.includes
// ------------------------

es_new(function () {

	var array = [1, 2, 3];
	var element = 2;

	if (array.includes(element)) {
		return;
	}

	assert(false);

});

es_old(function () {

	var array = [1, 2, 3];
	var element = 2;

	if (array.indexOf(element) !== -1) {
		return;
	}

	assert(false);
});

// Exponentiation Operator
// -----------------------

es_new(function () {

	var cubed = 2 ** 3;

	assert(cubed === 8);

	var x = 3;

	x **= 3;

	assert(x === 27);

});

es_old(function () {

	var cubed = Math.pow(2, 3);

	assert(cubed === 8);

	var x = 3;

	x = x ** 3;

	assert(x === 27);
});

console.log("OK");
