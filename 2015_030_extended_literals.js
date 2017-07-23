"use strict";

const { es_new, es_old, assert } = require("./libs/runners");

// Extended Literals
// =================

// Binary & Octal Literal
// ----------------------

// Direct support for safe binary and octal literals.

es_new(function() {

	assert(0b111110111 === 503);
	assert(0o767 === 503);

});

es_old(function() {

	assert(parseInt("111110111", 2) === 503);
	assert(parseInt("767", 8) === 503);
	// assert(0767 === 503); // SyntaxError: Octal literals are not allowed in strict mode.

});

// Unicode String & RegExp Literal
// -------------------------------

// Extended support using Unicode within strings and regular expressions.

es_new(function() {

	assert("𠮷".length === 2);
	assert("𠮷".match(/./u)[0].length === 2);
	assert("𠮷" === "\uD842\uDFB7");
	assert("𠮷" === "\u{20BB7}");
	assert("𠮷".codePointAt(0) == 0x20BB7);

	var codepoints = []

	for (var codepoint of "𠮷") {
		codepoints.push(codepoint);
	}

	assert(codepoints.length === 1);

});

es_old(function() {

	assert("𠮷".length === 2);
	// assert("𠮷".match(/(?:[\0-\t\x0B\f\x0E-\u2027\u202A-\uD7FF\uE000-\uFFFF][\uD800-\uDBFF][\uDC00-\uDFFF][\uD800-\uDBFF](?![\uDC00-\uDFFF])(?:[^\uD800-\uDBFF]^)[\uDC00-\uDFFF])/)[0].length === 2);
	assert("𠮷" === "\uD842\uDFB7");
	// No equivalent in ES5
	// No equivalent in ES5
	// No equivalent in ES5

});

console.log("OK");
