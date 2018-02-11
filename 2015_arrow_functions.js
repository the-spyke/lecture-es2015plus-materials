"use strict";

const { es_new, es_old, assert, json } = require("./libs/runners");

// Arrow functions
// ===============

// #region Syntax
// --------------

es_new(function () {

	var array = [2, 4, 6];

	var values = array.map(v => v * 2);

	assert(json(values) === `[4,8,12]`);

	values = array.map((v, i) => v + i);

	assert(json(values) === `[2,5,8]`);

	values = array.map(v => ({ even: v, odd: v + 1 }));

	assert(json(values) === `[{"even":2,"odd":3},{"even":4,"odd":5},{"even":6,"odd":7}]`);

	values = array.map((v, i) => {
		if (v % 4 === 0) {
			return i;
		} else {
			return v;
		}
	});

	assert(json(values) === `[2,1,6]`);

});

es_old(function () {

	var array = [2, 4, 6];

	var values = array.map(function (v) { return v * 2; });

	assert(json(values) === `[4,8,12]`);

	values = array.map(function (v, i) { return v + i; });

	assert(json(values) === `[2,5,8]`);

	values = array.map(function (v) { return { even: v, odd: v + 1 }; });

	assert(json(values) === `[{"even":2,"odd":3},{"even":4,"odd":5},{"even":6,"odd":7}]`);

	values = array.map(function (v, i) {
		if (v % 4 === 0) {
			return i;
		} else {
			return v;
		}
	});

	assert(json(values) === `[2,1,6]`);

});

// #endregion

// #region Lexical `this`
// ----------------------

// More intuitive handling of current object context

es_new(function (array) {

	array.forEach(v => {
		if (v % 5 === 0) {
			this.fives.push(v);
		}
	});

	assert(json(this.fives) === `[5,10]`);

}.bind({ fives: [] }, [1, 5, 7, 10]));

es_old(function (array) {

	var me = this;

	array.forEach(function (v) {
		if (v % 5 === 0) {
			me.fives.push(v);
		}
	});

	assert(json(this.fives) === `[5,10]`);

}.bind({ fives: [] }, [1, 5, 7, 10]));

// #endregion

console.log("OK");
