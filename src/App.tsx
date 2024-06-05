// src/App.tsx

import React from "react";
import { GameProvider } from "./context/GameContext";
import GameBoard from "./components/GameBoard/GameBoard";
import "./App.scss";

const App: React.FC = () => {
  return (
    <GameProvider>
      <GameBoard />
    </GameProvider>
  );
};

export default App;
