import { Coordinate } from "../types/types";

const generateRandomCoordinate = (max: number) => {
  return Math.floor(Math.random() * max);
};

const isWithinBounds = (start: number, length: number, max: number) => {
  return start + length <= max;
};

const isOverlapping = (ship: Coordinate[], ships: Coordinate[][]) => {
  return ships.some((existingShip) =>
    existingShip.some((part) =>
      ship.some(
        (newPart) => newPart.row === part.row && newPart.col === part.col
      )
    )
  );
};

export const generateShips = (
  gridSize: number,
  shipSizes: number[]
): Coordinate[][] => {
  let shipsCoordinates: Coordinate[][] = [];

  for (const size of shipSizes) {
    let ship: Coordinate[];
    let isVertical: boolean;
    let startRow: number;
    let startCol: number;

    do {
      ship = [];
      isVertical = Math.random() < 0.5;
      startRow = generateRandomCoordinate(gridSize);
      startCol = generateRandomCoordinate(gridSize);

      if (isVertical) {
        if (isWithinBounds(startRow, size, gridSize)) {
          for (let i = 0; i < size; i++) {
            ship.push({ row: startRow + i, col: startCol });
          }
        }
      } else {
        if (isWithinBounds(startCol, size, gridSize)) {
          for (let i = 0; i < size; i++) {
            ship.push({ row: startRow, col: startCol + i });
          }
        }
      }
    } while (ship.length !== size || isOverlapping(ship, shipsCoordinates));

    shipsCoordinates.push(ship);
  }

  return shipsCoordinates;
};

export const checkForHits = (
  ships: Coordinate[][],
  row: number,
  col: number
): boolean => {
  return ships.some((ship) =>
    ship.some((part) => part.row === row && part.col === col)
  );
};
