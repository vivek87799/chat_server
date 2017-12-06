// connects to the server on port 9001
var socket = io.connect('http://localhost:9001');

// Storing the text in dom
var messagearea = document.getElementById('messagearea');
var chatarea = document.getElementById('chatarea');
var chatid = document.getElementById('chatid');
var btn = document.getElementById('sendmessage');
var _cmessage = 'cmessage';
var _chathistory = 'chathistory';
var uchatid = 'anonymous';
var cid;


// To get chat id from the user
window.onload = function(){
    socket.emit(_chathistory); 
    uchatid = prompt('Enter chat id',uchatid);  
    if(uchatid.trim() == ""){
        chatid.value = "anonymous";                
    }else{
        chatid.value = uchatid;
    }
};

// Listener to listen when a message is being sent
// It forwards or emits the message to the server
btn.addEventListener('click',function(){
    // Validating for empty string
    if(messagearea.value.trim() == ""){
        alert('Please type the message before sending');
        return;
    }
    socket.emit(_cmessage,{
        chatid: chatid.value,//socket.id.slice(-4),        
        message: messagearea.value

    });
    
});

//listens to the port to get the generated socket id
socket.on(_chathistory,function(chathistory){
    chatarea.innerHTML = "";     
    for (var i = 0; i<chathistory.length;i++){
        chatarea.innerHTML += '<p>' + chathistory[i].message.chatid + ':' + chathistory[i].message.message + '<p>';
    }  
    // Scrolls the div to the end
    chatarea.scrollTop = chatarea.scrollHeight;    
})

//listens to the port for new message
socket.on(_cmessage,function(data){
    messagearea.value = "";
    chatarea.innerHTML += '<p><id>' + data.chatid + '</id>: ' + data.message + '<p>'; 
    // Scrolls the div to the end
    chatarea.scrollTop = chatarea.scrollHeight;
    
})