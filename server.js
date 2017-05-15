var PORT = process.env.PORT || 3000;
var express = require('express');
var moment = require('moment');

var app = express();
var http = require('http').Server(app);// --> start a new server node and use this
									   // express app as the boiler plate
									   // anything that express listens to, the server should also listen to

var io = require('socket.io')(http); //->format that socket io expects

app.use(express.static(__dirname + '/public'));

var clientInfo = {};


/*
	Lessons

 1-	The socket argument is an individual socket/ individual connection that talks to our server, 
	it could be yours or someone else

 2-	Know the difference between emit and listen, socket.on listens socket.emit just emits
 3- Learn the difference between
 		socket.broadcast.emit : THIS SENDS IT TO EVERYONE, BUT NOT THE PERSON WHO EMITTED IT
			          io.emit : THIS ALSO INCLUDES THE PERSON WHO EMITS THE MESSAGE
*/

io.on('connection', function (socket) {//--> it lets the socket listen for events
	console.log('User connected via socket.io!');

	socket.on('joinRoom', function (request) {
		clientInfo[socket.id] = request; //--> saves the socket_room ID
		socket.join(request.room);  //--> specific method that binds  a socket to specific room name
		socket.broadcast.to(request.room).emit('message', { //--> to allows you to send message to this room socket only
			name: 'System',
			text: request.name + " has joined!",
			timestamp: moment.valueOf()
		});
	});
	//--> this listens for the event, this allows two browsers to talk to each other
	//-> event that it listens to from the client
	socket.on('message', function (message) {
		console.log('Message received ' + message.text);

		message.timestamp = moment().valueOf();

		io.to(clientInfo[socket.id].room).emit('message',message); //--> only emits the info to the chats
																	// where the user is logged in
		//socket.broadcast.emit('message',message);  
	});

	//--> message sent to the user from server when he connects to the server
	socket.emit('message', { 
		name: 'System',
		text: 'Welcome to my Stanford chat application',
		timestamp: moment().valueOf()
	});
}); 

http.listen(PORT, function () {
	console.log('Server listening on port ' + PORT + ' ...');
})