var socket = io(); //-> this function is defined in the socketio library

//-> first argument is the event name and the second is the function to run when the
//    when the event happens
socket.on('connect', function () {  
	console.log('Connected to socket.io server!');
});

//-> Event that it listens to from the server
socket.on('message', function (message){
	console.log('New message here!');
	console.log(message.text);
});