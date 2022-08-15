require('colors');
const ZipCodeEmitter = require('./zipCodeEmitter').ZipCodeEmitter;

const cities = new ZipCodeEmitter();

cities.on('LookupByZip',cities.lookupByZipCode);

cities.on('LookupByCityState',cities.lookupByCityStateHandlerOne);

cities.on('LookupByCityState',cities.lookupByCityStateHandlerTwo);

cities.on('printRed', function (data) {
    console.log(data.red);
})

cities.on('printMagenta', function (data) {
    console.log(data.magenta);
})

cities.on('print', function (data) {
    console.log(data);
})

console.log("Lookup by zip code (02215)".red);
cities.emit('LookupByZip', '02215');
console.log("Lookup by city (BOSTON,MA)".red);
cities.emit('LookupByCityState',"Boston","MA");
console.log("Get Population by State (MA)".red);
cities.getPopulationByState('MA');




