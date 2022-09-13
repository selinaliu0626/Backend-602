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

// Use the zipCode module
const cities = require('./zipCodeModule_v2');

// GET request to the homepage

app.get('/',  (req, res) => {
	res.render('homeView');
});


//----------------------------------------------------------------------
//---------------------------------zip---------------------------

app.get('/zip', (req, res) => {
	let id = req.query.id;
	if (typeof id === 'undefined' || id === null) {
		res.render('lookupByZipForm');
	} else {
		let detail = cities.lookupByZipCode(id);
		if (typeof detail == 'undefined') {
			res.render('lookupByZipView', {
				zip: id,
				detail: 'No Record'
			})
		} else {
			res.format({
				'application/json': function () {
					res.json(detail);
				},
				'application/xml': function () {
					let info =
						'<?xml version="1.0"?>\n<zipCode id="' + detail._id + '">\n  <city>' + detail.city + '</city>\n  <state>' + detail.state + '</state>\n  <pop>' + detail.pop + '</pop>\n</zipCode>';
					res.type('application/xml');
					res.send(info);
				},
				'text/html': function () {
					res.render('lookupByZipView', {
						zip: id,
						detail: detail
					});
				},
				'default': function () {
					res.status(404);
					res.send("<b>404 - Not Found</b>");
				}
			})
		}
	}
});

app.post('/zip', (req, res) => {
	let detail = cities.lookupByZipCode(req.body.id);
	res.format({
		'application/json': function () {
			res.json(detail);
		},
		'application/xml': function () {
			let info =
				'<?xml version="1.0"?>\n<zipCode id="' + detail._id + '">\n  <city>' + detail.city + '</city>\n  <state>' + detail.state + '</state>\n  <pop>' + detail.pop + '</pop>\n</zipCode>';
			res.type('application/xml');
			res.send(info);
		},
		'text/html': function () {
			res.render('lookupByZipView', {
				zip: req.body.id,
				detail: detail
			});
		},
		'default': function () {
			res.status(404);
			res.send("<b>404 - Not Found</b>");
		}
	})

});

// Implement the JSON, XML, & HTML formats

app.get('/zip/:id', (req, res) => {
	let detail = cities.lookupByZipCode(req.params.id);
	res.format({
		'application/json': function () {
			res.json(detail);
		},
		'application/xml': function () {
			let info =
				'<?xml version="1.0"?>\n<zipCode id="' + detail._id + '">\n  <city>' + detail.city + '</city>\n  <state>' + detail.state + '</state>\n  <pop>' + detail.pop + '</pop>\n</zipCode>';
			res.type('application/xml');
			res.send(info);
		},
		'text/html': function () {
			res.render('lookupByZipView', {
				zip: req.params.id,
				detail: detail
			});
		},
		'default': function () {
			res.status(404);
			res.send("<b>404 - Not Found</b>");
		}
	})
});

//----------------------------------------------------------------------
//--------------------------------- city & state---------------------------


app.get('/city', (req, res) => {
	if (typeof req.query.city == 'undefined' || typeof req.query.state == 'undefined') {
		res.render('lookupByCityStateForm');
	} else {
		let popList = cities.lookupByCityState(req.query.city, req.query.state);
		res.render('lookupByCityStateView', {
			city: req.query.city,
			state: req.query.state,
			pops: popList.data
		})
	}
});

app.post('/city', (req, res) => {
	if (typeof req.body.city == 'undefined' || typeof req.body.state == 'undefined') {
		res.render('lookupByCityStateForm');
	} else {
		let popList = cities.lookupByCityState(req.body.city, req.body.state);
		res.render('lookupByCityStateView', {
			city: req.body.city,
			state: req.body.state,
			pops: popList.data
		})
	}
});

// Implement the JSON, XML, & HTML formats

app.get('/city/:city/state/:state', (req, res) => {
	if (typeof req.params.city == 'undefined' || typeof req.params.state == 'undefined') {
		res.render('lookupByCityStateForm');
	} else {
		let popList = cities.lookupByCityState(req.params.city, req.params.state);
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

//----------------------------------------------------------------------
//--------------------------------- population---------------------------

app.get('/pop', (req, res) => {
	if (typeof req.query.state == 'undefined') {
		res.render('populationForm');
	} else {
		res.render('populationView', {
			stateInfo: cities.getPopulationByState(req.query.state)
		})
	}
});

// Implement the JSON, XML, & HTML formats

app.get('/pop/:state', (req, res) => {
	let stateInfo = cities.getPopulationByState(req.params.state);
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


app.use((req, res) => {
	res.status(404);
	res.render('404');
});

app.listen(3000, () => {
  console.log('http://localhost:3000');
});




