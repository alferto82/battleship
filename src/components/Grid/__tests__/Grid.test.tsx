import React from "react";
import {
  render,
  fireEvent,
  getByRole,
  screen,
  waitFor,
} from "@testing-library/react";
import Grid from "../Grid";
import GameContext from "../../../context/GameContext";
import { initialGameState } from "../../../context/InitialGameState";
import userEvent from "@testing-library/user-event";

describe("Grid component", () => {
  test("renders without crashing", () => {
    render(
      <GameContext.Provider
        value={{ gameState: initialGameState, updateGameState: jest.fn() }}
      >
        <Grid onCellClick={() => {}} />
      </GameContext.Provider>
    );
  });

  [
    { cellNum: 0, row: 0, col: 0 },
    { cellNum: 10, row: 1, col: 0 },
    { cellNum: 25, row: 2, col: 5 },
    { cellNum: 99, row: 9, col: 9 },
  ].map(({ cellNum, row, col }) => {
    test(`calls onCellClick callback when a valid cell is clicked ==> cellNum: ${cellNum} should be (${row},${col})`, () => {
      const onCellClick = jest.fn();

      const { container } = render(
        <GameContext.Provider
          value={{ gameState: initialGameState, updateGameState: jest.fn() }}
        >
          <Grid onCellClick={onCellClick} />
        </GameContext.Provider>
      );

      const cells = container.querySelectorAll(".cell");
      expect(cells.length).toBe(initialGameState.size * initialGameState.size);
      const cellsShips = container.querySelectorAll(".cell-ship");
      expect(cellsShips.length).toBe(
        initialGameState.ships.reduce((acc, ship) => acc + ship.length, 0)
      );

      fireEvent.click(cells[cellNum]);

      expect(onCellClick).toHaveBeenCalledWith(row, col);
    });
  });

  test(`check classList is valid initially`, () => {
    const onCellClick = jest.fn();

    const { container } = render(
      <GameContext.Provider
        value={{ gameState: initialGameState, updateGameState: jest.fn() }}
      >
        <Grid onCellClick={onCellClick} />
      </GameContext.Provider>
    );

    const allCells = container.querySelectorAll(".cell");
    const cellsShips = container.querySelectorAll(".cell-ship");
    const cellsEmpty = container.querySelectorAll(".cell-empty");

    expect(allCells.length).toBe(initialGameState.size * initialGameState.size);
    const numCellsWithShip = initialGameState.ships.reduce(
      (acc, ship) => acc + ship.length,
      0
    );
    expect(cellsShips.length).toBe(numCellsWithShip);
    expect(cellsEmpty.length + numCellsWithShip).toBe(allCells.length);
  });
});
