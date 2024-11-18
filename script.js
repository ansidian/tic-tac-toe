const GameBoard = (() => {
    const gameBoard = Array(9).fill("");

    const rows = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8]
    ];

    const columns = [
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8]
    ];

    const diagonals = [
        [0, 4, 8],
        [2, 4, 6]
    ];

    const getBoard = () => {
        return gameBoard
    };

    const isLineComplete = (line) => {
        const firstMarker = gameBoard[line[0]];
        if (firstMarker === "") return false;
        return line.every(position => gameBoard[position] === firstMarker);
    }

    const checkWin = () => {
        return (
            rows.some(isLineComplete) ||
            columns.some(isLineComplete) ||
            diagonals.some(isLineComplete)
        )
    }

    const checkDraw = () => {
        if (gameBoard.every(position => position !== "")) return true;
    }

    return {
        getBoard: () => getBoard(),
        makeMove: (position, marker) => {
            if (gameBoard[position] === "") {
                gameBoard[position] = marker;
                return true;
            } else return false;
        },
        checkWin,
        checkDraw
    }
})();

const createPlayer = (name, marker) => {
    return {
        name,
        marker,
        makeMove: (position) => {
            return GameBoard.makeMove(position, marker);
        }
    }
}

const Game = (() => {
    let player1 = createPlayer("Player 1", "X");
    let player2 = createPlayer("Player 2", "O");
    let currentPlayer = player1;
    let isGameOver = false;

    const switchPlayer = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    }

    const makeMove = (position) => {
        if (isGameOver) return false;
        if (currentPlayer.makeMove(position)) {
            if (GameBoard.checkWin()) {
                isGameOver = true;
                console.log(`${currentPlayer.name} wins!`);
                return true;
            } else if (GameBoard.checkDraw()) {
                isGameOver = true;
                console.log("Draw!");
                return true;
            }
            switchPlayer();
            return true;
        }
        return false;
    }
    return {
        makeMove,
        getCurrentPlayer: () => currentPlayer,
        isGameOver: () => isGameOver
    }
})();

const displayBoardController = (() => {
    const space = document.querySelectorAll(".game-board-cell");

    const render = () => {
        const board = GameBoard.getBoard();
        space.forEach((space, index) => {
            space.innerText = board[index];
        })
    }

    const initializeBoard = () => {
        space.forEach((space, index) => {
            space.addEventListener("click", () => {
                if (Game.makeMove(index)) {
                    render();
                }
            })
        })
    }

    initializeBoard();
    render();

    return {initializeBoard, render}
})();