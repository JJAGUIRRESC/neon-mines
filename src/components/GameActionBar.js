import React from "react";
import "../styles/GameActionBar.css";

function GameActionBar ({ restartGame, minesRemaining, time }) {
  return (
    <div className="game-action-bar-container">
      <div className="game-action-bar-inner">
        <div className="game-action-bar-display mines-remaining">
          {minesRemaining}
        </div>
        <div className="game-action-bar-display">
          <button className="btn-new-game" onClick={() => restartGame()}>
            Nueva partida
          </button>
        </div>
        <div className="game-action-bar-display time-display">{time}</div>
      </div>
    </div>
  );
};

export default GameActionBar;
