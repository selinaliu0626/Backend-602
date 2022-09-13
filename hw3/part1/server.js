const express = require('express');
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// setup handlebars view engine
const handlebars = require('express-handlebars');

app.engine('handlebars', 
	handlebars({defaultLayout: 'main'}));

app.set('view engine', 'handlebars');

// static resources
app.use(express.static(__dirname + '/public'));

// Use the employee module
const cities = require('./mongo_zipCodeModule_v2');

// GET request to the homepage

app.get('/', function (req, res){
	res.render('homeView');
});

app.get('/zip', async function(req, res) {
	if (req.query.id) {
		let id = req.query.id;
		let result = await cities.lookupByZipCode(id);
		res.render('lookupByZipView', result);
	} else {
		res.render('lookupByZipForm');
	}
});

app.post('/zip', async function(req, res) {
	let id = req.body.id;
	let result = await cities.lookupByZipCode(id);
	res.render('lookupByZipView', result);
});


app.get('/zip/:id', async function(req, res) {
	let id = req.params.id;
	let result = await cities.lookupByZipCode(id);

	res.format({

		'application/json': function() {
			res.json(result);
		},

		'application/xml': function() {
			let resultXml = 
				'<?xml version="1.0"?>\n' +
						'<zipCode id="' + result._id + '">\n' + 
						'   <city>' + result.city + '</city>\n' + 
						'   <state>' + result.state + '</state>\n' + 	
						'   <pop>' + result.pop + '</pop>\n' + 				 
						'</zipCode>\n';
					
			
			res.type('application/xml');
			res.send(resultXml);
		},

		'text/html': function() {
			res.render('lookupByZipView', result);

		}
	});
});


// Complete the code for the following

app.get('/city', async function(req, res){

	if (typeof req.params.city == 'undefined' || typeof req.params.state == 'undefined') {
		res.render('lookupByCityStateForm');
	} else {
		let popList = await cities.lookupByCityState(req.params.city, req.params.state);
		res.format({
			'application/json': function () {
				res.json(popList);
			},
			'application/xml': function () {
				let info =
					'<?xml version="1.0"?>\n<city-state city="' + popList.city + '" state="' + popList.state+'">\n' + popList.data.map(function (c) {
						return '  <entry zip="'+c.zip+'" pop="'+c.pop+'" />';
					}).join('\n') + '\n</city-state>\n';
				res.type('application/xml');
				res.send(info);
			},
			'text/html': function () {
				res.render('lookupByCityStateView', {
					city: req.params.city,
					state: req.params.state,
					pops: popList.data
				});
			},
			'default': function () {
				res.status(404);
				res.send("<b>404 - Not Found</b>");
			}
		})
	}
});

app.post('/city', async function(req, res){
	if (typeof req.body.city == 'undefined' || typeof req.body.state == 'undefined') {
		res.render('lookupByCityStateForm');
	} else {
		let popList = await cities.lookupByCityState(req.body.city, req.body.state);
		res.render('lookupByCityStateView', {
			city: req.body.city,
			state: req.body.state,
			pops: popList.data
		})
	}
	

});

app.get('/city/:city/state/:state', async function(req, res) {
	let city = req.params.city;
	let state = req.params.state;
	let result = await cities.lookupByCityState(city, state);
	res.format({
		'application/json': function () {
			res.json(result);
		},
		'application/xml': function () {
			let info =
				'<?xml version="1.0"?>\n<city-state city="' + result.city + '" state="' + result.state+'">\n' + result.data.map(function (c) {
					return '  <entry zip="'+c.zip+'" pop="'+c.pop+'" />';
				}).join('\n') + '\n</city-state>\n';
			res.type('application/xml');
			res.send(info);
		},
		'text/html': function () {
			res.render('lookupByCityStateView', {
				city: req.params.city,
				state: req.params.state,
				pops: result.data
			});
		},
		'default': function () {
			res.status(404);
			res.send("<b>404 - Not Found</b>");
		}
	})

});

app.get('/pop', async function(req, res) {
	if (typeof req.query.state == 'undefined') {
		res.render('populationForm');
	} else {
		res.render('populationView', {
			stateInfo: await cities.getPopulationByState(req.query.state)
		})
	}
	
});

app.get('/pop/:state', async function(req, res) {
	let stateInfo = await cities.getPopulationByState(req.params.state);
	res.format({
		'application/json': function () {
			res.json(stateInfo);
		},
		'application/xml': function () {
			let info =
				'<?xml version="1.0"?>\n<state-pop state="' + stateInfo.state + '">\n  <pop>' + stateInfo.pop + '</pop>\n</state-pop>';
			res.type('application/xml');
			res.send(info);
		},
		'text/html': function () {
			res.render('populationView', {
				stateInfo: stateInfo
			});
		},
		'default': function () {
			res.status(404);
			res.send("<b>404 - Not Found</b>");
		}
	})

});


app.use(function(req, res) {
	res.status(404);
	res.render('404');
});

app.listen(3000, function(){
  console.log('http://localhost:3000');
});




