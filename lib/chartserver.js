var serialport = require("serialport");

var SerialPort = serialport.SerialPort;

var socketio = require('socket.io');

var fs = require('fs');

var datecreated = new Date();

var localetime = datecreated.toLocaleDateString();

var filename = "test" + localetime + ".csv"; 

var filecontent;


/*fs.appendFile('test.csv', j + "\r\n", 'utf8', function () {
		console.log("file created");
})*/

var heading = "%SpO2" + "\t" + "BPM" + "\t" + "Pulse Amplitude" + "\t" + "Current time" + "\r\n";


exports.listen = function (server) {

    io = socketio.listen(server);

    io.on('connection', function (socket) {
	    var result = [];

		var sp= new SerialPort("/dev/ttyACM0", {
		  baudrate: 9600,
		  parser: serialport.parsers.readline("\n")
		});

		appendfile(filename, heading);

		sp.on("open", function () {
		 
		  sp.on('data', function(data) {

		  	var currdate = new Date();

            var currtime = currdate.getTime();

            result[3] = currtime;

            result[4] = currdate.toLocaleTimeString();

		  	if(/\d+(?=-)/.test(data.substring(0,3)) && data.length <= 62)
		  	 {
		  	 	console.log("i didnt enter here");
		  	 	 if(data.substring(21,24) === "---")
			  	 {
			  	 	result[0] = 0;
			  	 }
			  	 else
			  	 {
			  	 	result[0] = data.substring(21,24);
			  	 }

			  	 if(data.substring(29,32) === "---")
			  	 {
			  	 	result[1] = 0;
			  	 }
			  	 else
			  	 {
			  	 	result[1] = data.substring(29,32);
			  	 }

			  	 if(data.substring(37,40) === "---")
			  	 {
			  	 	result[2] = 0;
			  	 }
			  	 else
			  	 {
			  	 	result[2] = data.substring(37,40);
			  	 }

			  	 filecontent = result[0] + "\t" + result[1] + "\t" + result[2] + "\t" + result[4] + "\r\n";

	             console.log("i emitted data");
	             console.log(data);
	             console.log(result);
			  	 socket.emit('update',result);
			  	 appendfile(filename, filecontent);
		  	 }
		  	else
		  	{
		  		/*console.log("i am the one stopped");
		  		if(result.length > 0)
		  		{
		  			socket.emit('update',result);
		  			appendfile(filename, filecontent);
		  	    }
		  	    else
		  	    {
		  	    	console.log("didnt call");
		  	    }*/
		  		return;
		  	} 
	         
		  	 /*console.log(data);
		     console.log(data.substring(21,24));
		     console.log(data.substring(29,32));
		     console.log(data.substring(37,40));*/
		  });
	    });
	});

	function appendfile (filename, filecontent) {
		fs.appendFile(filename, filecontent, 'utf8', function () {
			console.log("Data appended to file");
		  });
	}

}
