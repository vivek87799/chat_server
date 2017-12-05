var socket = io.connect('http://localhost:9001');
//Storing the text in dom
var message = document.getElementById('messagearea');
var chatarea = document.getElementById('chatarea');
var chatid = document.getElementById('chatid')
var btn = document.getElementById('sendmessage');
var cid;

// To get unique id for the chat
window.onload = function(){
    socket.emit('getchatid');    
};
window.onfocus = function(){
    cid = socket.id.slice(-4);
    document.getElementById("chatid").value = cid;    
}

// Listener to listen when a message is being sent
// It forwards or emits the message to the server
btn.addEventListener('click',function(){
    socket.emit('cmessage',{
        chatid: socket.id.slice(-4),        
        message: message.value

    });
});

//listens to the port to get the generated socket id
socket.on('getchatid',function(id){
    console.log(id);
    cid = id.slice(-4);
    document.getElementById("chatid").value = cid;
})

//listens to the port for new message
socket.on('cmessage',function(data){
    console.log(data);
    console.log(socket.id)
    chatarea.innerHTML += '<p>' + data.chatid + ':' + data.message + '<p>'; 
})