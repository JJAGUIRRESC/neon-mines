import React from "react";
import "../styles/GameActionBar.css";

function GameActionBar ({ restartGame, minesRemaining, time, colorBoard, boardSize }) {
  return (
    <div className="game-action-bar-container">
      <div className="game-action-bar-inner">
        <div className="game-action-bar-display mines-remaining" style={{ boxShadow: colorBoard }}>
          {minesRemaining}
        </div>
        <div className="game-action-bar-display" style={{ boxShadow: colorBoard }}>
          <button className="btn-new-game" onClick={() => restartGame(boardSize)}>
            Nueva partida
          </button>
        </div>
        <div className="game-action-bar-display time-display" style={{ boxShadow: colorBoard }}>{time}</div>
      </div>
    </div>
  );
};

export default GameActionBar;
