// src/App.tsx

import React, { useState } from "react";
import Game from "./components/Game/Game";

const App: React.FC = () => {
  const [message, setMessage] = useState("");

  const handleCellClick = (row: number, col: number) => {
    setMessage(`Clicked cell at row ${row}, column ${col}`);
  };

  return (
    <div className="App">
      <h1>Battleships Game</h1>
      <Game />
      <div>{message}</div>
    </div>
  );
};

export default App;
