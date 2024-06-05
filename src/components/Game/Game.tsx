// src/components/Game/Game.tsx

import React from "react";
import Grid from "../Grid/Grid";
import { useGameContext } from "../../context/GameContext";
import { Coordinate } from "../../types/types";

const Game: React.FC = () => {
  const { gameState, updateGameState } = useGameContext();
  const gridSize = 10;

  const handleCellClick = (row: number, col: number) => {
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
      if (!updatedMisses.some((miss) => miss.row === row && miss.col === col)) {
        updatedMisses.push({ row, col });
        updateGameState({ ...gameState, misses: updatedMisses });
      }
    }

    /*  if (updatedHits.length === gameState.ships.flat().length) {
      alert("¡Todos los barcos han sido hundidos! ¡Felicidades!");
    } */
  };

  return (
    <div className="Game">
      <h1>Battleships Game</h1>
      <Grid
        size={gridSize}
        gameState={gameState}
        onCellClick={handleCellClick}
      />
      {gameState.hits.length === gameState.ships.flat().length && (
        <div>¡Todos los barcos han sido hundidos! ¡Felicidades!</div>
      )}
    </div>
  );
};

export default Game;
