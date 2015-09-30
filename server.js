var https = require('https');
var fs = require('fs');
var options = {
    key: fs.readFileSync('private/key.pem'),
    cert: fs.readFileSync('private/cert.pem')
};
// Chargement du fichier index.html affiché au client
var server = https.createServer(options,function(req, res) {
    fs.readFile('./public/client.html', 'utf-8', function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
    });
}).listen(8080);

// Chargement de socket.io
var io = require('socket.io').listen(server);
// Quand on client se connecte, on le note dans la console
io.sockets.on('connection', function (socket) {
    console.log('Un client est connecté !');
    socket.emit('client_connect');
	//A la connexion d'une personne, on emet un event.
    socket.on('client_connect', function() {
        socket.broadcast.emit('autre_connect');
    });
});