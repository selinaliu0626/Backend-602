const MongoClient = require('mongodb').MongoClient;
const credentials = require("./credentials.js");

const dbUrl = 'mongodb+srv://' + credentials.username +
	':' + credentials.password + '@' + credentials.host + '/' + credentials.database;

let client = null;

const getConnection = async () => {
	if (client == null)
		client = await MongoClient.connect(dbUrl,  { useNewUrlParser: true ,  useUnifiedTopology: true });
	return client;
}

module.exports.lookupByZipCode =  async (zip) => {
		
	let client = await getConnection();
	let collection = client.db(credentials.database).collection('zipcodes');
	
	let result = await collection.find({'_id': zip}).toArray();
	
	if (result.length > 0)
		return result[0];
	else
		return undefined;
};

// Complete the code for the following

module.exports.lookupByCityState = async (city, state) => {

	let client = await getConnection();
	let collection = client.db(credentials.database).collection('zipcodes');
	
	// Fill in the rest
	let result = (await collection.find({'city': city.toUpperCase(), 'state': state.toUpperCase()}).sort({"_id":1}).toArray()).map(function (info) {
		return '{ "zip": "' + info._id + '", "pop": ' + info.pop +' }';
	});

	if (result.length > 0) {
		let resString = '{ "city": "' + city + '", "state": "' + state + '", "data": [' + result + ' ]}';
		return JSON.parse(resString);
	} else {
		return undefined;
	}
};

module.exports.getPopulationByState = 
	async (state) => {

		let client = await getConnection();
		let collection = client.db(credentials.database).collection('zipcodes');
	
		// Fill in the rest
		let popSum = (await collection.find({'state': state}).toArray()).reduce((pop, info) => pop + info.pop, 0);
		if (popSum != null) {
			let resString = '{ "state": "'+ state + '", "pop": ' + popSum + '}';
			return JSON.parse(resString);
		} else {
			return undefined;
		}
		
	};

