// src/components/Game/GameContext.tsx

import React, { createContext, useContext, useState, ReactNode } from "react";
import { GameState } from "../types/types";
import { initialGameState } from "./InitialGameState";

interface GameContextType {
  gameState: GameState;
  updateGameState: (newState: GameState) => void;
}

const GameContext = createContext<GameContextType>({
  gameState: initialGameState,
  updateGameState: () => {},
});

export const useGameContext = () => useContext(GameContext);

interface GameProviderProps {
  children: ReactNode;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [gameState, setGameState] = useState<GameState>(initialGameState);

  const updateGameState = (newState: GameState) => {
    setGameState(newState);
  };

  return (
    <GameContext.Provider value={{ gameState, updateGameState }}>
      {children}
    </GameContext.Provider>
  );
};

export default GameContext;
