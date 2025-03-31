import { createContext, useState } from 'react';
import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom';
import Layout from './layout/Layout';
import RouteError from './utils/errors/route-error/RouteError';
import Error404 from './utils/errors/error404/Error404';
import GameScreen from './layout/game-screen/GameScreen';
import { GameStateType } from './types/GameStateType';
import randomizer from './utils/randomizer/randomizer';
import './app.css';

export const GameObject = createContext<
  [GameStateType, React.Dispatch<React.SetStateAction<GameStateType>>] | undefined
>(undefined);

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout/>,
    errorElement: <RouteError/>,
    children: [
      { 
        path: '/',
        element: <GameScreen/>,
        errorElement: <RouteError/>
      },
      { 
        path: '*',
        element: <Error404/>,
        errorElement: <RouteError/>
      },
    ],
  },
];

const router = createBrowserRouter(routes);

function App() {
  const [gameState, setGameState] = useState<GameStateType>({
    wins: 0,
    losses: 0,
    currentWinner: undefined,
    previousWinner: undefined,
    clicked: undefined,
  });

  if(gameState.currentWinner === undefined){
    const currentTrue = randomizer(3);
    if(currentTrue === 1) setGameState({...gameState, currentWinner: currentTrue});
    else if(currentTrue === 2) setGameState({...gameState, currentWinner: currentTrue});
    else if(currentTrue === 3) setGameState({...gameState, currentWinner: currentTrue});
  };

  return (
    <GameObject.Provider value={[gameState, setGameState]}>
      <RouterProvider router={router}/>
    </GameObject.Provider>
  );
};

export default App;