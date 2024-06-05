import React, { FormEvent, useState } from "react";
import "./Terminal.css";
import { useGameContext } from "../../context/GameContext";

interface TerminalProps {
  onCellSubmit: (row: number, col: number) => void;
}

const LETTER_UPPER_A_ASCII = 64;

const Terminal: React.FC<TerminalProps> = ({ onCellSubmit }) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [invalidInput, setInvalidInput] = useState<boolean>(false);
  const { gameState } = useGameContext();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setInvalidInput(false);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (validateCell(inputValue)) {
      const [row, col] = parseCell(inputValue);
      onCellSubmit(row, col);
      setInputValue("");
    } else {
      setInvalidInput(true);
    }
  };

  const validateCell = (cell: string): boolean => {
    const letter = cell.charAt(0).toUpperCase();
    const numberStr = cell.substring(1);
    const number = parseInt(numberStr);

    if (
      letter < "A" ||
      letter > String.fromCharCode(LETTER_UPPER_A_ASCII + gameState.size)
    ) {
      return false; // Letter is not valid
    }

    // Check number is valid
    if (isNaN(number) || number < 1 || number > gameState.size) {
      return false;
    }

    return true;
  };

  const parseCell = (cell: string): [number, number] => {
    const row = cell[0].toLowerCase();
    const rowNumber = row.charCodeAt(0) - "a".charCodeAt(0) + 1;
    const col = parseInt(cell.slice(1));

    if (isNaN(col) || col < 1 || col > gameState.size) {
      throw new Error("Invalid cell");
    }
    return [rowNumber - 1, col - 1]; // Removing 0 value
  };

  return (
    <div className="terminal">
      <div className="messages">
        <p>
          Welcome to Battleships! This is a very simple version of this game.
          This is a one-sided game of Battleships against ships placed by the
          computer. In this version computer has introduced 3 ships:
          <ul>
            <li>1x Battleship (5 squares)</li>
            <li>2x Destroyers (4 squares)</li>
          </ul>
          Try to destroy them using the fewest moves possible. You can click on
          the cells on the left side or enter a valid cell in the input field.
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={inputValue} onChange={handleInputChange} />

        <button>Enviar</button>
        {invalidInput && (
          <div className="error-message">Invalid cell value</div>
        )}
      </form>
    </div>
  );
};

export default Terminal;
