// src/App.tsx

import React from "react";
import { GameProvider } from "./context/GameContext";
import "./App.css";
import GameBoard from "./components/GameBoard/GameBoard";

const App: React.FC = () => {
  return (
    <GameProvider>
      <GameBoard />
    </GameProvider>
  );
};

export default App;
