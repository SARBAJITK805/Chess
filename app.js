import express from 'express';
import { Server } from 'socket.io';
import { Chess } from 'chess.js';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (_, res) => {
    res.render('index');
});

let rooms = {};

io.on('connection', (socket) => {
    console.log('New connection:', socket.id);

    socket.on('joinRoom', (room) => {
        if (!rooms[room]) {
            rooms[room] = {
                players: [],
                spectators: [],
                chess: new Chess(),
            };
        }

        const roomData = rooms[room];

        if (roomData.players.length < 2) {
            roomData.players.push(socket.id);
            const role = roomData.players.length === 1 ? 'w' : 'b';
            socket.join(room);
            socket.emit('playerRole', role);
        } else {
            roomData.spectators.push(socket.id);
            socket.join(room);
            socket.emit('spectatorRole');
        }

        socket.emit('boardState', roomData.chess.fen());
    });

    socket.on('move', (data) => {
        const { room, move } = data;
        const roomData = rooms[room];

        if (!roomData) return;

        const chess = roomData.chess;

        const currentPlayer = chess.turn();
        const playerIndex = roomData.players.indexOf(socket.id);
        const isValidPlayer =
            (currentPlayer === 'w' && playerIndex === 0) ||
            (currentPlayer === 'b' && playerIndex === 1);

        if (!isValidPlayer) return;

        const result = chess.move(move);
        if (!result) {
            socket.emit('invalidMove', move);
            return;
        }

        io.to(room).emit('move', move);
        io.to(room).emit('boardState', chess.fen());
    });

    socket.on('disconnect', () => {
        for (const room of Object.keys(rooms)) {
            const roomData = rooms[room];

            if (roomData.players.includes(socket.id)) {
                roomData.players = roomData.players.filter((id) => id !== socket.id);
            } else if (roomData.spectators.includes(socket.id)) {
                roomData.spectators = roomData.spectators.filter((id) => id !== socket.id);
            }
            if (roomData.players.length === 0 && roomData.spectators.length === 0) {
                delete rooms[room];
            }
        }
    });
});

server.listen(4000, () => {
    console.log('Server is running on http://localhost:4000');
});
