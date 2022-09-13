const net = require('net');

const colors = require('colors');

const cities = require('./zipCodeModule_v2');

const server = net.createServer((socket) => {

	console.log("Client connection...".red);

	socket.on('end', () => {
		console.log("Client disconnected...".red);
	});

	// HW Code - Write the following code to process data from client
	
	socket.on('data', (data) => {

		let input = data.toString().toUpperCase();
		console.log(colors.blue('...Received %s'), input);

		// Fill in the rest
		const inputArray = input.split(",");
		let output = 'Invalid request';
		switch (inputArray[0]) {
			case "getPopulationByState".toUpperCase():
				output = JSON.stringify(cities.getPopulationByState(inputArray[1]));
				break;
			case "lookupByCityState".toUpperCase():
				output = JSON.stringify(cities.lookupByCityState(inputArray[1], inputArray[2]));
				break;
			case "lookupByZipCode".toUpperCase():
				output = JSON.stringify(cities.lookupByZipCode(inputArray[1]));
		}
		socket.write(output);
	});

});

// listen for client connections
server.listen(3000, () => {
	console.log("Listening for connections on port 3000");
});
