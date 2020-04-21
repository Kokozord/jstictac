const Gameboard = (function() {
    var board = ['', '', '', '', '', '', '', '', ''];
    function resetBoard() {
        console.log(board)
        board = ['', '', '', '', '', '', '', '', ''];
        let cells = document.getElementsByClassName('game-cell');
        for (i = 0; i < cells.length; i++) {
            cells[i].textContent = '';
            cells[i].classList.remove('x')
            cells[i].classList.remove('o')
        }
        document.getElementsByTagName('BODY')[0].style.background = 'white';
    };
    return {board, resetBoard}
})()

const Player = function(name, mark) {
    return {name, mark}
}

const Game = (function() {
    var board = Gameboard.board;
    const playerOne = Player('Koko', 'x');
    const playerTwo = Player('Okok', 'o');
    const winCombos = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    let currentPlayer = playerOne;
    function startRound() {
        Gameboard.resetBoard();
        board = Gameboard.board;
        console.log(board)
    }
    function nextPlayer() {
        currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
    }
    function checkWin() {
        console.log(board)
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
        if (cell.textContent !== '') {
            return;
        }
        let index = parseInt(cell.dataset.cell)
        cell.textContent = mark;
        cell.classList.add(mark);
        board[index] = mark;
        if (checkWin()) {
            sayGrats();
        };
        nextPlayer();
    };
    function sayGrats() {
        document.getElementsByTagName('BODY')[0].style.background = 'green';
    }
    return {startRound, claimCell}
})()