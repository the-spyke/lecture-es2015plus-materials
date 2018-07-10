"use strict";

exports.es_new = function (skip, action) {
	if (arguments.length > 1) {
		return;
	}

	action = skip;

	action();
}

exports.es_old = function (skip, action) {
	if (arguments.length > 1) {
		return;
	}

	action = skip;

	action();
}

exports.assert = function (result) {
	if (!result) {
		throw new Error("Assetion failed!");
	}
};

exports.assertThrow = function (action) {
	try {
		action();
	} catch (e) {
		return;
	}

	throw new Error("Assetion failed!");
};

exports.json = function (value) {
	return JSON.stringify(value);
};

exports.success = function () {
	console.log("⭐⭐⭐ SUCCESS ⭐⭐⭐");
}

exports.fail = function () {
	throw new Error("Fail!");
};
