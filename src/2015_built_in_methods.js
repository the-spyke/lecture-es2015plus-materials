"use strict";

const { es_new, es_old, success, assert, json } = require("./libs/runners");

// New Built-In Methods
// ====================

// #region Object property assignment
// ----------------------------------

// New function for assigning enumerable properties of one or more source
// objects onto a destination object.

es_new(function () {

	var dst = { asd: 0 };
	var src1 = { foo: 1, bar: 2 };
	var src2 = { foo: 3, baz: 4 };

	Object.assign(dst, src1, src2);

	assert(dst.asd === 0);
	assert(dst.foo === 3);
	assert(dst.bar === 2);
	assert(dst.baz === 4);

});

es_old(function () {

	var dst = { asd: 0 };
	var src1 = { foo: 1, bar: 2 };
	var src2 = { foo: 3, baz: 4 };

	Object.keys(src1).forEach(function (k) {
		dst[k] = src1[k];
	});
	Object.keys(src2).forEach(function (k) {
		dst[k] = src2[k];
	});

	assert(dst.asd === 0);
	assert(dst.foo === 3);
	assert(dst.bar === 2);
	assert(dst.baz === 4);

});

// #endregion

// #region Array element finding
// -----------------------------

// New function for finding an element in an array.

es_new(function () {

	var item = [1, 3, 4, 2].find(x => x > 3);

	assert(item === 4);

	var index = [1, 3, 4, 2].findIndex(x => x > 3);

	assert(index === 2);

});

es_old(function () {

	// Polyfill

});

// #endregion

// #region String repeating
// ------------------------

// New string repeating functionality.

es_new(function () {

	var str = "asd-".repeat(3);

	assert(str === "asd-asd-asd-");

});

es_old(function () {

	var str = Array(3 + 1).join("asd-");

	assert(str === "asd-asd-asd-");

});

// #endregion

// #region String searching
// ------------------------

// New specific string functions to search for a sub-string.

es_new(function () {

	var str = "hello";

	assert(str.startsWith("hel") === true);
	assert(str.endsWith("llo") === true);
	assert(str.includes("ell") === true);

});

es_old(function () {

	var str = "hello";

	assert(str.indexOf("hel") === 0);
	assert(str.indexOf("llo") === (str.length - 3));
	assert(str.indexOf("ell") !== -1);

});

// #endregion

// #region Number type checking
// ----------------------------

// New functions for checking for non-numbers and finite numbers.

es_new(function () {

	assert(Number.isNaN(42) === false);
	assert(Number.isNaN(NaN) === true);

	assert(Number.isFinite(Infinity) === false);
	assert(Number.isFinite(-Infinity) === false);
	assert(Number.isFinite(NaN) === false);
	assert(Number.isFinite(123) === true);

});

es_old(function () {

	var isNaN = function (n) {
		return n !== n;
	};
	var isFinite = function (v) {
		return (typeof v === "number" && !isNaN(v) && v !== Infinity && v !== -Infinity);
	};

	assert(isNaN(42) === false);
	assert(isNaN(NaN) === true);

	assert(isFinite(Infinity) === false);
	assert(isFinite(-Infinity) === false);
	assert(isFinite(NaN) === false);
	assert(isFinite(123) === true);

});

// #endregion

// #region Number safety checking
// ------------------------------

// Checking whether an integer number is in the safe range, i.e., it is
// correctly represented by JavaScript (where all numbers, including
// integer numbers, are technically floating point number).

es_new(function () {

	assert(Number.isSafeInteger(42) === true);
	assert(Number.isSafeInteger(9007199254740992) === false);

});

es_old(function () {

	function isSafeInteger(n) {
		return (
			typeof n === 'number'
			&& Math.round(n) === n
			&& -(Math.pow(2, 53) - 1) <= n
			&& n <= (Math.pow(2, 53) - 1)
		);
	}

	assert(isSafeInteger(42) === true);
	assert(isSafeInteger(9007199254740992) === false);

});

// #endregion

// #region Number comparison
// -------------------------

// Availability of a standard Epsilon value for more precise comparison of
// floating point numbers.

es_new(function () {

	assert((0.1 + 0.2 === 0.3) === false);
	assert(Math.abs((0.1 + 0.2) - 0.3) < Number.EPSILON);

});

es_old(function () {

	assert((0.1 + 0.2 === 0.3) === false);
	assert(Math.abs((0.1 + 0.2) - 0.3) < 2.220446049250313e-16);

});

// #endregion

// #region Number truncation
// -------------------------

// Truncate a floating point number to its integral part,
// completely dropping the fractional part.

es_new(function () {

	assert(Math.trunc(42.7) === 42);
	assert(Math.trunc(0.1) === 0);
	assert(Math.trunc(-0.1) === -0);

});

es_old(function () {

	function mathTrunc(x) {
		return (x < 0 ? Math.ceil(x) : Math.floor(x));
	}

	assert(mathTrunc(42.7) === 42);
	assert(mathTrunc(0.1) === 0);
	assert(mathTrunc(-0.1)=== -0);

});

// #endregion

// #region Number sign determination
// ---------------------------------

// Determine the sign of a number, including special cases of signed zero and non-number.

es_new(function () {

	assert(Math.sign(7) === 1);
	assert(Math.sign(0) === 0);
	assert(Math.sign(-0) === -0);
	assert(Math.sign(-7) === -1);
	assert(isNaN(Math.sign(NaN)));

});

es_old(function () {

	function mathSign(x) {
		return ((x === 0 || isNaN(x)) ? x : (x > 0 ? 1 : -1));
	}

	assert(mathSign(7) === 1);
	assert(mathSign(0) === 0);
	assert(mathSign(-0) === -0);
	assert(mathSign(-7) === -1);
	assert(isNaN(mathSign(NaN)));

});

// #endregion

success();
