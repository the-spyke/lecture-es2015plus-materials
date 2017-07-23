"use strict";

const { es_new, es_old, assert } = require("./libs/runners");

// Extended Parameter Handling
// ===========================

// Default Parameter Values
// ------------------------

// Simple and intuitive default values for function parameters.

es_new(function() {

	function f(x, y = 7, z = 42) {
		return x + y + z;
	}

	assert(f(1) === 50);

});

es_old(function() {

	function f(x, y, z) {
		if (y === undefined) {
			y = 7;
		}
		if (z === undefined) {
			z = 42;
		}

		return x + y + z;
	};

	assert(f(1) === 50);

});

// Rest Parameter
// --------------

// Aggregation of remaining arguments into single parameter of variadic functions.

es_new(function() {

	function f(x, y, ...a) {
		return (x + y) * a.length;
	}

	assert(f(1, 2, "hello", true, 7) === 9);

});

es_old(function() {

	function f(x, y) {
		var a = Array.prototype.slice.call(arguments, 2);

		return (x + y) * a.length;
	};

	assert(f(1, 2, "hello", true, 7) === 9);

});

// Spread Operator
// ---------------

// Spreading of elements of an iterable collection (like an array or even
// a string) into both literal elements and individual function parameters.

es_new(function() {

	var params = [3, 4, 5];
	var other = [1, 2, ...params];

	assert(JSON.stringify(other) === `[1,2,3,4,5]`);

	function f(a, b, c, d, e) {
		return a + b + c + d + e;
	}

	assert(f(1, 2, ...params) === 15);

	var str = "foo";
	var chars = [...str];

	assert(JSON.stringify(chars) === `["f","o","o"]`); 

});

es_old(function() {

	var params = [3, 4, 5];
	var other = [1, 2].concat(params);

	assert(JSON.stringify(other) === `[1,2,3,4,5]`);

	function f(a, b, c, d, e) {
		return a + b + c + d + e;
	}

	assert(f.apply(undefined, [1, 2].concat(params)) === 15);

	var str = "foo";
	var chars = str.split("");

	assert(JSON.stringify(chars) === `["f","o","o"]`); 

});

console.log("OK");
