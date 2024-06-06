import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import GameContext from "../../../context/GameContext";
import Terminal from "../Terminal";

describe("Terminal component", () => {
  test("renders correctly with initial elements", () => {
    render(<Terminal onCellSubmit={() => {}} />);

    expect(screen.getByText(/Welcome to Battleships!/i)).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Send/i })).toBeInTheDocument();
  });

  test("handles input change correctly", () => {
    render(<Terminal onCellSubmit={() => {}} />);

    const input = screen.getByRole("textbox");

    fireEvent.change(input, { target: { value: "A1" } });
    expect(input).toHaveValue("A1");
  });

  test("validates and submits a valid input", () => {
    const mockOnCellSubmit = jest.fn();

    render(<Terminal onCellSubmit={mockOnCellSubmit} />);

    const input = screen.getByRole("textbox");
    const button = screen.getByRole("button", { name: /Send/i });

    fireEvent.change(input, { target: { value: "A1" } });
    fireEvent.click(button);

    expect(mockOnCellSubmit).toHaveBeenCalledWith(0, 0);
    expect(input).toHaveValue("");
  });

  test("shows error message for invalid input", () => {
    render(<Terminal onCellSubmit={() => {}} />);

    const input = screen.getByRole("textbox");
    const button = screen.getByRole("button", { name: /Send/i });

    fireEvent.change(input, { target: { value: "Z9" } });
    fireEvent.click(button);

    expect(screen.getByText(/Invalid cell value/i)).toBeInTheDocument();
    expect(input).toHaveValue("Z9");
  });
});
