import { useContext } from 'react';
import { GameObject} from '../../../../App';
import { GameStateType } from '../../../../types/GameStateType';
import randomizer from '../../../../utils/randomizer/randomizer';
import './gameButton.css';

type GameButtonProps = {
  value: number;
};

const GameButton = ({ value }:GameButtonProps) => {
  const context = useContext(GameObject);
  if (!context) throw new Error('PortfolioState must be used within a PortfolioState.Provider');
  const [ gameState, setGameState ] = context;

  const generateValue = (value: number): string => {
    if (!gameState.previousWinner) return '';
    return gameState.previousWinner === value ? '!' : 'X';
  };

  const handleClick = (value: number) => {
    const newTrue = randomizer(3);
    let newState: GameStateType = { ...gameState };

    if(newState.currentWinner === value) newState.wins++;
    else newState.losses++;

    newState = {
      ...newState,
      previousWinner: newState.currentWinner,
      currentWinner: newTrue,
      clicked: value,
    };

    setGameState(newState);
  };

  const determineColor = (value: number): string =>{
    if(gameState.previousWinner === undefined) return '';
    else if(gameState.previousWinner === value) return 'right';
    else if(
      gameState.previousWinner !== value &&
      gameState.clicked === value
    ) return 'wrong';
    else return '';
  };

  return (
    <button
      className={`game-button ${determineColor(value)}`}
      onClick={()=> handleClick(value)}
    >
      {gameState.previousWinner === undefined ? '?' : generateValue(value)}
    </button>
  );
};

export default GameButton;