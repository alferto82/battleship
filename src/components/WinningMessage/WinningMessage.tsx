import { useGameContext } from "../../context/GameContext";

export const WinningMessage = () => {
  const { gameState } = useGameContext();

  const moveCount = gameState.hits.length + gameState.misses.length;

  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <section>
      <p>You destroy all the ships!!! Congratulations!</p>
      <p>{`You've won the game in ${moveCount} moves.`} </p>
      <button onClick={refreshPage}>Play Again</button>
    </section>
  );
};
