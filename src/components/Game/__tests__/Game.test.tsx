// src/components/Game/__tests__/Game.test.tsx

import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { GameProvider } from "../../../context/GameContext";
import { Game } from "../Game";

// Mock de la generación de barcos para devolver una matriz predefinida de coordenadas
jest.mock("../../../utils", () => ({
  ...jest.requireActual("../../../utils"),
  generateShips: () => [
    [
      { row: 0, col: 0 },
      { row: 0, col: 1 },
      { row: 0, col: 2 },
      { row: 0, col: 3 },
      { row: 0, col: 4 },
    ], // Battleship
    [
      { row: 1, col: 0 },
      { row: 1, col: 1 },
      { row: 1, col: 2 },
      { row: 1, col: 3 },
    ], // Destroyer 1
    [
      { row: 2, col: 0 },
      { row: 2, col: 1 },
      { row: 2, col: 2 },
      { row: 2, col: 3 },
    ], // Destroyer 2
  ],
}));

test("renders Game component", () => {
  const { getByText } = render(
    <GameProvider>
      <Game />
    </GameProvider>
  );

  // Verifica que se muestre el título del juego
  expect(getByText("Battleships Game")).toBeInTheDocument();
});

test("handles cell click", () => {
  const { getByText } = render(
    <GameProvider>
      <Game />
    </GameProvider>
  );

  // Agrega las aserciones necesarias para verificar el comportamiento después del clic
  // Nota: Dependiendo de cómo se renderizan las celdas, puede que necesites encontrar la celda específica para hacer clic
  // Aquí hacemos un ejemplo genérico, asumiendo que necesitas encontrar una celda específica por algún texto dentro de ella
  const cell = getByText(""); // Actualiza esto según sea necesario
  fireEvent.click(cell);

  // Verifica el estado después del clic (esto es solo un ejemplo y necesitarás ajustarlo)
  expect(cell).toHaveTextContent("X"); // Suponiendo que 'X' indica un golpe
});
