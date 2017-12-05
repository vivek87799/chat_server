// Imports
// Express is a nodejs framework
var express = require('express');
var fs = require('fs')
var chathistory;
var socket = require('socket.io');
var app = express();
var newmessage = {};
var messageid = 0;

// Reading the chat history from txt file in sync so that it waits for the chat history to get loaded first
chathistory = JSON.parse(fs.readFileSync('db/chathistory.json'));
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
        try{
            messageid = chathistory[chathistory.length - 1].messageid + 1;            
        }catch(err){
            messageid = 0;
        }
        newmessage["messageid"] = messageid;
        newmessage["message"] = data;
        chathistory.push(newmessage);
        fs.writeFile('db/chathistory.json',JSON.stringify(chathistory, null, 2),finished);

        function finished(){
            console.log('message written to file');
        }
        // TODO received message should be stored to a persistant state
        //Now the received message is sent to all the connected clients or all the open sockets
        //forwarding response to all the sockets
        io.sockets.emit('cmessage',data)
    })

    // sends the unique chat id for a client
    socket.on('getchatid',function(id){
        io.sockets.emit('getchatid',socket.id)
    })

    // sending the chat history at init
    socket.on('chathistory',function(){
        io.sockets.emit('chathistory',chathistory)
    })
});
