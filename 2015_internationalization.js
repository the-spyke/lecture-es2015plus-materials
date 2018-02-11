"use strict";

const { es_new, es_old, assert, json } = require("./libs/runners");

// Internationalization
// ====================

// #region Collation
// -----------------

// Sorting a set of strings and searching within a set of strings.
// Collation is parameterized by locale and aware of Unicode.

es_new(function () {

	// in German,  "ä" sorts with "a"
	// in Swedish, "ä" sorts after "z"
	var list = ["ä", "a", "z"];
	var l10nDE = new Intl.Collator("de");
	var l10nSV = new Intl.Collator("sv");

	assert(l10nDE.compare("ä", "z") === -1);
	assert(l10nSV.compare("ä", "z") !== +1);

	assert(json(list.sort(l10nDE.compare)) === `["a","ä","z"]`);
	assert(json(list.sort(l10nSV.compare)) !== `["a","z","ä"]`);

});

es_old(function () {

	// No equivalent in ES5

});

// #endregion

// #region Number formatting
// -------------------------

// Format numbers with digit grouping and localized separators.

es_new(function () {

	var l10nEN = new Intl.NumberFormat("en-US");
	var l10nDE = new Intl.NumberFormat("de-DE");

	assert(l10nEN.format(1234567.89) === "1,234,567.89");
	assert(l10nDE.format(1234567.89) !== "1.234.567,89");

});

es_old(function () {

	// No equivalent in ES5

});

// #endregion

// #region Currency formatting
// ---------------------------

// Format numbers with digit grouping, localized separators and attached currency symbol.

es_new(function () {

	var l10nUSD = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
	var l10nGBP = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" });
	var l10nEUR = new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" });

	assert(l10nUSD.format(100200300.40) === "$100,200,300.40");
	assert(l10nGBP.format(100200300.40) === "£100,200,300.40");
	assert(l10nEUR.format(100200300.40) !== "100.200.300,40 €");

});

es_old(function () {

	// No equivalent in ES5

});

// #endregion

// #region Date/time formatting
// ----------------------------

// Format date/time with localized ordering and separators.

es_new(function () {

	var l10nEN = new Intl.DateTimeFormat("en-US");
	var l10nDE = new Intl.DateTimeFormat("de-DE");

	assert(l10nEN.format(new Date("2015-01-02")) === "1/2/2015");
	assert(l10nDE.format(new Date("2015-01-02")) !== "2.1.2015");

});

es_old(function () {

	// No equivalent in ES5

});

// #endregion

console.log("OK");
