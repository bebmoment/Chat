const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');

let messages = '';

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('chat', { messages });
});

io.on('connection', socket => {
    console.log('A user connected');

    socket.on('chat message', (msgObj) => {
        messages += msgObj.user + ": " + msgObj.chat + "<br/>";
        io.emit('update messages', messages); // broadcast updated messages to all clients
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

http.listen(3000, () => {
    console.log('Listening on *:3000');
});
