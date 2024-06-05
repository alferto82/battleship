// utils.ts

import { Coordinate, GameState } from "./types/types";

export const generateShips = (gridSize: number): Coordinate[][] => {
    const ships: Coordinate[][] = [];
    const shipSizes = [5, 4, 4]; // Tamaños de los barcos: 1x Battleship (5 squares), 2x Destroyers (4 squares)
  
    for (const size of shipSizes) {
      const ship: Coordinate[] = [];
      let isVertical = Math.random() < 0.5; // Aleatoriamente decide si el barco será vertical u horizontal
      let startRow = Math.floor(Math.random() * (gridSize - size)); // Ajuste para asegurarse de que el barco no se salga de los límites
      let startCol = Math.floor(Math.random() * (gridSize - size)); // Ajuste para asegurarse de que el barco no se salga de los límites
  
      for (let i = 0; i < size; i++) {
        if (isVertical) {
          ship.push({ row: startRow + i, col: startCol });
        } else {
          ship.push({ row: startRow, col: startCol + i });
        }
      }
      ships.push(ship);
    }
    return ships;
};

export const checkForHits = (ships: Coordinate[][], row: number, col: number): boolean => {
  return ships.some(ship =>
    ship.some(part => part.row === row && part.col === col)
  );
};
