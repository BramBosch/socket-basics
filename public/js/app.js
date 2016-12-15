var name = getQueryVariable('name') || 'Anonymous';
var room = getQueryVariable('room');

console.log(name + ' wants to join ' + room);

// update h1 room tag
jQuery('.room-title').text(room);


var socket = io();

socket.on('connect', function() {
    console.log('Connected to socket.io server!');
    socket.emit('joinRoom', {
        name: name,
        room: room
    });
});

socket.on('message', function(message) {
    var momentTimestamp = moment.utc(message.timestamp);
    var $messages = jQuery('.messages');
    var $message = jQuery('<li class="list-group-item"></li>')
    console.log('new message');
    console.log(message.text);
    console.log(momentTimestamp)
    $messages.append('<p><strong>' + message.name + ': ' + momentTimestamp.format('H:mm a ') + '</strong></p>')
    $message.append('<p>' + message.text + '</p>');
    $messages.append($message);
});

// Handles submitting of new message
var $form = jQuery('#message-form');

$form.on('submit', function(event) {
    event.preventDefault();

    socket.emit('message', {
        name: name,
        text: $form.find('input[name=message]').val()
    })
    $("#message-form")[0].reset();
});