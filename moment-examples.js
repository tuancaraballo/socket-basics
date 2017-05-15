var moment = require('moment');

var now = moment();
console.log(now.format());

console.log(now.format('X')); //--> this is the number of seconds since Thu, 01 Jan 1970 00:00:00 GMT
							  //--> this is how you want to store time, so that it's easier to do math
console.log(now.format('x')); //-> in miliseconds
console.log("== value of ===");
console.log(now.valueOf()); //-> in miliseconds

var timestamp = 1494815217;

var timestampMoment = moment.utc(timestamp);
console.log("=======");
console.log(timestampMoment.local().format('h:mma')); //--> this calculate the offset
console.log("=======");

now.subtract(1, 'year');

console.log(now.format());
console.log(now.format('MMM Do YYYY, h:mma'));