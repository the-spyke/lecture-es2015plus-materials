"use strict";

const { es_new, es_old, success, assert, assertThrow, json } = require("./libs/runners");
const { getAsyncValue, getAsyncIterator } = require("./libs/utils");

// ES2018
// ======

// #region Lifting template literal restriction
// --------------------------------------------

// Removes the restriction on escape sequences to allow the embedding of languages (DSLs etc.).

es_new(() => {

	function tag(strings, values) {
		return {
			cooked: strings,
			raw: strings.raw,
		};
	}

	assert(tag`\unicode and \u{55}` === `{cooked:["K"],raw:["\\unicode and \\u{55}"]}`);

	assertThrow(() => {
		const bad = `bad escape sequence: \unicode`; // Throws an error without a tag function
	});

});

es_old(() => {

	// No equivalent

});

// #endregion

// #region `s` (dotAll) flag for regular expressions
// -------------------------------------------------

// The new `s` flag makes `.` match any character, including line terminators.

es_new(() => {

	assert(`foo\nbar`.test(/foo.bar/s) === true);

});

es_old(() => {

	// Hacky
	assert(`foo\nbar`.test(/foo[^]bar/) === true);

});

// #endregion

// #region RegExp named capture groups
// -----------------------------------

// A capture group can be given a name using the `(?<name>...)` syntax

es_new(() => {

	const result = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/.exec(`2015-01-02`);

	assert(result.groups.year === `2015`);
	assert(result.groups.month === `01`);
	assert(result.groups.day === `02`);

	assert(result[0] === `2015-01-02`);
	assert(result[1] === `2015`);
	assert(result[2] === `01`);
	assert(result[3] === `02`);

});

es_old(() => {

	// No equivalent

});

// #endregion

// #region Rest/spread properties
// ------------------------------

es_new(() => {

	const { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };

	assert(x === 1);
	assert(y === 2);
	assert(json(z) === `{a:3,b:4}`);

	const n = { x, y, ...z };

	assert(json(n) === `{x:1,y:2,a:3,b:4}`);

});

es_old(() => {

	// Manually or
	// const z = lodash.omit(obj, ["x", "y"]);

});

// #endregion

// #region RegExp lookbehind assertions
// ------------------------------------

es_new(() => {

	// $ before digits must exist
	assert(`$99.89`.test(/(?<=\$)\d+/) === true);

	// $ before digits must not exist
	assert(`$99.89`.test(/(?<!\$)\d+/) === false);

});

es_old(() => {

	// No equivalent

});

// #endregion

// #region RegExp Unicode property escapes
// ---------------------------------------

// Until now, it hasn’t been possible to access Unicode character properties natively in regular expressions.

es_new(() => {

	assert(`π`.test(/\p{Script=Greek}/u) === true);

});

es_old(() => {

	// No equivalent

});

// #endregion

// #region Promise.prototype.finally()
// -----------------------------------

es_new(() => {

	getAsyncValue()
		.finally(() => {
			console.log(`Before all`);
		})
		.then(value => {
			console.log(value);
		})
		.catch(error => {
			console.error(error);
		})
		.finally(() => {
			console.log(`After all`);
		});

});

es_old(() => {

	const beforeAll = () => console.log(`Before all`);
	const afterAll = () => console.log(`After all`);

	getAsyncValue()
		.then(
			value => {
				beforeAll();

				return value;
			},
			error => {
				beforeAll();

				return Promise.reject(error);
			}
		)
		.then(value => {
			console.log(value);
		})
		.catch(error => {
			console.error(error);
		})
		.finally(
			value => {
				afterAll();

				return value;
			},
			error => {
				afterAll();

				return Promise.reject(error);
			}
		);

});

// #endregion

// #region Asynchronous iteration
// ------------------------------

es_new(async () => {

	for await (const item of getAsyncIterator()) {
		console.log(item);
	}

});

es_old(() => {

	// No equivalent

});

// #endregion

success();
