"use strict";

const { es_new, es_old, assert, json } = require("./libs/runners");

// Destructuring assignment
// ========================

// #region Array matching
// ----------------------

// Intuitive and flexible destructuring of Arrays into individual variables during assignment.

es_new(function () {

	var list = [1, 2, 3];

	var [a, , b] = list;

	assert(a === 1);
	assert(b === 3);

	[b, a] = [a, b];

	assert(a === 3);
	assert(b === 1);

});

es_old(function () {

	var list = [1, 2, 3];

	var a = list[0],
		b = list[2];

	assert(a === 1);
	assert(b === 3);

	var tmp = a;
	a = b;
	b = tmp;

	assert(a === 3);
	assert(b === 1);

});

// #endregion

// #region Object matching
// -----------------------

// Intuitive and flexible destructuring of Objects into individual variables during assignment.

es_new(function () {

	function getCoordinates() {
		return { x: 1, y: 2, z: 3 };
	}

	var { x, y, z } = getCoordinates();

	assert(x === 1);
	assert(y === 2);
	assert(z === 3);

});

es_old(function () {

	function getCoordinates() {
		return { x: 1, y: 2, z: 3 };
	}

	var tmp = getCoordinates();
	var x = tmp.x;
	var y = tmp.y;
	var z = tmp.z;

	assert(x === 1);
	assert(y === 2);
	assert(z === 3);

});

// #endregion

// #region Deep matching
// ---------------------

// Intuitive and flexible destructuring of Objects into individual variables during assignment.

es_new(function () {

	function getCoordinates() {
		return { valid: true, coord: { x: 1, y: 2 } };
	}

	var { valid: isValid, coord: { x: a, y: b } } = getCoordinates();

	assert(isValid === true);
	assert(a === 1);
	assert(b === 2);

});

es_old(function () {

	function getCoordinates() {
		return { valid: true, coord: { x: 1, y: 2 } };
	}

	var tmp = getCoordinates();
	var isValid = tmp.valid;
	var a = tmp.coord.x;
	var b = tmp.coord.y;

	assert(isValid === true);
	assert(a === 1);
	assert(b === 2);

});

// #endregion

// #region Fail-soft destructuring
// -------------------------------

// Fail-soft destructuring, optionally with defaults.

es_new(function () {

	var list = [7, 42];

	var [a, b, c] = list;

	assert(a === 7);
	assert(b === 42);
	assert(c === undefined);

});

es_old(function () {

	var list = [7, 42];

	var a = typeof list[0] !== "undefined" ? list[0] : 1;
	var b = typeof list[1] !== "undefined" ? list[1] : 2;
	var c = typeof list[2] !== "undefined" ? list[2] : undefined;

	assert(a === 7);
	assert(b === 42);
	assert(c === undefined);

});

// #endregion

// #region Default values
// ----------------------

// Simple and intuitive default values for destructuring of Objects and Arrays.

es_new(function () {

	var obj = { a: 1 };
	var list = [1];

	var { a, b = 2 } = obj;

	assert(a === 1);
	assert(b === 2);

	var [x, y = 2] = list;

	assert(x === 1);
	assert(y === 2);

});

es_old(function () {

	var obj = { a: 1 };
	var list = [1];

	var a = obj.a;
	var b = obj.b === undefined ? 2 : obj.b;

	assert(a === 1);
	assert(b === 2);

	var x = list[0];
	var y = list[1] === undefined ? 2 : list[1];

	assert(x === 1);
	assert(y === 2);

});

// #endregion

// #region Parameter context matching
// ----------------------------------

// Intuitive and flexible destructuring of Arrays and Objects into individual parameters during function calls.

es_new(function () {

	function f([name, value]) {
		assert(name === "bar");
		assert(value === 42);
	}

	f(["bar", 42]);

	function g({ name, value }) {
		assert(name === "bar");
		assert(value === 42);
	}

	g({ name: "bar", value: 42 });

});

es_old(function () {

	function f(arg) {
		var name = arg[0];
		var value = arg[1];

		assert(name === "bar");
		assert(value === 42);
	};

	f(["bar", 42]);
	
	function g(arg) {
		var name = arg.name;
		var value = arg.value;

		assert(name === "bar");
		assert(value === 42);
	};

	g({ name: "bar", value: 42 });

});

// #endregion

console.log("OK");
