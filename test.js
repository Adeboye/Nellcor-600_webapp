var serialport = require("serialport");

var SerialPort = serialport.SerialPort;

var sp= new SerialPort("/dev/ttyACM0", {
	  baudrate: 9600,
	  parser: serialport.parsers.readline("\n")
	});

	sp.on("open", function () {
	  console.log('open');
	  sp.on('data', function(data) {
         
         /*result[0] = data.substring(21,24);
         result[1] = data.substring(29,32);
         result[2] = data.substring(37,40);

         socketemitter(result);*/

         if(/\d+(?=-)/.test(data.substring(0,3)))
	  	 {
	  	 	if(data.substring(10,18) === "---")
		  	 {
		  	 	
		  	 }
	  	 }

	  	 console.log(data);
	  	 if(data.substring(10,18) === "---")
	  	 {
	  	 	console.log("I got dashes");
	  	 }

	  	 if(/\d+(?=-)/.test(data.substring(0,3)))
	  	 {
	  	 	console.log(true);
	  	 }
	  	 else
	  	 {
	  	 	console.log('false');
	  	 }

	  	 console.log(data.substring(0,2));
	     console.log(data.substring(21,24));
	     console.log(data.substring(29,32));
	     console.log(data.substring(37,40));
	  });
	});