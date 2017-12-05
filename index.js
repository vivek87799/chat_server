// Imports
// Express is a nodejs framework
var express = require('express');
var fs = require('fs')
// Reading the chat history from txt file in sync so that it waits for the chat history to get loaded first
var chathistory;
chathistory = fs.readFileSync('db/chathistory.json');
var socket = require('socket.io');
var app = express();

console.log(chathistory);

// A call back function to listen and get the message
var server = app.listen(9001,function(){
    console.log('listening at 9001');
});


//Redirecting the request to the views
app.use(express.static('view'));

var io = socket(server);
//listens for connection or calls from client
io.on('connection',function(socket){
    socket.on('cmessage',function(data){
        console.log(chathistory);
        console.log('adding new')
        chathistory = chathistory + JSON.stringify(data, null, 2);
        console.log(chathistory);        
        
        fs.writeFile('db/chathistory.json',chathistory,finished);

        function finished(){
            console.log('message written to file');
        }
        // TODO received message should be stored to a persistant state
        //Now the received message is sent to all the connected clients or all the open sockets
        //forwarding response to all the sockets
        io.sockets.emit('cmessage',data)
    })
    socket.on('getchatid',function(id){
        io.sockets.emit('getchatid',socket.id)
    })
});
