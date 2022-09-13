// Copy your solution from Assignment1


let data = require('./zips.json');


module.exports.lookupByZipCode =  (zip) => {
    const res = data.find(element => element._id === zip);
    if(res == null) {
        return undefined;
    } else{
        return res;
    }
};

module.exports.lookupByCityState = (city, state) => {
    var res = data.filter(function (info) {
        return info.city.toUpperCase() === city.toUpperCase() && info.state.toUpperCase() === state.toUpperCase();
    }).map(function (info) {
        return '{ "zip": "' + info._id + '", "pop": ' + info.pop +' }';
    });
    if (res != null) {
        let resString = '{ "city": "' + city + '", "state": "' + state + '", "data": [' + res + ' ]}';
        return JSON.parse(resString);
    }
};

module.exports.getPopulationByState = (state) => {
    var popSum = data.filter(function (info) {
        return info.state.toUpperCase() === state.toUpperCase();
    }).reduce((pop, info) => pop + info.pop, 0);
    if (popSum != null) {
        let resString = '{ "state": "'+ state + '", "pop": ' + popSum + '}';
        return JSON.parse(resString);
    }
};

