"use strict";

const { es_new, es_old, assert, json } = require("./libs/runners");

// Enhanced Object Properties
// ==========================

// #region Property shorthands
// ---------------------------

// Shorter syntax for common object property definition idiom.

es_new(function () {

	var x = 42,
		y = 1;

	var obj = { x, y };

	assert(obj.x === 42);

});

es_old(function () {

	var x = 42,
		y = 1;

	var obj = { x: x, y: y };

	assert(obj.x === 42);

});

// #endregion

// #region Computed property names
// -------------------------------

// Support for computed names in object property definitions.

es_new(function () {

	function getId() { return 123; }

	var obj = {
		["foo" + getId()]: 42
	};

	assert(obj.foo123 === 42);

});

es_old(function () {

	function getId() { return 123; }

	var obj = {};

	obj["foo" + getId()] = 42;

	assert(obj.foo123 === 42);

});

// #endregion

// #region Method properties
// -------------------------

// Support for method notation in object property definitions,
// for both regular functions and generator functions.

es_new(function () {

	var obj = {
		sum(a, b) {
			return a + b;
		}
	};

	assert(obj.sum(1, 2) === 3);

});

es_old(function () {

	var obj = {
		sum: function (a, b) {
			return a + b;
		}
	};

	assert(obj.sum(1, 2) === 3);

});

// #endregion

console.log("OK");
