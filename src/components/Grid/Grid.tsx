// src/components/Grid/Grid.tsx

import React from "react";
import { CellState, GameState } from "../../types/types";
import Cell from "../Cell/Cell";
import "./Grid.css";

interface GridProps {
  size: number;
  gameState: GameState;
  onCellClick: (row: number, col: number) => void;
}

const Grid: React.FC<GridProps> = ({ size, gameState, onCellClick }) => {
  const { hits, ships, misses } = gameState;

  const isHit = (row: number, col: number) => {
    return hits.some((hit) => hit.row === row && hit.col === col);
  };

  const hasShip = (row: number, col: number) => {
    return ships.some((ship) =>
      ship.some((part) => part.row === row && part.col === col)
    );
  };

  const isMiss = (row: number, col: number) => {
    return misses.some((miss) => miss.row === row && miss.col === col);
  };

  const getCellState = (row: number, col: number): CellState => {
    if (hits.some((hit) => hit.row === row && hit.col === col)) {
      return CellState.HIT;
    } else if (misses.some((miss) => miss.row === row && miss.col === col)) {
      return CellState.MISS;
    } else if (
      ships.some((ship) =>
        ship.some((part) => part.row === row && part.col === col)
      )
    ) {
      return CellState.SHIP;
    } else {
      return CellState.EMPTY;
    }
  };

  return (
    <div className="grid">
      {Array.from({ length: size }).map((_, rowIndex) => (
        <div key={rowIndex} className="row">
          {Array.from({ length: size }).map((_, colIndex) => (
            <Cell
              key={colIndex}
              state={getCellState(rowIndex, colIndex)}
              onClick={() => onCellClick(rowIndex, colIndex)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Grid;
