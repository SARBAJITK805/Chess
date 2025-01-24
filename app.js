import express from 'express';
import { Server } from 'socket.io';
import { Chess } from 'chess.js';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import { error } from 'console';

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const chess = new Chess();

let players = {};
let currentPlayer = "w";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (_, res) => {
    res.render('index');
});


io.on("connection", (socket) => {
    console.log("New connection");
    if (!players.white) {
        players.white = socket.id;
        socket.emit("playerRole", "w");
    } else if (!players.black) {
        players.black = socket.id;
        socket.emit("playerRole", "b");
    } else {
        socket.emit("spectatorRole");
    }

    socket.on("disconnect", () => {
        if (players.white === socket.id) {
            delete players.white;
        }
        else if (players.black === socket.id) {
            delete players.black;
        }
    })

    socket.on("move", (move) => {
        try {
            if (chess.turn() === 'w' && players.white !== socket.id) return;
            if (chess.turn() === 'b' && players.black !== socket.id) return;

            const result = chess.move(move);
            if (!result) {
                console.log("Invalid move", move);
                socket.emit("invalidMove", move);
                throw new error(result)
            }
            currentPlayer = chess.turn();
            io.emit("move", move);
            io.emit("boardState", chess.fen());
        } catch (error) {
            console.log("Error while moving pieces", error);
            socket.emit("InvalidMove", move);
        }
    })
});


server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
