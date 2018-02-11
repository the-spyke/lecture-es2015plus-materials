"use strict";

const { es_new, es_old, assert, json } = require("./libs/runners");

// Template Literals
// =================

// #region String interpolation
// ----------------------------

// Intuitive expression interpolation for single-line and multi-line strings.
// (Notice: don't be confused, Template Literals were originally named
// "Template Strings" in the drafts of the ECMAScript 2015 language specification)

es_new(function () {

	var customerName = "Foo";
	var card = { amount: 7, product: "Bar", unitprice: 42 };

	var message = `Hello ${customerName},
want to buy ${card.amount} ${card.product} for
a total of ${card.amount * card.unitprice} bucks?`;

	assert(message === "Hello Foo,\nwant to buy 7 Bar for\na total of 294 bucks?");

});

es_old(function () {

	var customerName = "Foo";
	var card = { amount: 7, product: "Bar", unitprice: 42 };

	var message = "Hello " + customerName + ",\n" +
		"want to buy " + card.amount + " " + card.product + " for\n" +
		"a total of " + (card.amount * card.unitprice) + " bucks?";

	assert(message === "Hello Foo,\nwant to buy 7 Bar for\na total of 294 bucks?");

});

// #endregion

// #region Custom interpolation
// ----------------------------

// Flexible expression interpolation for arbitrary methods.

es_new(function () {

	function get(strings, param1, param2) {
		assert(strings[0] === "http://example.com/foo?bar=");
		assert(strings[1] === "&quux=");
		assert(strings[2] === "");
		assert(param1 === 21);
		assert(param2 === 40);
	}

	get`http://example.com/foo?bar=${11 + 10}&quux=${20 * 2}`;

});

es_old(function () {

	function get(strings, param1, param2) {
		assert(strings[0] === "http://example.com/foo?bar=");
		assert(strings[1] === "&quux=");
		assert(strings[2] === "");
		assert(param1 === 21);
		assert(param2 === 40);
	}

	get(["http://example.com/foo?bar=", "&quux=", ""], 11 + 10, 20 * 2);

});

// #endregion

// #region Raw string access
// -------------------------

// Access the raw template string content (backslashes are not interpreted).

es_new(function () {

	function test(strings, ...params) {
		assert(strings[0] === "foo\n");
		assert(strings[1] === "bar\t");
		assert(strings.raw[0] === "foo\\n");
		assert(strings.raw[1] === "bar\\t");
	}

	test`foo\n${123}bar\t`;

	assert(String.raw`foo\n${42}bar` === "foo\\n42bar");

});

es_old(function () {

	// No equivalent in ES5

});

// #endregion

console.log("OK");
