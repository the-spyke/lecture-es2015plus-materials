"use strict";

const { es_new, es_old, assert, json } = require("./libs/runners");

// ES2016
// ======

// Super tiny. Only two features!

// #region Array.prototype.includes()
// ----------------------------------

es_new(function () {

	var array = [1, 2, 3];
	var element = 2;

	if (!array.includes(element)) {
		assert(false);
	}

});

es_old(function () {

	var array = [1, 2, 3];
	var element = 2;

	if (array.indexOf(element) === -1) {
		assert(false);
	}

});

// #endregion

// #region Exponentiation Operator
// -------------------------------

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

// #endregion

console.log("OK");
