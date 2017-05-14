var PORT = process.env.PORT || 3000;
var express = require('express');

var app = express();
var http = require('http').Server(app);// --> start a new server node and use this
									   // express app as the boiler plate
									   // anything that express listens to, the server should also listen to

var io = require('socket.io')(http); //->format that socket io expects

app.use(express.static(__dirname + '/public'));

io.on('connection', function () {//--> it lets the socket listen for events
	console.log('User connected via socket.io!');
}); 

http.listen(PORT, function () {
	console.log('Server listening on port ' + PORT + ' ...');
})