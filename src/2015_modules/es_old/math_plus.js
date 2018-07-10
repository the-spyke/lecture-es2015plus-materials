const math = require("./math");

for (symbol in math) {
	if (math.hasOwnProperty(symbol)) {
		exports[symbol] = math[symbol];
	}
}

exports.e = 2.71828182846;

exports.exp = function (x) {
	return Math.exp(x);
};
