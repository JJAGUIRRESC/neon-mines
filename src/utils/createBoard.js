function createBoard(row, col, bombs) {
  let board = [];
  let mineLocation = [];

  // Create an empty board
  for (let x = 0; x < row; x++) {
    let boardCol = [];
    for (let y = 0; y < col; y++) {
      boardCol.push({
        value: 0,
        revealed: false,
        x: x,
        y: y,
        flagged: false,
      });
    }
    board.push(boardCol);
  }

  // Add random bombs to the board
  let bombsCount = 0;
  while (bombsCount < bombs) {
    let x = randomNum(0, row - 1);
    let y = randomNum(0, col - 1);

    if (board[x][y].value === 0) {
      board[x][y].value = "X";
      mineLocation.push([x, y]);
      bombsCount++;
    }
  }

  // Add the numbers to the array depending of the neighbor mines
  for (let rowIndex = 0; rowIndex < row; rowIndex++) {
    for (let colIndex = 0; colIndex < col; colIndex++) {
      if (board[rowIndex][colIndex].value === "X") {
        continue;
      }

      // Checks the top cell
      if (rowIndex > 0 && board[rowIndex - 1][colIndex].value === "X") {
        board[rowIndex][colIndex].value++;
      }

      // Checks the top-right cell
      if (
        rowIndex > 0 &&
        colIndex < col - 1 &&
        board[rowIndex - 1][colIndex + 1].value === "X"
      ) {
        board[rowIndex][colIndex].value++;
      }

      // Checks the top-left cell
      if (
        rowIndex > 0 &&
        colIndex > 0 &&
        board[rowIndex - 1][colIndex - 1].value === "X"
      ) {
        board[rowIndex][colIndex].value++;
      }

      // Checks the right cell
      if (colIndex < col - 1 && board[rowIndex][colIndex + 1].value === "X") {
        board[rowIndex][colIndex].value++;
      }

      // Checks the left cell
      if (colIndex > 0 && board[rowIndex][colIndex - 1].value === "X") {
        board[rowIndex][colIndex].value++;
      }

      // Checks the bottom cell
      if (rowIndex < row - 1 && board[rowIndex + 1][colIndex].value === "X") {
        board[rowIndex][colIndex].value++;
      }

      // Checks the bottom-right cell
      if (
        rowIndex < row - 1 &&
        colIndex < col - 1 &&
        board[rowIndex + 1][colIndex + 1].value === "X"
      ) {
        board[rowIndex][colIndex].value++;
      }

      // Checks the bottom-left cell
      if (
        rowIndex < row - 1 &&
        colIndex > 0 &&
        board[rowIndex + 1][colIndex - 1].value === "X"
      ) {
        board[rowIndex][colIndex].value++;
      }
    }
  }
  return { board, mineLocation };
}

function randomNum(min = 0, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default createBoard;
