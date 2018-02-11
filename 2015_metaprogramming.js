"use strict";

const { es_new, es_old, assert, json } = require("./libs/runners");

// Meta-Programming
// ================

// #region Proxying
// ----------------

// Hooking into runtime-level object meta-operations.

es_new(function() {

	var target = {
		foo: "Welcome, foo"
	};

	var proxy = new Proxy(target, {
		get(receiver, name) {
			return name in receiver ? receiver[name] : `Hello, ${name}`;
		}
	});

	assert(proxy.foo === "Welcome, foo");
	assert(proxy.world === "Hello, world");

});

es_old(function() {

	// No equivalent in ES5

});

// #endregion

// #region Reflection
// ------------------

// Make calls corresponding to the object meta-operations.

es_new(function() {

	var obj = { a: 1 };
	Object.defineProperty(obj, "b", { value: 2 });
	obj[Symbol("c")] = 3;

	assert(json(Reflect.ownKeys(obj)) === `["a","b",null]`); // Should be ["a","b",Symbol(c)]

});

es_old(function() {

	// No equivalent in ES5

});

// #endregion

console.log("OK");
