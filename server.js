const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('A user connected');

    setInterval(() => {
        const randomNumber = parseInt(Math.random() * 100);
        socket.emit('randomNumber', randomNumber);
    }, 1000);

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(3000, (err) => {
    if (err) {
        console.error('Error starting the server:', err);
    } else {
        console.log('Server is running on http://localhost:3000');
    }
});
