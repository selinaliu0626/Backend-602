const EventEmitter = require('events').EventEmitter;
const data = require('./zips.json');

// Custom class 
class ZipCodeEmitter  extends EventEmitter {
	
	// member functions

	lookupByZipCode(zip)  {
		this.emit('printMagenta', "Event lookupByZipCode raised!");
		for (let i = 0; i < data.length; i++) {
			if (data[i]._id === zip) {
				this.emit('printMagenta', JSON.stringify(data[i]));
				return;
			}
		}
		this.emit('printMagenta', undefined);
	}

	lookupByCityStateHandlerOne(city, state) {
		this.emit('printMagenta', "Event lookupByCityState raised!(Handler1)");
		var res = data.filter(function (info) {
			return info.city.toUpperCase() === city.toUpperCase() && info.state.toUpperCase() === state.toUpperCase();
		}).map(function (info) {
			return '{ "zip": "' + info._id + '", "pop": ' + info.pop +' }';
		});
		if (res != null) {
			let resString = '{ "city": "' + city + '", "state": "' + state + '", "data": [' + res + ' ]}';
			this.emit('print', JSON.parse(resString));
		}
	}

	lookupByCityStateHandlerTwo(city, state) {
		this.emit('printMagenta', "Event lookupByCityState raised!(Handler2)");
		var res = data.filter(function (info) {
			return info.city.toUpperCase() === city.toUpperCase() && info.state.toUpperCase() === state.toUpperCase();
		}).map(function (info) {
			return '   ' + info._id + ' has population of ' + info.pop +'\n';
		}).join('');
		if (res != null) {
			let resString = ' city: ' + city + ', state: ' + state + '\n' + res;
			this.emit('printMagenta', resString);
		}
	}

	getPopulationByState(state) {
		this.emit('printMagenta', "Event getPopulationByState raised!");
		const targetState = state.toUpperCase();
		let popSum = 0;
		for (let i = 0; i < data.length; i++) {
			if (data[i].state.toUpperCase() === targetState) {
				popSum += data[i].pop
			}
		}
		let resString = '{ "state": "'+ state + '", "pop": ' + popSum + '}';
		this.emit('printMagenta', resString);
	}

}

module.exports.ZipCodeEmitter = ZipCodeEmitter;

