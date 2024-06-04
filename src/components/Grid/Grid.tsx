// Grid.tsx

import React from "react";
import { Coordinate, GameState } from "../../types/types";
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
      ship.some((part: Coordinate) => part.row === row && part.col === col)
    );
  };

  const isMiss = (row: number, col: number) => {
    return misses.some(
      (miss: Coordinate) => miss.row === row && miss.col === col
    );
  };

  return (
    <div className="grid">
      {Array.from({ length: size }).map((_, rowIndex) => (
        <div key={rowIndex} className="row">
          {Array.from({ length: size }).map((_, colIndex) => {
            const cellValue = isHit(rowIndex, colIndex)
              ? "X"
              : isMiss(rowIndex, colIndex)
              ? "O"
              : hasShip(rowIndex, colIndex)
              ? "S"
              : ""; // Actualizamos el valor de la celda para manejar "miss"
            return (
              <Cell
                key={colIndex}
                value={cellValue}
                onClick={() => onCellClick(rowIndex, colIndex)}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Grid;
