document.addEventListener('DOMContentLoaded', () => {
    const boardSize = 15;
    const board = Array.from({ length: boardSize }, () => Array(boardSize).fill(null));
    const gameBoard = document.getElementById('game-board');
    const status = document.getElementById('status');
    const resetButton = document.getElementById('reset-button');
    const startButton = document.getElementById('start-button');
    const setup = document.getElementById('setup');
    const player1Input = document.getElementById('player1-name');
    const player2Input = document.getElementById('player2-name');
    let currentPlayer = 'X';
    let player1Name = 'プレイヤー1';
    let player2Name = 'プレイヤー2';
    let gameActive = true;

    function createBoard() {
        gameBoard.innerHTML = '';
        for (let row = 0; row < boardSize; row++) {
            for (let col = 0; col < boardSize; col++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.dataset.row = row;
                cell.dataset.col = col;
                cell.addEventListener('click', handleCellClick);
                gameBoard.appendChild(cell);
            }
        }
    }

    function handleCellClick(event) {
        const row = parseInt(event.target.dataset.row);
        const col = parseInt(event.target.dataset.col);

        if (board[row][col] || !gameActive) {
            return;
        }

        board[row][col] = currentPlayer;
        event.target.textContent = currentPlayer;

        if (checkWin(row, col)) {
            status.textContent = `${currentPlayer === 'X' ? player1Name : player2Name} の勝ち!`;
            gameActive = false;
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        status.textContent = `${currentPlayer === 'X' ? player1Name : player2Name} の番`;
    }

    function checkWin(row, col) {
        const directions = [
            [1, 0], [0, 1], [1, 1], [1, -1]
        ];

        for (let [dx, dy] of directions) {
            let count = 1;
            for (let i = 1; i < 5; i++) {
                const x = row + dx * i;
                const y = col + dy * i;
                if (x >= 0 && x < boardSize && y >= 0 && y < boardSize && board[x][y] === currentPlayer) {
                    count++;
                } else {
                    break;
                }
            }

            for (let i = 1; i < 5; i++) {
                const x = row - dx * i;
                const y = col - dy * i;
                if (x >= 0 && x < boardSize && y >= 0 && y < boardSize && board[x][y] === currentPlayer) {
                    count++;
                } else {
                    break;
                }
            }

            if (count >= 5) {
                return true;
            }
        }

        return false;
    }

    function resetGame() {
        board.forEach(row => row.fill(null));
        currentPlayer = 'X';
        gameActive = true;
        status.textContent = `${player1Name} の番`;
        createBoard();
    }

    function startGame() {
        player1Name = player1Input.value || 'プレイヤー1';
        player2Name = player2Input.value || 'プレイヤー2';
        setup.style.display = 'none';
        gameBoard.style.display = 'grid';
        resetButton.style.display = 'block';
        status.textContent = `${player1Name} の番`;
        resetGame();
    }

    startButton.addEventListener('click', startGame);
    resetButton.addEventListener('click', resetGame);

    createBoard();
});
