var socket = io();

socket.on('connect', function() {
    console.log('Connected to socket.io server!');
});

socket.on('message', function(message) {
    var momentTimestamp = moment.utc(message.timestamp);

    console.log('new message');
    console.log(message.text);
    console.log(momentTimestamp)
    jQuery('.messages').append('<p>' + momentTimestamp.format('H:mm a ') + message.text + '</p>');
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