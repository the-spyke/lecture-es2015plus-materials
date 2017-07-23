"use strict";

const { es_new, es_old, assert } = require("./libs/runners");

// Arrows functions
// ================

// Statement Bodies
// ----------------

// More expressive closure syntax.

es_new(function () {

	var array = [2, 4, 6];

	var values = array.map((v, i) => {
		if (v % 4 === 0) {
			return v + i;
		} else {
			return v;
		}
	});

	assert(JSON.stringify(values) === `[2,5,6]`);

});

es_old(function () {

	var array = [2, 4, 6];

	var values = array.map(function (v, i) {
		if (v % 4 === 0) {
			return v + i;
		} else {
			return v;
		}
	});

	assert(JSON.stringify(values) === `[2,5,6]`);

});

// Expression Bodies
// -----------------

// More expressive closure syntax.

es_new(function () {

	var array = [2, 4, 6];

	var values = array.map((v, i) => v + i);

	assert(JSON.stringify(values) === `[2,5,8]`);

	values = array.map(v => ({ even: v, odd: v + 1 }));

	assert(JSON.stringify(values) === `[{"even":2,"odd":3},{"even":4,"odd":5},{"even":6,"odd":7}]`);

});

es_old(function () {

	var array = [2, 4, 6];

	var values = array.map(function (v, i) { return v + i; });

	assert(JSON.stringify(values) === `[2,5,8]`);

	values = array.map(function (v) { return { even: v, odd: v + 1 }; });

	assert(JSON.stringify(values) === `[{"even":2,"odd":3},{"even":4,"odd":5},{"even":6,"odd":7}]`);

});



// Lexical `this`
// --------------

// More intuitive handling of current object context.

es_new(function () {

	this.array.forEach(v => {
		if (v % 5 === 0) {
			this.fives.push(v);
		}
	});

	assert(JSON.stringify(this.fives) === `[5,10]`);

}.bind({
	array: [1, 5, 7, 10],
	fives: []
}));

es_old(function () {

	var me = this;

	this.array.forEach(function (v) {
		if (v % 5 === 0) {
			me.fives.push(v);
		}
	});

	assert(JSON.stringify(this.fives) === `[5,10]`);

}.bind({
	array: [1, 5, 7, 10],
	fives: []
}));

console.log("OK");
