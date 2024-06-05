// types/types.ts

export interface Coordinate {
  row: number;
  col: number;
}

export interface GameState {
  hits: Coordinate[];
  ships: Coordinate[][];
  misses: Coordinate[];
}

export enum CellState {
  EMPTY = "",
  HIT = "hit",
  MISS = "miss",
  SHIP = "ship",
}
