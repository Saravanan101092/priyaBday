/**
 * Created by saravanan on 18-05-2017.
 */
var express = require('express');
var bodyParser = require('body-parser');
var path    = require("path");
var consolidate = require('consolidate');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var messages = [];
app.use(express.static(__dirname + '/www'));
// assign the template engine to .html files
app.engine('html', consolidate['swig']);

// set .html as the default extension
app.set('view engine', 'html');

app.get('/main',
    function(req, res) {
        res.sendFile(path.join(__dirname+'/www/main.html'));
    });

app.get('/',
    function(req, res) {
        res.sendFile(path.join(__dirname+'/www/index.html'));
    });



server.listen(process.env.PORT || 8087, function() {
    console.log("Listening on port 8087");
});


io.sockets.on('connection', function(socket) {
    console.log('user connected');
    socket.emit('messages', messages);

    socket.on('newMsg', function(obj) {
    	console.log("new message"+obj.text);
    	messages.push(obj);
        socket.broadcast.emit('newMsgServer', obj);
    });

    socket.on('disconnect', function() {
        console.log("user disconnected");
    });
});