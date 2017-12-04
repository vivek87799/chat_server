var socket = io.connect('http://localhost:9001');
//Storing the text in dom
var message = document.getElementById('messagearea');
var chatarea = document.getElementById('chatarea');
var chtid = document.getElementById('chatid')
var btn = document.getElementById('sendmessage');

console.log('test socket id on init')
socket.emit('getchatid');
console.log(socket.id);
document.getElementById("chatid").value = socket.id;


// Listener to listen when a message is being sent
// It forwards or emits the message to the server
btn.addEventListener('click',function(){
    document.getElementById("chatid").value = socket.id;    
    socket.emit('cmessage',{
        message: message.value,
        chtid: socket.id

    });
});

//listens to the port for new message
socket.on('chatid',function(id){
    console.log(data);
    document.getElementById("chatid").value = id;
})

//listens to the port for new message
socket.on('cmessage',function(data){
    console.log(data);
    chatarea.innerHTML += '<p>' + data.chtid + data.message + '<p>'; 
})