import { useGameContext } from "../../context/GameContext";
import { LETTER_UPPER_A_ASCII } from "../../types/constant";
import "./ExternalGrid.scss";

interface ExternalGridProps {
  children: React.ReactNode;
}

const ExternalGrid: React.FC<ExternalGridProps> = ({ children }) => {
  const { gameState } = useGameContext();
  return (
    <div className="externalGrid">
      <section className="leftHeader rows">
        <div className="header-cell"></div>
        {Array.from({ length: gameState.size }).map((_, rowIndex) => (
          <div key={rowIndex} className="header-cell">
            {rowIndex + 1}
          </div>
        ))}
      </section>
      <div className="contentRight">
        <section className="topHeader rows">
          {Array.from({ length: gameState.size }).map((_, rowIndex) => (
            <div key={rowIndex} className="header-cell">
              {String.fromCharCode(LETTER_UPPER_A_ASCII + rowIndex)}
            </div>
          ))}
        </section>
        {children}
      </div>
    </div>
  );
};

export default ExternalGrid;
