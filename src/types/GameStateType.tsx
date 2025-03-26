import { SetType } from "./SetType";

export type GameStateType = {
  wins: number;
  losses: number;
  currentSet: SetType | undefined;
  previousSet: SetType | undefined;
  clicked: string | undefined;
};