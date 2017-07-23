"use strict";

const { es_new, es_old, assert } = require("./libs/runners");

// Constants
// ---------

// Support for constants (also known as "immutable variables"), i.e.,
// variables which cannot be re-assigned new content. Notice: this only
// makes the variable itself immutable, not its assigned content (for
// instance, in case the content is an object, this means the object itself
// can still be altered).

es_new(function () {

	const PI = 3.141593;

	var error;

	try {
		PI = 4; // TypeError: Assignment to constant variable.
	} catch (e) {
		error = e;
	}

	assert(error);

});

es_old(function () {

	// Only in ES5 through the help of object properties
	// and only in global context and not in a block scope
	Object.defineProperty(
		typeof global === "object" ? global : window,
		"PI",
		{
			value: 3.141593,
			enumerable: true,
			writable: false,
			configurable: false
		}
	);

	var error;

	try {
		PI = 4; // TypeError: Cannot assign to read only property 
	} catch (e) {
		error = e;
	}

	assert(error);

});

console.log("OK");
