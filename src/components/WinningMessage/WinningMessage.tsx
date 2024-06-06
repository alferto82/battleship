import { useGameContext } from "../../context/GameContext";
import "./WinningMessage.scss";

export const WinningMessage = () => {
  const { gameState } = useGameContext();

  const moveCount = gameState.hits.length + gameState.misses.length;

  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <section className="winningMessage">
      <p>You destroy all the ships!!! Congratulations!</p>
      <p>{`You've won the game in ${moveCount} moves.`} </p>
      <button onClick={refreshPage}>Play Again</button>
    </section>
  );
};
