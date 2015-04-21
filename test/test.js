var chatserver = require('./../lib/chartserver');

var fs = require('fs');

var test_text = "%SpO2 BPM Pulse Amplitude Current time" + "\r\n";

exports['createfile'] = function(test) {
	appendfile('testfile.txt', "randomdata");
	var bool = fs.existsSync('testfile.txt');
	test.ok(bool, "Value Should be true");
}

exports['Read serial data'] =  function (test) {
	test.expect(2);

	var ev = new events.EventEmitter();

    process.openStdin = function () { return ev; };
    process.exit = test.done;

    console.log = function (str) {
        test.equal(str, test_text);
    };

    doubled.read();
    ev.emit('data', '12');
}

exports['serial parser'] = function (test) {
    test.equal(chartserver.sp(2), 4);
    test.equal(chartserver.sp(5), 10);
    test.throws(function () { chartserver.sp(); });
    test.throws(function () { chartserver.sp(null); });
    test.throws(function () { chartserver.sp(true); });
    test.throws(function () { chartserver.sp([]); });
    test.throws(function () { chartserver.sp({}); });
    test.throws(function () { chartserver.sp('/requires/'); });
    test.throws(function () { chartserver.sp('123'); });
    test.done();
};

exports[''] = function (test) {
    test.expect(1);
    var ev = new events.EventEmitter();

    process.openStdin = function () { return ev; };
    process.exit = test.done;
    chartserver.on = function () {
        throw new Error('Expected a socket identifier');
    };
    console.log = function (str) {
        test.equal(str, 'socket port');
    };

    chartserver.read();
    ev.emit('data', 'asdf');
};

xports['read'] = nodeunit.testCase({

    setUp: function () {
        this._openStdin = process.openStdin;
        this._log = console.log;
        this._calculate = sp.calculate;
        this._exit = process.exit;

        var ev = this.ev = new events.EventEmitter();
        process.openStdin = function () { return ev; };
    },
    tearDown: function () {
        // reset all the overidden functions:
        process.openStdin = this._openStdin;
        process.exit = this._exit;
        doubled.calculate = this._calculate;
        console.log = this._log;
    },

    'Socket buffer': function (test) {
        test.expect(1);

        process.exit = test.done;
        sp.calculate = function () {
            throw new Error('');
        };
        console.log = function (str) {
            test.equal(str, 'ERRNET error');
        };
        doubled.read();
        this.ev.emit('data', 'asdf');
    },

    'buildUP': function (test) {
        test.expect(1);

        process.exit = test.done;
        console.log = function (str) {
            test.equal(str, 'spline');
        };
        doubled.read();
        this.ev.emit('data', '12');
    }

});