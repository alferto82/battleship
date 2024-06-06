import React, { useMemo } from "react";
import { useGameContext } from "../../context/GameContext";
import { CellState } from "../../types/types";
import Cell from "../Cell/Cell";
import "./Grid.scss";

interface GridProps {
  onCellClick: (row: number, col: number) => void;
}

const Grid: React.FC<GridProps> = ({ onCellClick }) => {
  const { gameState } = useGameContext();
  const { hits, ships, misses, size } = gameState;

  const getCellState = useMemo(
    () =>
      (row: number, col: number): CellState => {
        const isHit = hits.some((hit) => hit.row === row && hit.col === col);
        const isMiss = misses.some(
          (miss) => miss.row === row && miss.col === col
        );
        const hasShip = ships.some((ship) =>
          ship.some((part) => part.row === row && part.col === col)
        );

        if (isHit) {
          return CellState.HIT;
        } else if (isMiss) {
          return CellState.MISS;
        } else if (hasShip) {
          return CellState.SHIP;
        } else {
          return CellState.EMPTY;
        }
      },
    [hits, ships, misses]
  );

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
