import React from "react";
import "../App.css";

function BoardCell({ details, updateFlag, revealCell }) {
  const cellStyle = {
    background: details.revealed
      ? details.value === "X"
        ? "💣"
        : setRevealedCellColor(details.x, details.y)
      : setUnrevealedCellColor(details.x, details.y),
    color: setNumberColor(details.value),
  };

  return (
    <div
      onContextMenu={(e) => updateFlag(e, details.x, details.y)}
      onClick={() => revealCell(details.x, details.y)}
      style={cellStyle}
      className="cellStyle"
    >
      {!details.revealed && details.flagged
        ? "🚩"
        : details.revealed && details.value !== 0
        ? details.value === "X"
          ? "💣"
          : details.value
        : ""}
    </div>
  );
}

function setRevealedCellColor(x, y) {
  if (x % 2 === 0 && y % 2 === 0) {
    return "#e6e6e6";
  } else if (x % 2 === 0 && y % 2 !== 0) {
    return "#d9d9d9";
  } else if (x % 2 !== 0 && y % 2 === 0) {
    return "#d9d9d9";
  } else {
    return "#e6e6e6";
  }
}

function setUnrevealedCellColor(x, y) {
  if (x % 2 === 0 && y % 2 === 0) {
    return "#e6f3ff";
  } else if (x % 2 === 0 && y % 2 !== 0) {
    return "#cce6ff";
  } else if (x % 2 !== 0 && y % 2 === 0) {
    return "#cce6ff";
  } else {
    return "#e6f3ff";
  }
}

function setNumberColor(num) {
  let numberColor;

  switch (num) {
    case 1:
      numberColor = "#1976d2";
      break;
    case 2:
      numberColor = "#388d3c";
      break;
    case 3:
      numberColor = "#d33030";
      break;
    case 4:
      numberColor = "#7c21a2";
      break;
    case 5:
      numberColor = "#1976d2";
      break;
    case 6:
      numberColor = "#1976d2";
      break;
    default:
      numberColor = "#FFFFFF";
  }

  return numberColor;
}

export default BoardCell;
