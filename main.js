const GameBoard = function () {
  let gameBoard = [
    ["_", "_", "_"],
    ["_", "_", "_"],
    ["_", "_", "_"],
  ];

  function resetGame() {
    gameBoard = [
      ["_", "_", "_"],
      ["_", "_", "_"],
      ["_", "_", "_"],
    ];
  }

  function checkBoard(board) {
    let isX = (item) => item == "X";
    let isY = (item) => item == "Y";
    let reversedBoard = reverseBoard(board);

    function reverseBoard(board) {
      let reverse = [];
      for (let i = 0; i < gameBoard.length; i++) {
        let column = [];
        for (let j = 0; i < gameBoard[i].length; j++) {
          column.push(gameBoard[j][i]);
        }
        reverse.push(column);
      }
      return reverse;
    }

    gameBoard.forEach((board) => {
      if (board.every(isX) || board.every(isY)) {
        console.log("Game is over");
      } else if (reversedBoard.every(isX) || reverseBoard(isY)) {
        console.log("Game is over");
      }
    });
  }
};
