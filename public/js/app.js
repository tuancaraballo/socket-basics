var name = getQueryVariable('name') || 'Anonymous';

var room = getQueryVariable('room') || 'Unspecified room';

var socket = io(); //-> this function is defined in the socketio library

console.log(name + ' wants to join ' + room);


//-> first argument is the event name and the second is the function to run when the
//    when the event happens
socket.on('connect', function () {  
	console.log('Connected to socket.io server!');
	socket.emit('joinRoom', {
		name: name,
		room: room
	});
});


var $room_title = jQuery('.room-title');
$room_title.text(room);


//-> Event that it listens to from the server
socket.on('message', function (message){

	var $messages = jQuery('.messages');
	var $message = jQuery('<li class="list-group-item"></li>'); //-> creates an element

	var timestamp = message.timestamp;
	var timestampMoment = moment.utc(timestamp);
    var formattedTime = timestampMoment.local().format('h:mma');

	$message.append('<p><strong>' + message.name +" "+formattedTime + "</strong></p>" );
	$message.append("<p> "+message.text + '</p>');  //--> appends html
	$messages.append($message)
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
		name: name,         //--> this is the name that you grabbed from above
		text: $message.val() //-> this selects all input tags whose names are equal to message
	});                                    //--> .val() pulls the value out

	$message.val(''); //-> this resets the input
 });

