import React, { useState, useEffect } from "react";
import createBoard from "../utils/createBoard";
import BoardCell from "./BoardCell";
import revealBlankCells from "../utils/revealBlankCells";
import GameActionBar from "./GameActionBar";
import BoardAudio from "./BoardAudio";
import GameModeBar from "./GameModeBar";

function GameBoard() {
  const [grid, setGrid] = useState([]);
  const [nonMineCount, setNonMineCount] = useState(0);
  const [mineLocations, setMineLocations] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [minesRemaining, setMinesRemaining] = useState(0);
  const [time, setTime] = useState(0);
  const [timeCounter, setTimeCounter] = useState(false);

  useEffect(() => {
    setBoard();
  }, []);

  // Timer to count the seconds passed after start a new game
  useEffect(() => {
      setTimeCounter(
        setTimeout(() => {
          let newTime = time + 1;
          setTime(newTime);
        }, 1000)
      );
  }, [time]);

  function setBoard(rows, cols, bombs) {
    let rowsBoard, colsBoard, bombsBoard;

    // Create a default board if the user dont use the inputs
    if (typeof rows === "undefined") {
      rowsBoard = 12;
      colsBoard = 20;
      bombsBoard = 25;
    } else {
      rowsBoard = rows;
      colsBoard = cols;
      bombsBoard = bombs;
    }

    const setBoard = createBoard(rowsBoard, colsBoard, bombsBoard);

    // Number of cells withouth bombs
    setNonMineCount(rowsBoard * colsBoard - bombsBoard);

    setMineLocations(setBoard.mineLocation);
    setGrid(setBoard.board);
    setMinesRemaining(bombsBoard);
  }

  function restartGame(rows, cols, bombs) {
    //setResetCount(true);
    setBoard(rows, cols, bombs);
    setGameOver(false);

    clearInterval(timeCounter);
    setTime(0);
  }

  // Put a flag into the board grid
  function updateFlag(e, x, y) {
    // Prevents to show the right click menu
    e.preventDefault();

    // Copy the current grid of the board
    let newGrid = JSON.parse(JSON.stringify(grid));

    // Flag or remove the flag from the position
    if (newGrid[x][y].flagged) {
      // If the position is flagged, we remove the flag
      newGrid[x][y].flagged = false;

      // If a flag is unmarked, adds a mine to the counter
      setMinesRemaining(minesRemaining + 1);
    } else {
      // Set the flag in the position
      newGrid[x][y].flagged = true;

      // If a flag is marked, discount one mine from the counter
      setMinesRemaining(minesRemaining - 1);
    }

    // Set the grid again to the board
    setGrid(newGrid);
  }

  // Show the content of a cell in the board grid
  function revealCell(x, y) {
    // If the cell is showing the content, is flagged or the game is over, no action when clicked
    if (grid[x][y].revealed || gameOver || grid[x][y].flagged) {
      return;
    }

    // Copy the current grid of the board
    let newGrid = JSON.parse(JSON.stringify(grid));

    // If we find a mine in the cell, the game is over
    if (newGrid[x][y].value === "X") {
      // Set the new grid with the location of all the mines
      for (let i = 0; i < mineLocations.length; i++) {
        newGrid[mineLocations[i][0]][mineLocations[i][1]].revealed = true;
      }

      // Set the grid to show to the user the location of all the mines
      setGrid(newGrid);
      setGameOver(true);
      playAudio();

      // If the game finish, stop the time counter
      clearInterval(timeCounter);

    } else {
      let newRevealedBoard = revealBlankCells(newGrid, x, y, nonMineCount);
      setGrid(newRevealedBoard.boardGrid);
      setNonMineCount(newRevealedBoard.newNonMinesCount);

      if (newRevealedBoard.newNonMinesCount === 0) {
        setGameOver(true);

        clearInterval(timeCounter);
      }
    }
  }

  function playAudio() {
    const audioBomb = document.getElementsByClassName("audio-bomb")[0];
    audioBomb.play();
  }

  return (
    <div>
      <div className="game-board-container">
        {
          <GameActionBar
            restartGame={restartGame}
            minesRemaining={minesRemaining}
            time={time}
          />
        }
        <div className="game-board-inner-container">
          {grid.map((singleRow, index1) => {
            return (
              <div style={{ display: "flex" }} key={index1}>
                {singleRow.map((singleBlock, index2) => {
                  return (
                    <BoardCell
                      revealCell={revealCell}
                      details={singleBlock}
                      updateFlag={updateFlag}
                      key={index2}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
        <GameModeBar restartGame={restartGame} />
        <BoardAudio />
      </div>
    </div>
  );
}

export default GameBoard;
