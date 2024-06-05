// src/App.tsx

import React from "react";
import Game from "./components/Game/Game";
import { GameProvider } from "./context/GameContext";

const App: React.FC = () => {
  return (
    <GameProvider>
      <Game />
    </GameProvider>
  );
};

export default App;
