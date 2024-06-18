const BOARD_SIZE = 4; // 4x4 grid
const EMPTY_TILE = ' '; // Empty tile value

let board = [];
let moves = 0;

function initializeBoard() {
    let numbers = Array.from({ length: BOARD_SIZE * BOARD_SIZE - 1 }, (_, i) => i + 1);
    numbers.push(EMPTY_TILE);
    numbers.sort(() => Math.random() - 0.5);

    board = [];
    for (let i = 0; i < BOARD_SIZE; i++) {
        board[i] = [];
        for (let j = 0; j < BOARD_SIZE; j++) {
            board[i][j] = numbers[i * BOARD_SIZE + j];
        }
    }

    renderBoard();
}

function renderBoard() {
    const puzzleBoard = document.getElementById('puzzle-board');
    puzzleBoard.innerHTML = '';

    for (let i = 0; i < BOARD_SIZE; i++) {
        for (let j = 0; j < BOARD_SIZE; j++) {
            const tile = document.createElement('div');
            tile.classList.add('tile');
            tile.textContent = board[i][j] === EMPTY_TILE ? '' : board[i][j];
            tile.onclick = () => moveTile(i, j);
            puzzleBoard.appendChild(tile);
        }
    }
}

function moveTile(row, col) {
    if (board[row][col] === EMPTY_TILE) {
        return; // Empty tile, do nothing
    }

    // Check adjacent tiles
    if (row > 0 && board[row - 1][col] === EMPTY_TILE) {
        swapTiles(row, col, row - 1, col);
    } else if (row < BOARD_SIZE - 1 && board[row + 1][col] === EMPTY_TILE) {
        swapTiles(row, col, row + 1, col);
    } else if (col > 0 && board[row][col - 1] === EMPTY_TILE) {
        swapTiles(row, col, row, col - 1);
    } else if (col < BOARD_SIZE - 1 && board[row][col + 1] === EMPTY_TILE) {
        swapTiles(row, col, row, col + 1);
    }

    checkWinCondition();
}

function swapTiles(row1, col1, row2, col2) {
    const temp = board[row1][col1];
    board[row1][col1] = board[row2][col2];
    board[row2][col2] = temp;

    moves++;
    renderBoard();
}

function checkWinCondition() {
    const targetBoard = Array.from({ length: BOARD_SIZE * BOARD_SIZE - 1 }, (_, i) => i + 1);
    targetBoard.push(EMPTY_TILE);

    let flatBoard = board.flat();
    if (JSON.stringify(flatBoard) === JSON.stringify(targetBoard)) {
        alert(`Congratulations! You solved the puzzle in ${moves} moves!`);
    }
}

function startGame() {
    initializeBoard();
    moves = 0;
}
