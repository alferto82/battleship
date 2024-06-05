// src/components/Cell/Cell.tsx

import React from "react";
import "./Cell.css";

interface CellProps {
  value: string;
  onClick: () => void;
}

const Cell: React.FC<CellProps> = ({ value, onClick }) => {
  let className = "cell";
  if (value === "X") {
    className += " hit";
  } else if (value === "O") {
    className += " miss";
  }

  return (
    <div className={className} onClick={onClick}>
      {value}
    </div>
  );
};

export default Cell;
