import React, { useState, useEffect } from "react";
import createBoard from "../utils/createBoard";
import BoardCell from "./BoardCell";
import revealBlankCells from "../utils/revealBlankCells";
import GameActionBar from "./GameActionBar";
import BoardAudio from "./BoardAudio";
import CustomGameMode from "./CustomGameMode";

function GameBoard() {
  const [grid, setGrid] = useState([]);
  const [nonMineCount, setNonMineCount] = useState(0);
  const [mineLocations, setMineLocations] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [minesRemaining, setMinesRemaining] = useState(0);
  const [time, setTime] = useState(0);
  const [timeCounter, setTimeCounter] = useState(false);
  const [colorBoard, setColorBoard] = useState("0 0 18px 2px rgb(35 173 255)");
  const [boardSize, setBoardSize] = useState({ rows: 12, cols: 20, bombs: 25 });

  useEffect(() => {
    setBoard();
  }, [boardSize]);

  // Timer to count the seconds passed after start a new game
  useEffect(() => {
    setTimeCounter(
      setTimeout(() => {
        let newTime = time + 1;
        setTime(newTime);
      }, 1000)
    );
  }, [time]);

  function restartGame(boardSize) {
    setBoardSize(boardSize);

    setBoard();
    setGameOver(false);

    clearInterval(timeCounter);
    setTime(0);
  }

  function setBoard() {

    // Create the new board
    const setBoard = createBoard(boardSize.rows, boardSize.cols, boardSize.bombs);

    // Number of cells withouth bombs
    setNonMineCount(boardSize.rows * boardSize.cols - boardSize.bombs);
    setColorBoard("0 0 18px 2px rgb(35 173 255)");

    setMineLocations(setBoard.mineLocation);
    setGrid(setBoard.board);
    setMinesRemaining(boardSize.bombs);
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

      // Image for the exploded bomb
      newGrid[x][y].value = "💥";

      setColorBoard("0 0 18px 2px rgb(246 60 60)");

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

      // If not find any bomb, the user win the game
      if (newRevealedBoard.newNonMinesCount === 0) {
        setGameOver(true);
        clearInterval(timeCounter);
        setColorBoard("0 0 18px 2px rgb(90 255 87)");
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
            colorBoard={colorBoard}
            boardSize={boardSize}
          />
        }
        <div style={{ boxShadow: colorBoard }}>
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
        <CustomGameMode restartGame={restartGame} boardSize={boardSize} colorBoard={colorBoard} />
        <BoardAudio />
      </div>
    </div>
  );
}

export default GameBoard;
