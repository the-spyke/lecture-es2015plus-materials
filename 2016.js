"use strict";

const { es_new, es_old, success, fail, assert } = require("./libs/runners");

// ES2016
// ======

// Super tiny. Only two features!

// #region Array.prototype.includes()
// ----------------------------------

es_new(() => {

	const array = [1, 2, 3];
	const element = 2;

	if (!array.includes(element)) {
		fail();
	}

});

es_old(() => {

	const array = [1, 2, 3];
	const element = 2;

	if (array.indexOf(element) === -1) {
		fail();
	}

});

// #endregion

// #region Exponentiation Operator
// -------------------------------

es_new(() => {

	const cubed = 2 ** 3;

	assert(cubed === 8);

	const x = 3;

	x **= 3;

	assert(x === 27);

});

es_old(() => {

	const cubed = Math.pow(2, 3);

	assert(cubed === 8);

	const x = 3;

	x = x ** 3;

	assert(x === 27);
});

// #endregion

success();
