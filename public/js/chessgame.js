const socket = io();
const chess = new Chess();
const boardElement = document.querySelector('.chessboard');

let draggedPiece = null;
let sourceSquare = null;
let playerRole = null;

const renderBoard = () => {
    const board = chess.board();
    boardElement.innerHTML = '';
    const pt = document.querySelector('#playerturn');
    if (chess.turn() == 'w') {
        pt.innerHTML = 'White Turn';
    } else {
        pt.innerHTML = 'Black Turn';
    }
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
                        draggedPiece = pieceElement;
                        sourceSquare = { row: rowIndex, column: columnIndex };
                        e.dataTransfer.setData('text/plain', '');
                    }
                });

                pieceElement.addEventListener('dragend', () => {
                    draggedPiece = null;
                    sourceSquare = null;
                });
                squareElement.appendChild(pieceElement);
            }

            squareElement.addEventListener('dragover', (e) => {
                e.preventDefault();
            });
            squareElement.addEventListener('drop', (e) => {
                e.preventDefault();
                if (draggedPiece) {
                    const targetSquare = {
                        row: parseInt(squareElement.dataset.row),
                        column: parseInt(squareElement.dataset.column)
                    };
                    handelMove(sourceSquare, targetSquare);
                }
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

const handelMove = (sourceSquare, targetSquare) => {
    const move = {
        from: `${String.fromCharCode(97 + sourceSquare.column)}${8 - sourceSquare.row}`,
        to: `${String.fromCharCode(97 + targetSquare.column)}${8 - targetSquare.row}`,
        promotion: 'q'
    }
    socket.emit("move", move);
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
    return unicodePiece[piece.type] || "";
};

socket.on("playerRole", (role) => {
    playerRole = role;
    renderBoard();
});

socket.on("spectatorRole", () => {
    playerRole = null;
    renderBoard();
});

socket.on("move", (move) => {
    chess.move(move);
    renderBoard();
});

socket.on("boardState", (fen) => {
    chess.load(fen);
    renderBoard();
});

renderBoard();