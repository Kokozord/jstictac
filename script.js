const Gameboard = (function() {
    var board_array = ['', '', '', '', '', '', '', '', ''];
    function board() {
        return board_array;
    };
    function resetBoard() {
        board_array = ['', '', '', '', '', '', '', '', ''];
        let cells = document.getElementsByClassName('game-cell');
        for (i = 0; i < cells.length; i++) {
            cells[i].textContent = '';
            cells[i].classList.remove('x')
            cells[i].classList.remove('o')
        }
        document.getElementsByTagName('BODY')[0].style.background = 'white';
        let grats = document.getElementById('grats')
        if (grats !== null) {
            grats.parentNode.removeChild(grats);
        }
    };
    return {board, resetBoard}
})()

const Player = function(name, mark) {
    return {name, mark}
}

const Game = (function() {
    var board = Gameboard.board();
    const playerOne = Player('Koko', 'x');
    const playerTwo = Player('Okok', 'o');
    const winCombos = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    let currentPlayer = playerOne;
    let gameOver = false;
    function startRound() {
        Gameboard.resetBoard();
        board = Gameboard.board();
        currentPlayer = playerOne;
        gameOver = false;
    }
    function nextPlayer() {
        currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
    }
    function checkWin() {
        mark = currentPlayer.mark
        let win = false;
        for (i = 0; i < winCombos.length; i++) {
                let combo = winCombos[i];
                if (board[combo[0]] === mark && board[combo[1]] === mark && board[combo[2]] === mark) {
                    win = true; 
                    break;
                }
         }
        return win;
    }
    function claimCell() {
        let mark = currentPlayer.mark
        let cell = event.target
        if (cell.textContent !== '' || gameOver === true) {
            return;
        }
        let index = parseInt(cell.dataset.cell)
        cell.textContent = mark;
        cell.classList.add(mark);
        board[index] = mark;
        if (checkWin()) {
            sayGrats();
            gameOver = true;
        };
        nextPlayer();
    };
    function sayGrats() {
        let gratsDiv = document.createElement('div');
        let parent = document.getElementById('game-display');
        gratsDiv.textContent = `${currentPlayer.name} won!`
        gratsDiv.id = 'grats'
        parent.appendChild(gratsDiv);
    }
    return {startRound, claimCell}
})()