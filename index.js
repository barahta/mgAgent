const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const fs = require('fs');
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "http://localhost:3000", // указать ваш порт клиента
        methods: ["GET", "POST"]
    }
});

app.use(express.static(path.join(__dirname, 'client', 'public')));

app.get('/api/images', (req, res) => {
    const imagesDir = path.join(__dirname, 'client', 'public', 'images', 'slider');

    fs.readdir(imagesDir, (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Unable to scan directory' });
        }

        const imagePaths = files.map(file => `/images/slider/${file}`);
        res.json(imagePaths);
    });
});

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Server is running');
});

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('message', (message) => {
        console.log('message received: ', message);
        io.emit('message', message);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));