import { useContext } from "react";
import { GameObject} from "../../../../App";
import { GameStateType } from "../../../../types/GameStateType";
import randomizer from "../../../../utils/randomizer/randomizer";
import './gameButton.css';

type GameButtonProps = {
  value: string;
}

const GameButton = ({ value }:GameButtonProps) => {
  const context = useContext(GameObject);
  if (!context) throw new Error('PortfolioState must be used within a PortfolioState.Provider');
  const [ gameState, setGameState ] = context;

  const generateValue = (value: string): string => {
    if (!gameState.previousSet) return '';
    return (gameState.previousSet as Record<string, boolean>)[value] ? '!' : 'X';
  };

  const handleClick = (value: string) => {
    const newTrue = randomizer();
    let newState: GameStateType = { ...gameState };

    if((newState.currentSet as Record<string, boolean>)[value] === true) newState.wins++;
    else newState.losses++;

    if(newTrue === 1) newState = {
      ...newState,
      previousSet: newState.currentSet,
      currentSet: {one: true, two: false, three: false},
    };
    else if(newTrue === 2) newState = {
      ...newState,
      previousSet: newState.currentSet,
      currentSet: {one: false, two: true, three: false},
    };
    else if(newTrue === 3) newState = {
      ...newState,
      previousSet: newState.currentSet,
      currentSet: {one: false, two: false, three: true},
    };

    newState.clicked = value;

    setGameState(newState);
  };

  const determineColor = (value: string): string =>{
    if(gameState.previousSet === undefined) return '';
    else if((gameState.previousSet as Record<string, boolean>)[value] === true) return 'right';
    else if(
      (gameState.previousSet as Record<string, boolean>)[value] === false &&
      gameState.clicked === value
    ) return 'wrong';
    else return '';
  };

  return (
    <button
      className={`game-button ${determineColor(value)}`}
      onClick={()=> handleClick(value)}
    >
      {gameState.previousSet === undefined ? '?' : generateValue(value)}
    </button>
  );
};

export default GameButton;