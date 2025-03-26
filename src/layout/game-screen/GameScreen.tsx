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
    const newTrue = randomizer();
    let newState: GameStateType = { ...gameState };

    if(newTrue === 1) newState = {
      ...newState,
      previousSet: undefined,
      currentSet: {one: true, two: false, three: false},
    };
    else if(newTrue === 2) newState = {
      ...newState,
      previousSet: undefined,
      currentSet: {one: false, two: true, three: false},
    };
    else if(newTrue === 3) newState = {
      ...newState,
      previousSet: undefined,
      currentSet: {one: false, two: false, three: true},
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
          <GameButton value='one'/>
          <GameButton value='two'/>
          <GameButton value='three'/>
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