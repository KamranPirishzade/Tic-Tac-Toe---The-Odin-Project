const GameBoard = function () {
  this.gameBoard = [
    ["_", "_", "_"],
    ["_", "_", "_"],
    ["_", "_", "_"],
  ];

  this.resetGame = function () {
    this.gameBoard = [
      ["_", "_", "_"],
      ["_", "_", "_"],
      ["_", "_", "_"],
    ];
  };

  this.setX = function (row, col) {
    this.gameBoard[row - 1][col - 1] = "X";
  };
  this.setO = function (row, col) {
    this.gameBoard[row - 1][col - 1] = "O";
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
  let score = 0;
  function win() {
    return `${name}, you are winner!
    ${pattern} wins`;
  }
  return {
    name,
    win,
    score,
  };
}

function play(formData) {
  let board = new GameBoard();
  const playerOne = createUser(formData.get("player1"), 1);
  const playerTwo = createUser(formData.get("player2"), 2);
  const result = document.getElementById("winner");
  const resetBtn = document.querySelector(".reset");
  document.getElementById("username1").textContent =
    playerOne.name + ": " + playerOne.score;
  document.getElementById("username2").textContent =
    playerTwo.name + ": " + playerOne.score;
  let isOver = checkBoard(board.gameBoard);
  resetBtn.style.display = "block";
  let turn = 1;

  resetBtn.addEventListener("click", () => {
    board.resetGame();
    document.querySelectorAll(".box").forEach((box) => {
      box.textContent = "";
    });
    result.textContent = "";
    isOver = checkBoard(board.gameBoard);
  });

  document.querySelectorAll(".box").forEach((box) => {
    box.addEventListener("click", (e) => {
      if (!isOver()) {
        let position = e.target.getAttribute("data-position");
        const row = +position.split(",")[0];
        const column = +position.split(",")[1];
        result.style.color = "green";
        if (e.target.textContent == "") {
          if (turn == 1) {
            board.setX(row, column);
            e.target.textContent = "X";
            e.target.style.color = "navy";
            turn = 2;
          } else {
            e.target.textContent = "O";
            e.target.style.color = "red";
            board.setO(row, column);
            turn = 1;
            console.log("Run O");
          }
        }
      }
      if (isOver()) {
        result.style.display = "block";
        if (isOver().isWinnerX) {
          result.textContent = playerOne.win();
          playerOne.score++;
        } else if (isOver().isWinnerO) {
          result.textContent = playerTwo.win();
          playerTwo.score++;
        } else {
          result.textContent = "Draw";
          result.style.color = "gray";
        }
        document.getElementById("username1").textContent =
          playerOne.name + ": " + playerOne.score;
        document.getElementById("username2").textContent =
          playerTwo.name + ": " + playerTwo.score;
      }
    });
  });
}

function newGame() {
  document.querySelector(".gameBoard").style.display = "none";
  document.querySelector(".newGame").style.display = "none";
  document.querySelector(".reset").style.display = "none";
  document.getElementById("username2").textContent = "";
  document.getElementById("username1").textContent = "";
  document.getElementById("winner").textContent = "";
  document.querySelector(".reset").style.display = "none";
}

const gameBoardDom = (document.querySelector(".gameBoard").style.display =
  "none");
const dialog = document.querySelector("dialog");
document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  let formData = new FormData(e.target);
  document.querySelector(".gameBoard").style.display = "grid";
  document.querySelector(".newGame").style.display = "block";
  play(formData);
  e.target.style.display = "none";
  document.querySelector(".newGame").addEventListener("click", () => {
    dialog.showModal();
  });
  document.querySelector(".yes").addEventListener("click", () => {
    dialog.close();
    e.target.reset();
    e.target.style.display = "flex";
    newGame();
  });
  document.querySelector(".no").addEventListener("click", () => {
    dialog.close();
  });
});
