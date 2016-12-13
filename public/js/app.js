var socket = io();

socket.on('connect', function() {
    console.log('Connected to socket.io server!');
});

socket.on('message', function(message) {
    console.log('new message');
    console.log(message.text);
});

// Handles submitting of new message
var $form = jQuery('#message-form');

$form.on('submit', function(event) {
    event.preventDefault();

    socket.emit('message', {
        text: $form.find('input[name=message]').val()
    })
    $("#message-form")[0].reset();
});