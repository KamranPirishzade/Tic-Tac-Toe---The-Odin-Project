const GameBoard = function () {
  this.gameBoard = [
    ["_", "_", "_"],
    ["_", "_", "_"],
    ["_", "_", "_"],
  ];

  function resetGame() {
    this.gameBoard = [
      ["_", "_", "_"],
      ["_", "_", "_"],
      ["_", "_", "_"],
    ];
  }

  this.setX = function (row, col) {
    this.gameBoard[row - 1][col - 1] = "X";
  };
  this.setO = function (row, col) {
    this.gameBoard[row - 1][col - 1] = "O";
  };
  this.checkPlace = function (row, col) {
    if (
      this.gameBoard[row - 1][col - 1] == "_" &&
      row > 0 &&
      row < 4 &&
      col > 0 &&
      col < 4
    ) {
      return true;
    }
    return false;
  };
};

function checkBoard(board) {
  let isX = (item) => item == "X";
  let isO = (item) => item == "O";
  let isWinnerX = false;
  let isWinnerO = false;

  function reverseBoard() {
    let reverse = [];
    for (let i = 0; i < board.length; i++) {
      let column = [];
      for (let j = 0; j < board.length; j++) {
        column.push(board[j][i]);
      }
      reverse.push(column.reverse());
    }
    return reverse;
  }

  function checkRows(board) {
    for (let i = 0; i < board.length; i++) {
      if (board[i].every(isX)) {
        isWinnerX = true;
        return true;
      } else if (board[i].every(isO)) {
        isWinnerO = true;
        return true;
      }
    }
    return false;
  }

  function checkDiagonal(board) {
    let start = board[0][0];
    for (let i = 0; i < board.length; i++) {
      if (start !== board[i][i] || board[i][i] === "_") return false;
    }
    if (start == "X") {
      isWinnerX = true;
    } else {
      isWinnerO = true;
    }
    return true;
  }

  function isEmpty() {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++) {
        if (board[i][j] == "_") {
          return true;
        }
      }
    }
    return false;
  }

  return function () {
    let reversedBoard = reverseBoard(board);
    if (
      checkRows(board) ||
      checkRows(reversedBoard) ||
      checkDiagonal(board) ||
      checkDiagonal(reversedBoard)
    ) {
      return { over: true, isWinnerX, isWinnerO };
    } else if (!isEmpty()) {
      return { over: true, isWinnerX, isWinnerO };
    } else {
      return false;
    }
  };
}

function createUser(name, number) {
  let pattern = number == 1 ? "X" : "O";

  function getPosition() {
    const input = prompt(
      `${name}, please give the position for ${pattern} (Example: 1,3)`
    );
    const row = +input.split(",")[0];
    const col = +input.split(",")[1];

    return [row, col];
  }

  function win() {
    return `${name}, you are winner!
    ${pattern} wins`;
  }
  return {
    name,
    number,
    pattern,
    getPosition,
    win,
  };
}

function play() {
  const playerOne = createUser("Kamran", 1);
  const playerTwo = createUser("Hasan", 2);
  const board = new GameBoard();
  let isOver = checkBoard(board.gameBoard);
  let turn = 1;
  while (!isOver().over) {
    if (turn == 1) {
      let position = playerOne.getPosition();
      if (board.checkPlace(...position)) {
        board.setX(...position);
        turn = 2;
      } else {
        alert("Position is full");
        continue;
      }
    } else {
      let position = playerTwo.getPosition();
      if (board.checkPlace(...position)) {
        board.setO(...position);
        turn = 1;
      } else {
        alert("Position is full");
        continue;
      }
    }
    if (isOver().isWinnerO) {
      alert("O is winner");
    }
    if (isOver().isWinnerX) {
      alert("X is winner");
    }
  }
}

play();

// document.querySelector("form").addEventListener("submit", (e) => {
//   let formData = new FormData(e.target);
// });
