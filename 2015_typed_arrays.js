"use strict";

const { es_new, es_old, success, assert, json } = require("./libs/runners");

// Typed Arrays
// ============

// Support for arbitrary byte-based data structures to implement network
// protocols, cryptography algorithms, file format manipulations, etc.

es_new(function() {

	var buffer = new ArrayBuffer(2);
	var view8 = new Uint8Array(buffer);
	var view16 = new Uint16Array(buffer);

	assert(view8.length === 2);
	assert(view16.length === 1);

	view8[0] = 1;
	view8[1] = 1;

	assert(view16[0] === 257);

	// 0000 0001 0000 0001
	// 2 ^ 8 + 2 ^ 0 = 256 + 1 = 257

});

es_old(function() {

	// No equivalent in ES5

});

success();
