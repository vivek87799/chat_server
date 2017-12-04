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
//listens for connection
io.on('connection',function(socket){
    console.log('connecting');
});
