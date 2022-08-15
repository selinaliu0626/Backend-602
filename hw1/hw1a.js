const cities = require('./zipCodeModule_v1');
const colors = require('colors');

console.log("Lookup by zip code (02215)".red);
cities.lookupByZipCode('02215');
console.log("Lookup by zip code(99999)".red);
cities.lookupByZipCode('99999');
console.log("Lookup by city (Boston,MA)".red);
cities.lookupByCityState('BOSTON', 'MA');
console.log("Lookup by city (Boston,TX)".red);
cities.lookupByCityState('BOSTON', 'TX');
console.log("Lookup by city (Boston,AK)".red);
cities.lookupByCityState('BOSTON', 'AK');
console.log("Get Population by State (MA)".red);
cities.getPopulationByState('MA');
console.log("Get Population by State (TX)".red);
cities.getPopulationByState('TX');
console.log("Get Population by State (AA)".red);
cities.getPopulationByState('AA');