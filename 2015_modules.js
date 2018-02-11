"use strict";

const { es_new, es_old, assert, json } = require("./libs/runners");

// ES Modules
// ==========

// #region Named imports/exports
// -----------------------------

// Support for exporting/importing values from/to modules without global
// namespace pollution.

es_new(function () {

	(function () {
		// "lib/math.js
		export function sum(x, y) { return x + y };
		export const pi = 3.141593;
	});

	(function () {
		// someApp.js
		import * as math from "./lib/math";
		console.log("2π = " + math.sum(math.pi, math.pi));
	});

	(function () {
		// otherApp.js
		import { sum, pi } from "./lib/math";
		console.log("2π = " + sum(pi, pi));
	});

});

es_old(function () {

	(function () {
		// lib/math.js
		exports.sum = function (x, y) { return x + y };
		exports.pi = 3.141593;
	});

	(function () {
		// someApp.js
		var math = require("./lib/math");
		console.log("2π = " + math.sum(math.pi, math.pi));
	});

	(function () {
		// otherApp.js
		var math = require("./lib/math");
		var sum = math.sum, pi = math.pi;
		console.log("2π = " + sum(pi, pi));
	});

});

// #endregion

// #region Default imports/exports and imports of namespaces
// ---------------------------------------------------------

// Marking a value as the default exported value and mass-mixin of values.

es_new(function () {

	(function () {
		// lib/mathplusplus.js
		export * from "./lib/math";
		export const e = 2.71828182846;
		export default (x) => Math.exp(x);
	});

	(function () {
		// someApp.js
		import exp, { pi, e } from "./lib/mathplusplus";
		console.log("e^{π} = " + exp(pi));
	});

});

es_old(function () {

	(function () {
		// lib/mathplusplus.js
		var math = require("./lib/math");

		for (symbol in math) {
			if (math.hasOwnProperty(symbol)) {
				exports[symbol] = math[symbol];
			}
		}

		exports.e = 2.71828182846;
		exports.exp = function (x) { return Math.exp(x) };
	});

	(function () {
		// someApp.js
		var mathpp = require("./lib/mathplusplus");
		var exp = mathpp.exp, pi = mathpp.pi, e = mathpp.e;
		console.log("e^{π} = " + exp(pi));
	});

});

// #endregion

console.log("OK");
