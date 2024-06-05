import React from "react";
import { CellState } from "../../types/types";
import "./Cell.scss";

interface CellProps {
  state: CellState;
  onClick: () => void;
}

const Cell: React.FC<CellProps> = ({ state, onClick }) => {
  let className = "cell";
  if (state === CellState.HIT) {
    className += " hit";
  } else if (state === CellState.MISS) {
    className += " miss";
  } else if (state === CellState.SHIP) {
    className += " ship";
  }

  return (
    <button className={className} onClick={onClick}>
      {state.charAt(0)}
    </button>
  );
};

export default Cell;
