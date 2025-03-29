export type GameStateType = {
  wins: number;
  losses: number;
  currentWinner: number | undefined;
  previousWinner: number | undefined;
  clicked: number | undefined;
};