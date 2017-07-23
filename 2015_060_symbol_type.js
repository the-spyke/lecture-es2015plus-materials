"use strict";

const { es_new, es_old, assert } = require("./libs/runners");

// Symbol Type
// ===========

// Symbol Type
// -----------

// Unique and immutable data type to be used as an identifier for object properties.
// Symbol can have an optional description, but for debugging purposes only.

es_new(function() {

	assert(Symbol("foo") !== Symbol("foo"));

	const foo = Symbol("foo");
	const bar = Symbol("bar");

	assert(typeof foo === "symbol");
	assert(typeof bar === "symbol");

	let obj = {};
	obj[foo] = "foo";
	obj[bar] = "bar";

	assert(JSON.stringify(obj) === "{}");
	assert(JSON.stringify(Object.keys(obj)) === "[]")
	assert(JSON.stringify(Object.getOwnPropertyNames(obj)) === "[]");
	// assert(JSON.stringify(Object.getOwnPropertySymbols(obj)) === "[foo, bar]"); // Doesn't work in Node

});

es_old(function() {

	// No equivalent in ES5

});

// Global Symbols
// --------------

// Global symbols, indexed through unique keys.

es_new(function() {

	assert(Symbol.for("app.foo") === Symbol.for("app.foo"));

	const foo = Symbol.for("app.foo");
	const bar = Symbol.for("app.bar");

	assert(Symbol.keyFor(foo) === "app.foo");
	assert(Symbol.keyFor(bar) === "app.bar");
	assert(typeof foo === "symbol");
	assert(typeof bar === "symbol");
	
	let obj = {};
	obj[foo] = "foo";
	obj[bar] = "bar";
	
	assert(JSON.stringify(obj) === "{}");
	assert(JSON.stringify(Object.keys(obj)) === "[]");
	assert(JSON.stringify(Object.getOwnPropertyNames(obj)) ==="[]");
	// assert(JSON.stringify(Object.getOwnPropertySymbols(obj)) === "[foo, bar]");

});

es_old(function() {

	// No equivalent in ES5

});

console.log("OK");
