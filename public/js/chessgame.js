const socket = io();
const chess = new Chess();
const boardElement = document.querySelector('.chessboard');
const playerTurnElement = document.querySelector('#playerturn');

let playerRole = null;
const room = prompt('Enter a room name:');
socket.emit('joinRoom', room);

const renderBoard = () => {
    const board = chess.board();
    boardElement.innerHTML = '';
    playerTurnElement.textContent = chess.turn() === 'w' ? "White's Turn" : "Black's Turn";

    board.forEach((row, rowIndex) => {
        row.forEach((square, columnIndex) => {
            const squareElement = document.createElement('div');
            squareElement.classList.add('square');
            squareElement.classList.add((rowIndex + columnIndex) % 2 === 0 ? 'light' : 'dark');
            squareElement.dataset.row = rowIndex;
            squareElement.dataset.column = columnIndex;

            if (square) {
                const pieceElement = document.createElement('div');
                pieceElement.classList.add('piece', square.color === 'w' ? 'white' : 'black');
                pieceElement.innerHTML = getPieceUnicode(square);
                pieceElement.draggable = playerRole === square.color;
                pieceElement.addEventListener('dragstart', (e) => {
                    if (pieceElement.draggable) {
                        e.dataTransfer.setData('text/plain', JSON.stringify({ row: rowIndex, column: columnIndex }));
                    }
                });
                squareElement.appendChild(pieceElement);
            }

            squareElement.addEventListener('dragover', (e) => e.preventDefault());
            squareElement.addEventListener('drop', (e) => {
                e.preventDefault();
                if (!playerRole) return;

                const source = JSON.parse(e.dataTransfer.getData('text/plain'));
                const target = { row: rowIndex, column: columnIndex };

                const move = {
                    from: `${String.fromCharCode(97 + source.column)}${8 - source.row}`,
                    to: `${String.fromCharCode(97 + target.column)}${8 - target.row}`,
                    promotion: 'q',
                };

                socket.emit('move', { room, move });
            });

            boardElement.appendChild(squareElement);
        });
    });
    if (playerRole === 'b') {
        boardElement.classList.add('flipped');
    } else {
        boardElement.classList.remove('flipped');
    }
};

const getPieceUnicode = (piece) => {
    const unicodePiece = {
        p: '\u2659',
        r: '\u2656',
        n: '\u2658',
        b: '\u2657',
        q: '\u2655',
        k: '\u2654',
        P: '\u265F',
        R: '\u265C',
        N: '\u265E',
        B: '\u265D',
        Q: '\u265B',
        K: '\u265A',
    };
    return unicodePiece[piece.type] || '';
};

socket.on('playerRole', (role) => {
    playerRole = role;
    renderBoard();
});

socket.on('spectatorRole', () => {
    playerRole = null;
    renderBoard();
});

socket.on('move', (move) => {
    chess.move(move);
    renderBoard();
});

socket.on('boardState', (fen) => {
    chess.load(fen);
    renderBoard();
});

renderBoard();
