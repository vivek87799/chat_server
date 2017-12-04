//Express is a nodejs framework
var express = require('express');
var socket = require('socket.io');
var app = express();

// A call back function to listen and get the message
var server = app.listen(9001,function(){
    console.log('listening at 9001');
});


//Redirecting the request to the views
app.use(express.static('view'));

var io = socket(server);
//listens for connection or calls from client
io.on('connection',function(socket){
    console.log('connecting');
    socket.on('cmessage',function(data){
        //Now the received message is sent to all the connected clients or all the open sockets
        //forwarding response to all the sockets
        console.log(socket.id)
        console.log(data);
        io.sockets.emit('cmessage',data)
    })
    socket.on('getchatid',function(id){
        console.log(id)
        console.log(socket.id)
        io.sockets.emit('getchatid',socket.id)
    })
});
