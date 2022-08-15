let data;
data = require('./zips.json');

module.exports.lookupByZipCode =  (zip) => {
    for (let i = 0; i < data.length; i++) {
        if (data[i]._id === zip) {
            console.log(data[i]);
            return;
        }
    }
    console.log(undefined);
};

module.exports.lookupByCityState = (city, state) => {
    var res=[];
    const targetState = state.toUpperCase();
    const targetCity = city.toUpperCase();
    for (let i = 0; i < data.length; i++) {
        if (data[i].city.toUpperCase() === targetCity && data[i].state.toUpperCase() === targetState) {
            res.push('{ "zip": "' + data[i]._id + '", "pop": ' + data[i].pop +' }');
        }
    }
    if (res != null) {
        let resString = '{ "city": "' + city + '", "state": "' + state + '", "data": [' + res + ' ]}';
        console.log(JSON.parse(resString));
    }
};

module.exports.getPopulationByState = (state) => {
    const targetState = state.toUpperCase();
    let popSum = 0;
    for (let i = 0; i < data.length; i++) {
        if (data[i].state.toUpperCase() === targetState) {
            popSum += data[i].pop
        }
    }
    let resString = '{ "state": "'+ state + '", "pop": ' + popSum + '}';
    console.log(JSON.parse(resString));
};

