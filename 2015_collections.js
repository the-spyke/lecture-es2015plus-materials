"use strict";

const { es_new, es_old, assert, json } = require("./libs/runners");

// Map/Set & WeakMap/WeakSet
// =========================

// #region Set data-structure
// --------------------------

// Cleaner data-structure for common algorithms based on sets.

es_new(function () {

	let set = new Set();
	set.add("hello");
	set.add("goodbye");
	set.add("hello");

	assert(set.size === 2);
	assert(set.has("hello") === true);

	var obj = { x: 5 };
	set.add(obj);

	assert(set.size === 3);
	assert(set.has(obj) === true);

});

es_old(function () {

	var set = {};
	set["hello"] = true;
	set["goodbye"] = true;
	set["hello"] = true;

	assert(Object.keys(set).length === 2);
	assert(set["hello"] === true);

	// No equivalent in ES5

});

// #endregion

// #region Map data-structure
// --------------------------

// Cleaner data-structure for common algorithms based on maps.

es_new(function () {

	var map = new Map();
	var obj = { x: 5 };
	map.set("hello", 42);
	map.set(obj, 34);

	assert(map.size === 2);
	assert(map.get(obj) === 34);

});

es_old(function () {

	var map = {};
	var obj = { x: 5 };
	map["hello"] = 42;
	// No equivalent in ES5

	assert(Object.keys(map).length === 1);
	// No equivalent in ES5

});

// #endregion

console.log("OK");
