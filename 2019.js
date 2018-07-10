"use strict";

const { es_new, es_old, success, fail, assert } = require("./libs/runners");

// ES2019
// ======

// #region Optional catch binding
// ------------------------------

es_new(() => {

	try {
		null.get();
	} catch {
		assert(true);

		return;
	}

	fail();

});

es_old(() => {

	// No equivalent

});

// #endregion

// #region JSON superset
// ---------------------

// ECMAScript claims JSON as a subset in JSON.parse, but (as has been well-documented
// that is not true because JSON strings can contain unescaped U+2028 LINE SEPARATOR
// and U+2029 PARAGRAPH SEPARATOR characters while ECMAScript strings cannot.

es_new(() => {

	const LS = ` `;
	const PS = eval(`'\u2029'`);

});

es_old(() => {

	// No equivalent

});

// #endregion

success();
