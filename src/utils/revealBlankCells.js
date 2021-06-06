function revealBlankCells(boardGrid, x, y, newNonMinesCount) {

  // If the cell is revealed, dont check the neighbor
  if (boardGrid[x][y].revealed) {
    return;
  }

  // Store the positions to reveal
  let cellsToReveal = [];
  cellsToReveal.push(boardGrid[x][y]);

  while (cellsToReveal.length !== 0) {
    let single = cellsToReveal.pop();

    if (!single.revealed) {
      newNonMinesCount--;
      single.revealed = true;
    }

    if (single.value !== 0) {
      break;
    }

    // Value 0: empty cell
    // Adds top-left position
    if (
      single.x > 0 &&
      single.y > 0 &&
      boardGrid[single.x - 1][single.y - 1].value === 0 &&
      !boardGrid[single.x - 1][single.y - 1].revealed
    ) {
      cellsToReveal.push(boardGrid[single.x - 1][single.y - 1]);
    }

    // Adds bottom-right position
    if (
      single.x < boardGrid.length - 1 &&
      single.y < boardGrid[0].length - 1 &&
      boardGrid[single.x + 1][single.y + 1].value === 0 &&
      !boardGrid[single.x + 1][single.y + 1].revealed
    ) {
      cellsToReveal.push(boardGrid[single.x + 1][single.y + 1]);
    }

    // Adds bottom-left position
    if (
      single.x < boardGrid.length - 1 &&
      single.y > 0 &&
      boardGrid[single.x + 1][single.y - 1].value === 0 &&
      !boardGrid[single.x + 1][single.y - 1].revealed
    ) {
      cellsToReveal.push(boardGrid[single.x + 1][single.y - 1]);
    }

    // Adds top-right position
    if (
      single.x > 0 &&
      single.y < boardGrid[0].length - 1 &&
      boardGrid[single.x - 1][single.y + 1].value === 0 &&
      !boardGrid[single.x - 1][single.y + 1].revealed
    ) {
      cellsToReveal.push(boardGrid[single.x - 1][single.y + 1]);
    }

    // Adds top position
    if (
      single.x > 0 &&
      boardGrid[single.x - 1][single.y].value === 0 &&
      !boardGrid[single.x - 1][single.y].revealed
    ) {
      cellsToReveal.push(boardGrid[single.x - 1][single.y]);
    }

    // Adds bottom position
    if (
      single.x < boardGrid.length - 1 &&
      boardGrid[single.x + 1][single.y].value === 0 &&
      !boardGrid[single.x + 1][single.y].revealed
    ) {
      cellsToReveal.push(boardGrid[single.x + 1][single.y]);
    }

    // Adds left position
    if (
      single.y > 0 &&
      boardGrid[single.x][single.y - 1].value === 0 &&
      !boardGrid[single.x][single.y - 1].revealed
    ) {
      cellsToReveal.push(boardGrid[single.x][single.y - 1]);
    }

    // Adds right position
    if (
      single.y < boardGrid[0].length - 1 &&
      boardGrid[single.x][single.y + 1].value === 0 &&
      !boardGrid[single.x][single.y + 1].revealed
    ) {
      cellsToReveal.push(boardGrid[single.x][single.y + 1]);
    }

    // Start to reveal cells
    // Reveal top-left
    if (
      single.x > 0 &&
      single.y > 0 &&
      !boardGrid[single.x - 1][single.y - 1].revealed
    ) {
      boardGrid[single.x - 1][single.y - 1].revealed = true;
      newNonMinesCount--;
    }

    // Reveal left
    if (single.y > 0 && !boardGrid[single.x][single.y - 1].revealed) {
      boardGrid[single.x][single.y - 1].revealed = true;
      newNonMinesCount--;
    }

    // Reveal bottom-left
    if (
      single.x < boardGrid.length - 1 &&
      single.y > 0 &&
      !boardGrid[single.x + 1][single.y - 1].revealed
    ) {
      boardGrid[single.x + 1][single.y - 1].revealed = true;
      newNonMinesCount--;
    }

    // Reveal top
    if (single.x > 0 && !boardGrid[single.x - 1][single.y].revealed) {
      boardGrid[single.x - 1][single.y].revealed = true;
      newNonMinesCount--;
    }

    // Reveal bottom
    if (
      single.x < boardGrid.length - 1 &&
      !boardGrid[single.x + 1][single.y].revealed
    ) {
      boardGrid[single.x + 1][single.y].revealed = true;
      newNonMinesCount--;
    }

    // Reveal top-right
    if (
      single.x > 0 &&
      single.y < boardGrid[0].length - 1 &&
      !boardGrid[single.x - 1][single.y + 1].revealed
    ) {
      boardGrid[single.x - 1][single.y + 1].revealed = true;
      newNonMinesCount--;
    }

    // Reveal right
    if (
      single.y < boardGrid[0].length - 1 &&
      !boardGrid[single.x][single.y + 1].revealed
    ) {
      boardGrid[single.x][single.y + 1].revealed = true;
      newNonMinesCount--;
    }

    // Reveal bottom-right
    if (
      single.x < boardGrid.length - 1 &&
      single.y < boardGrid[0].length - 1 &&
      !boardGrid[single.x + 1][single.y + 1].revealed
    ) {
      boardGrid[single.x + 1][single.y + 1].revealed = true;
      newNonMinesCount--;
    }
  }

  return { boardGrid, newNonMinesCount };
}

export default revealBlankCells;
