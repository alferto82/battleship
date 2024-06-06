import React from "react";
import classNames from "classnames";
import { CellState } from "../../types/types";
import "./Cell.scss";

interface CellProps {
  state: CellState;
  onClick?: () => void;
}

const Cell: React.FC<CellProps> = ({ state, onClick }) => {
  const className = classNames("cell", {
    "cell-hit": state === CellState.HIT,
    "cell-miss": state === CellState.MISS,
    "cell-ship": state === CellState.SHIP,
    "cell-empty": state === CellState.EMPTY,
  });

  return <button data-testid={state} className={className} onClick={onClick} />;
};

export default Cell;
