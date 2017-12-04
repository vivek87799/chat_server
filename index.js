//Express is a nodejs framework
var express = require('express')
var app = express();

// A call back function to listen and get the message
var server = app.listen(9000,function(){
    console.log('listening at 9000')
});

app.use(express.static('view'))
