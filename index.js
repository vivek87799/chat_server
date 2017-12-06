var express = require('express');
var socket = require('socket.io');
var fs = require('fs');

const PORT = 9001;

var app = express();
var filepath = 'db/chathistory.json';
var viewpath = 'view';
var conn = 'connection';
var chathistory;
var newmessage = {};
var messageid = 0;
var pmessageid = 'messageid';
var pmessage = 'message';
var _cmessage = 'cmessage';
var _chathistory = 'chathistory';

// handles the error if the file does not exist in write
try{
    // Reading the chat history from txt file in sync so that it waits for the chat history to get loaded first
    chathistory = JSON.parse(fs.readFileSync(filepath));
    messageid = chathistory[chathistory.length - 1].messageid + 1;                
}catch(err){
    console.log(err);
    chathistory = [];
    // creates init message id if the db is empty
    messageid = 0;   
}
// A call back function to listen and get the message
var server = app.listen(PORT,function(err,data){
    console.log('listening to port', PORT);
});
var io = socket(server);

//Redirecting the request to the views
app.use(express.static(viewpath));

//listens for connection or calls from client
io.on(conn,function(socket){
    socket.on(_cmessage,function(data){

        newmessage = {};
        newmessage[pmessageid] = messageid;
        newmessage[pmessage] = data;
        chathistory.push(newmessage);

        // Writing the chat to the file
        try{
            fs.writeFileSync(filepath,JSON.stringify(chathistory, null, 2));            
        }catch(err){
            console.log('error while writing to chathistory', err);
        }
        
        // Now the received message is sent to all the connected clients
        io.sockets.emit(_cmessage,data)
    })

    // Depricated
    // sends the unique chat id for a client
    socket.on('_getchatid',function(id){
        io.sockets.emit('_getchatid',socket.id)
    })

    // sending the chat history at init
    socket.on(_chathistory,function(){
        io.sockets.emit(_chathistory,chathistory)
    })
});
