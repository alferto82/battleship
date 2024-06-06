// src/components/Game/Game.tsx

import React from "react";
import Grid from "../Grid/Grid";
import { useGameContext } from "../../context/GameContext";
import { Coordinate } from "../../types/types";
import Terminal from "../Terminal/Terminal";
import { WinningMessage } from "../WinningMessage/WinningMessage";
import "./GameBoard.scss";
import ExternalGrid from "../ExternalGrid/ExternalGrid";

const GameBoard: React.FC = () => {
  const { gameState, updateGameState } = useGameContext();

  const gameFinished = gameState.hits.length === gameState.ships.flat().length;

  const handleCellClick = (row: number, col: number) => {
    if (!gameFinished) {
      const updatedHits = [...gameState.hits];
      const updatedMisses = [...gameState.misses];

      const isHit = gameState.ships.some((ship: Coordinate[]) =>
        ship.some((part: Coordinate) => part.row === row && part.col === col)
      );

      if (isHit) {
        if (!updatedHits.some((hit) => hit.row === row && hit.col === col)) {
          updatedHits.push({ row, col });
          updateGameState({ ...gameState, hits: updatedHits });
        }
      } else {
        if (
          !updatedMisses.some((miss) => miss.row === row && miss.col === col)
        ) {
          updatedMisses.push({ row, col });
          updateGameState({ ...gameState, misses: updatedMisses });
        }
      }
    }
  };

  return (
    <div className="gameWrapper">
      <h1 className="title">Battleships Game</h1>
      <div className="gameBoard">
        <ExternalGrid>
          <Grid onCellClick={handleCellClick} />
        </ExternalGrid>
        <Terminal onCellSubmit={handleCellClick} />
      </div>
      {gameFinished && <WinningMessage />}
    </div>
  );
};

export default GameBoard;
