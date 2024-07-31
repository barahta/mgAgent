const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const fs = require('fs');
const app = express();
const server = http.createServer(app);
const cors = require('cors');
const multer = require('multer');
const io = socketIo(server, {
    cors: {
        origin: "http://localhost:3000", // указать ваш порт клиента
        methods: ["GET", "POST"]
    }
});

// Настройка multer для хранения файлов
app.use(cors());
app.use(express.static(path.join(__dirname, 'client', 'public')));

const upload = multer({
    dest: path.join(__dirname, 'client', 'public', 'images', 'slider'), // Папка для сохранения файлов
    limits: { fileSize: 5 * 1024 * 1024 } // Ограничение размера файла (5 MB)
});

app.post('/api/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    res.json({ filePath: `/images/slider/${req.file.filename}` });
});

app.get('/api/images', (req, res) => {
    const imagesDir = path.join(__dirname, 'client', 'public', 'images', 'slider');

    fs.readdir(imagesDir, (err, files) => {
        if (err) {
            console.error('Unable to scan directory:', err);
            return res.status(500).json({ error: 'Unable to scan directory' });
        }

        const imagePaths = files.map(file => `/images/slider/${file}`);
        res.json({ images: imagePaths });
    });
});

app.get('/api/images', (req, res) => {
    const imagesDir = path.join(__dirname, 'client', 'public', 'images', 'slider');

    fs.readdir(imagesDir, (err, files) => {
        if (err) {
            console.error('Unable to scan directory:', err);
            return res.status(500).json({ error: 'Unable to scan directory' });
        }

        const imagePaths = files.map(file => `/images/slider/${file}`);
        res.json(imagePaths); // Возвращаем массив путей
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