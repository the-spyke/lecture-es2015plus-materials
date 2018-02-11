"use strict";

const { es_new, es_old, assert, json, simulate } = require("./libs/runners");

// Promises
// ========

// First class representation of a value that may be made asynchronously and be available in the future.

es_new(function () {

	function getUserNameById(userId) {
		return simulate().then(() => "Bob");
	}

	getUserNameById(123)
		.then(function (username) {
			console.log("In then");
			assert(username === "Bob");
		})
		.catch(function (error) {
			console.error(error);
		});

});

es_old(function () {

	function getUserNameById(userId, callback) {
		return simulate().then(() => callback(undefined, "Bob"));
	}

	getUserNameById(123, function (error, username) {
		console.log("In callback");

		if (error) {
			console.error(error);
		} else {
			assert(username === "Bob");
		}
	});

});

console.log("OK");
