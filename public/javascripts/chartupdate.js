var chart1; 
var chart2;
var chart3;

var socket = io.connect();

socket.on('error', function (err) {
	console.log(err);
})

socket.on('connect', function (err) {
	console.log('Connected');
})

	
function chart1feed() {
    var series = chart1.series[0];

    socket.on('update', function(results) {
    	  console.log("i am called first");
    	  console.log(results[0]);
    	  shift = series.data.length > 20;

    	  var a = parseInt(results[0]);
          var arr = [results[3], a];
          var json = JSON.stringify(arr);

          chart1.series[0].addPoint(eval(json), true, shift);
    } )
}

function chart2feed() {
    var series = chart2.series[0];

    socket.on('update', function(results) {
    	  console.log(results[1]);
    	  shift = series.data.length > 20;

    	  var b = parseInt(results[1]);
          var arr = [results[3], b];
          var json = JSON.stringify(arr);

          chart2.series[0].addPoint(eval(json), true, shift);
    } )
}

function chart3feed() {
    var series = chart3.series[0];

    socket.on('update', function(results) {
    	  console.log(results[2]);
    	  shift = series.data.length > 20;

    	  var c = parseInt(results[2]);
          var arr = [results[3], c];
          var json = JSON.stringify(arr);

          chart3.series[0].addPoint(eval(json), true, shift);
          console.log(results[4]);
          tableupdate(results);
    } )
}

function tableupdate(results) {
	console.log("i wasnt called!!!!!!!!!!!");
	var table = document.getElementById("mybody");
    var row = table.insertRow();
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    cell1.innerHTML = results[0];
    cell2.innerHTML = results[1];
    cell3.innerHTML = results[2];
    cell4.innerHTML = results[4];
}

$(document).ready(function() {

		Highcharts.setOptions({
				global: {
					useUTC: false
				}
		});

		chart1 = new Highcharts.Chart({
				chart: {
					renderTo: 'containera',
					defaultSeriesType: 'spline',
					events: {
						load: function() {
							chart1 = this;
							chart1feed();
						} 
						
					}
				},
				title: {
					text: '%SpO2'
				},
				xAxis: {
					type: 'datetime',
					tickPixelInterval: 150,
					maxZoom: 20 * 1000
				},
				yAxis: {
					minPadding: 0.2,
					maxPadding: 0.2,
					title: {
						text: '%SpO2',
						margin: 80
					}
				},
				series: [{
					name: '%SpO2',
					data: []
				}]
				
	    });
     
		chart2 = new Highcharts.Chart({
				chart: {
					renderTo: 'containerb',
					defaultSeriesType: 'spline',
					events: {
						load: function() {
							chart2 = this;
							chart2feed();
						} 
						
					}
				},
				title: {
					text: 'BPM'
				},
				xAxis: {
					type: 'datetime',
					tickPixelInterval: 150,
					maxZoom: 20 * 1000
				},
				yAxis: {
					minPadding: 0.2,
					maxPadding: 0.2,
					title: {
						text: 'BPM',
						margin: 80
					}
				},
				series: [{
					name: 'BPM',
					data: []
				}]
				
	    });
  

		chart3 = new Highcharts.Chart({
				chart: {
					renderTo: 'containerc',
					defaultSeriesType: 'spline',
					events: {
						load: function() {
							chart3 = this;
							chart3feed();
						} 
						
					}
				},
				title: {
					text: 'Pulse Amplitude'
				},
				xAxis: {
					type: 'datetime',
					tickPixelInterval: 150,
					maxZoom: 20 * 1000
				},
				yAxis: {
					minPadding: 0.2,
					maxPadding: 0.2,
					title: {
						text: 'Pulse Amplitude',
						margin: 80
					}
				},
				series: [{
					name: 'Pulse Amplitude',
					data: []
				}]
				
    });
});    