import { Coordinate } from "../../types/types";
import {
  checkForHits,
  generateRandomCoordinate,
  generateShips,
  isOverlapping,
  isWithinBounds,
} from "../utils";

describe("generateRandomCoordinate", () => {
  it("should return a number within the specified range", () => {
    const max = 10;
    for (let i = 0; i < 100; i++) {
      const coord = generateRandomCoordinate(max);
      expect(coord).toBeGreaterThanOrEqual(0);
      expect(coord).toBeLessThan(max);
    }
  });
});

describe("isWithinBounds", () => {
  it("should return true if the start plus length is within the bounds", () => {
    expect(isWithinBounds(0, 5, 10)).toBe(true);
    expect(isWithinBounds(5, 5, 10)).toBe(true);
    expect(isWithinBounds(0, 10, 10)).toBe(true);
  });

  it("should return false if the start plus length is out of bounds", () => {
    expect(isWithinBounds(6, 5, 10)).toBe(false);
    expect(isWithinBounds(10, 1, 10)).toBe(false);
    expect(isWithinBounds(0, 11, 10)).toBe(false);
  });
});

describe("isOverlapping", () => {
  it("should return true if the ship overlaps with existing ships", () => {
    const ships: Coordinate[][] = [
      [
        { row: 0, col: 0 },
        { row: 0, col: 1 },
      ],
      [
        { row: 1, col: 0 },
        { row: 1, col: 1 },
      ],
    ];
    const newShip: Coordinate[] = [
      { row: 0, col: 0 },
      { row: 0, col: 1 },
    ];

    expect(isOverlapping(newShip, ships)).toBe(true);
  });

  it("should return false if the ship does not overlap with existing ships", () => {
    const ships: Coordinate[][] = [
      [
        { row: 0, col: 0 },
        { row: 0, col: 1 },
      ],
      [
        { row: 1, col: 0 },
        { row: 1, col: 1 },
      ],
    ];
    const newShip: Coordinate[] = [
      { row: 2, col: 0 },
      { row: 2, col: 1 },
    ];

    expect(isOverlapping(newShip, ships)).toBe(false);
  });
});

describe("generateShips", () => {
  it("should generate ships with correct sizes within grid bounds and not overlapping", () => {
    const gridSize = 10;
    const shipSizes = [2, 3, 4];
    const ships = generateShips(gridSize, shipSizes);

    // Check each ship's size
    ships.forEach((ship: Coordinate[], index: number) => {
      expect(ship.length).toBe(shipSizes[index]);
    });

    // Check ships are within bounds
    ships.forEach((ship) => {
      ship.forEach((part) => {
        expect(part.row).toBeGreaterThanOrEqual(0);
        expect(part.row).toBeLessThan(gridSize);
        expect(part.col).toBeGreaterThanOrEqual(0);
        expect(part.col).toBeLessThan(gridSize);
      });
    });

    // Check ships are not overlapping
    const allCoordinates: Coordinate[] = ships.flat();
    const uniqueCoordinates = new Set(
      allCoordinates.map((coord) => `${coord.row},${coord.col}`)
    );
    expect(uniqueCoordinates.size).toBe(allCoordinates.length);
  });
});

describe("checkForHits", () => {
  it("should return true if the coordinates match a ship part", () => {
    const ships: Coordinate[][] = [
      [
        { row: 0, col: 0 },
        { row: 0, col: 1 },
      ],
      [
        { row: 1, col: 0 },
        { row: 1, col: 1 },
      ],
    ];

    expect(checkForHits(ships, 0, 0)).toBe(true);
    expect(checkForHits(ships, 1, 1)).toBe(true);
  });

  it("should return false if the coordinates do not match any ship part", () => {
    const ships: Coordinate[][] = [
      [
        { row: 0, col: 0 },
        { row: 0, col: 1 },
      ],
      [
        { row: 1, col: 0 },
        { row: 1, col: 1 },
      ],
    ];

    expect(checkForHits(ships, 2, 2)).toBe(false);
    expect(checkForHits(ships, 3, 3)).toBe(false);
  });
});
