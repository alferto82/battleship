import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { WinningMessage } from "../WinningMessage";
import { GameState } from "../../../types/types";
import GameContext from "../../../context/GameContext";

describe("WinningMessage component", () => {
  const gameStateMock = {
    hits: [
      { row: 0, col: 0 },
      { row: 1, col: 1 },
    ],
    misses: [{ row: 2, col: 2 }],
    ships: [
      [
        { row: 0, col: 0 },
        { row: 0, col: 1 },
      ],
      [
        { row: 1, col: 1 },
        { row: 1, col: 2 },
      ],
    ],
    size: 5,
  };

  const renderWithContext = (gameState: GameState) => {
    return render(
      <GameContext.Provider
        value={{ gameState: gameState, updateGameState: jest.fn() }}
      >
        <WinningMessage />
      </GameContext.Provider>
    );
  };

  test("displays the winning message correctly", () => {
    renderWithContext(gameStateMock);

    expect(
      screen.getByText("You destroy all the ships!!! Congratulations!")
    ).toBeInTheDocument();
    expect(
      screen.getByText("You've won the game in 3 moves.")
    ).toBeInTheDocument();
  });
});
