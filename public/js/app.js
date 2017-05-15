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


//--> This handles the submitting of new message
var $form = jQuery('#message-form');
$form.on('submit', function (event) {

//--> OJO: this function lets a form to not be submitted the old way, which refreshes the entire page
//         when using socket io, you want to use this function, so that the form handles the
//         submission on its own	
	event.preventDefault();

	var $message = $form.find('input[name=message]');
	socket.emit('message', {   
		text: $message.val() //-> this selects all input tags whose names are equal to message
	});                                    //--> .val() pulls the value out

	$message.val(''); //-> this resets the input
 });

