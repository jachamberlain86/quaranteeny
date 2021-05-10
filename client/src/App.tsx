import React, { FC, useEffect } from 'react';
import './App.css';
import Game from './components/Game/Game.component';
import { useAppDispatch } from './app/hooks';
import { fetchUserDataAsync } from './features/user/userSlice';

const App: FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchUserDataAsync({ dispatch }));
  }, [dispatch]);
  return (
    <div className="app-container">
      <Game />
    </div>
  );
};

export default App;
