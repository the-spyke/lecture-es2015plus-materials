"use strict";

const { es_new, es_old, success, assert, json } = require("./libs/runners");

// Classes
// =======

// #region Class definition
// ------------------------

// More intuitive, OOP-style and boilerplate-free classes.

es_new(function () {

	class Shape {
		constructor(id, x, y) {
			this.id = id;
			this.move(x, y);
		}

		move(x, y) {
			this.x = x;
			this.y = y;
		}
	}

	var shape = new Shape(123, 10, 20);

	assert(shape.id === 123);
	assert(shape.x === 10);
	assert(shape.y === 20);

});

es_old(function () {

	function Shape(id, x, y) {
		this.id = id;
		this.move(x, y);
	}

	Shape.prototype.move = function (x, y) {
		this.x = x;
		this.y = y;
	};

	var shape = new Shape(123, 10, 20);

	assert(shape.id === 123);
	assert(shape.x === 10);
	assert(shape.y === 20);

});

// #endregion

// #region Class inheritance
// -------------------------

// More intuitive, OOP-style and boilerplate-free inheritance.

es_new(function () {

	class Shape {
		constructor(id, x, y) {
			this.id = id;
			this.move(x, y);
		}

		move(x, y) {
			this.x = x;
			this.y = y;
		}
	}

	class Circle extends Shape {
		constructor(id, x, y, radius) {
			super(id, x, y);
			this.radius = radius;
		}
	}

	var circle = new Circle(123, 0, 0, 10);

	assert(circle.id === 123);
	assert(circle.radius === 10);

});

es_old(function () {

	function Shape(id, x, y) {
		this.id = id;
		this.move(x, y);
	}

	Shape.prototype.move = function (x, y) {
		this.x = x;
		this.y = y;
	};

	function Circle(id, x, y, radius) {
		Shape.call(this, id, x, y);
		this.radius = radius;
	}

	Circle.prototype = Object.create(Shape.prototype);
	Circle.prototype.constructor = Circle;

	var circle = new Circle(123, 0, 0, 10);

	assert(circle.id === 123);
	assert(circle.radius === 10);

});

// #endregion

// #region Base class access
// -------------------------

// Intuitive access to base class constructor and methods.

es_new(function () {

	class Shape {
		constructor(id, x, y) {
			this.id = id;
			this.move(x, y);
		}

		move(x, y) {
			this.x = x;
			this.y = y;
		}

		toString() {
			return "Shape(" + this.id + ")";
		}
	}

	class Circle extends Shape {
		constructor(id, x, y, radius) {
			super(id, x, y);
			this.radius = radius;
		}

		toString() {
			return "Circle > " + super.toString();
		}
	}

	var circle = new Circle(123, 0, 0, 10);

	assert(circle.toString() === "Circle > Shape(123)");

});

es_old(function () {

	function Shape(id, x, y) {
		this.id = id;
		this.move(x, y);
	}

	Shape.prototype.move = function (x, y) {
		this.x = x;
		this.y = y;
	};

	Shape.prototype.toString = function (x, y) {
		return "Shape(" + this.id + ")";
	};

	function Circle(id, x, y, radius) {
		Shape.call(this, id, x, y);
		this.radius = radius;
	};

	Circle.prototype = Object.create(Shape.prototype);
	Circle.prototype.constructor = Circle;

	Circle.prototype.toString = function () {
		return "Circle > " + Shape.prototype.toString.call(this);
	};

	var circle = new Circle(123, 0, 0, 10);

	assert(circle.toString() === "Circle > Shape(123)");

});

// #endregion

// #region Static members
// ----------------------

// Simple support for static class members.

es_new(function () {

	class Shape {
		constructor(id, x, y) {
			this.id = id;
			this.move(x, y);
		}

		move(x, y) {
			this.x = x;
			this.y = y;
		}
	}


	class Circle extends Shape {
		constructor(id, x, y, radius) {
			super(id, x, y);
			this.radius = radius;
		}

		static defaultCircle() {
			return new Circle("default", 0, 0, 100);
		}
	}

	var defCircle = Circle.defaultCircle();

	assert(defCircle.id === "default");
	assert(defCircle.radius === 100);

});

es_old(function () {

	function Shape(id, x, y) {
		this.id = id;
		this.move(x, y);
	}

	Shape.prototype.move = function (x, y) {
		this.x = x;
		this.y = y;
	};

	Shape.prototype.toString = function (x, y) {
		return "Shape(" + this.id + ")";
	};

	function Circle(id, x, y, radius) {
		Shape.call(this, id, x, y);
		this.radius = radius;
	};

	Circle.prototype = Object.create(Shape.prototype);
	Circle.prototype.constructor = Circle;

	Circle.defaultCircle = function () {
		return new Circle("default", 0, 0, 100);
	};

	var defCircle = Circle.defaultCircle();

	assert(defCircle.id === "default");
	assert(defCircle.radius === 100);

});

// #endregion

// #region Getters and setters
// ---------------------------

// Getter/Setter also directly within classes (and not just within object
// initializers, as it is possible since ECMAScript 5.1).

es_new(function () {

	class Circle {
		constructor(radius) {
			this.$radius = radius;
		}

		get radius() { return this.$radius; }
		set radius(radius) { this.$radius = radius; }

		get area() { return Math.PI * this.$radius * this.$radius; }
	};

	var circle = new Circle(1);

	assert(circle.area === Math.PI);

});

es_old(function () {

	function Circle(radius) {
		this.$radius = radius;
	};

	Circle.prototype = {
		get radius() { return this.$radius; },
		set radius(radius) { this.$radius = radius; },

		get area() { return Math.PI * this.$radius * this.$radius; }
	};

	var circle = new Circle(1);

	assert(circle.area === Math.PI);

});

// #endregion

success();
