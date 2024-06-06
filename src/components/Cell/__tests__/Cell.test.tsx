import React from "react";
import { render, fireEvent, screen, act } from "@testing-library/react";
import { CellState } from "../../../types/types";
import Cell from "../Cell";

describe("Cell component", () => {
  [
    { cellState: CellState.SHIP },
    { cellState: CellState.MISS },
    { cellState: CellState.HIT },
  ].map(({ cellState }) => {
    test(`renders cell with ${cellState.toUpperCase()} state`, () => {
      const onClickMock = jest.fn();
      const { getByText } = render(
        <Cell state={cellState} onClick={onClickMock} />
      );
      const cellButton = screen.getByTestId(cellState);
      expect(cellButton).toBeInTheDocument();
    });
  });

  test("calls onClick function when cell is clicked", () => {
    const onClickMock = jest.fn();
    const { getByRole } = render(
      <Cell state={CellState.EMPTY} onClick={onClickMock} />
    );
    const cellButton = getByRole("button");
    fireEvent.click(cellButton);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
