// Game.tsx

import React, { useState } from "react";
import { GameState } from "../../types/types";
import { generateShips, checkForHits } from "../../utils";
import Grid from "../Grid/Grid";

const Game: React.FC = () => {
  const gridSize = 10;
  const [gameState, setGameState] = useState<GameState>({
    hits: [],
    ships: generateShips(gridSize),
    misses: [], // Agregamos una lista de "misses" al estado del juego
  });
  const [gameFinished, setGameFinished] = useState<boolean>(false);

  const handleCellClick = (row: number, col: number) => {
    if (!gameFinished) {
      const updatedHits = [...gameState.hits];
      const updatedMisses = [...gameState.misses]; // Copiamos la lista de "misses" actual

      const isHit = checkForHits(gameState.ships, row, col);

      if (isHit) {
        updatedHits.push({ row, col });
        setGameState((prevState: GameState) => ({
          ...prevState,
          hits: updatedHits,
        }));
      } else {
        updatedMisses.push({ row, col }); // Agregamos la casilla clicada a la lista de "misses"
        setGameState((prevState: GameState) => ({
          ...prevState,
          misses: updatedMisses,
        }));
      }

      // Verificamos si todos los barcos han sido alcanzados
      if (updatedHits.length === gameState.ships.flat().length) {
        setGameFinished(true);
      }
    }
  };

const Game: React.FC = () => {
        gameState={gameState}
        onCellClick={handleCellClick}
      />
      {gameFinished && (
        <div>¡Todos los barcos han sido hundidos! ¡Felicidades!</div>
      )}
    </div>
  );
};

export default Game;
