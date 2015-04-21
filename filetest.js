var x = 10;
var j ="aaaaaa" + "\t" + "aaaaaaaa" + "\t" + "aaaaaaaaa";
var fs = require("fs");

for (var i = x - 1; i >= 0; i--) {
	fs.appendFile('test.csv', j + "\r\n", 'utf8', function () {
		console.log("file created");
	})
};