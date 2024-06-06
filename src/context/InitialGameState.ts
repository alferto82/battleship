import { GameState } from "../types/types";
import { generateShips } from "../utils/utils";

const BOARD_SIZE = 10;
const SHIPS_SIZES = [5, 4, 4];

export const initialGameState: GameState = {
  size: BOARD_SIZE,
  hits: [],
  ships: generateShips(BOARD_SIZE, SHIPS_SIZES),
  misses: [],
};
