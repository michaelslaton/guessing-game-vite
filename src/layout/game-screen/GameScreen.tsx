import { useContext } from 'react';
import { GameObject } from '../../App';
import GameButton from './components/game-button/GameButton';
import { GameStateType } from '../../types/GameStateType';
import randomizer from '../../utils/randomizer/randomizer';
import './gameScreen.css';

const GameScreen = () => {
  const context = useContext(GameObject);
  if (!context) throw new Error('PortfolioState must be used within a PortfolioState.Provider');
  const [ gameState, setGameState ] = context;

  const handleClick = (): void => {
    const newTrue = randomizer(3);
    let newState: GameStateType = { ...gameState };

    newState = {
      ...newState,
      previousWinner: undefined,
      currentWinner: newTrue,
    };

    newState.wins = 0;
    newState.losses = 0;
    newState.clicked = undefined;

    setGameState(newState);
  };

  return (
    <div className='game-screen'>
      <div className='game-screen__title'>

        <h1>!! Mike's Guessing Game !!</h1>

        <h2>Wins: {gameState.wins} | Losses: {gameState.losses}</h2>

        <div className='game-screen__game-buttons-wrapper'>
          <GameButton value={1}/>
          <GameButton value={2}/>
          <GameButton value={3}/>
        </div>

        <button
          className='reset-button'
          onClick={()=> handleClick()}
        >
          Reset
        </button>

      </div>
    </div>
  );
};

export default GameScreen;