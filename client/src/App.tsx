import React, { FC, useEffect } from 'react';
import './App.css';
import Game from './components/Game/Game.component';
import { useAppDispatch, useAppSelector } from './app/hooks';
import {
  fetchUserDataAsync,
  createUserInDbAsync,
  setUserId,
  selectUserStatus,
  startUpdatesToDb,
} from './features/user/userSlice';

const App: FC = () => {
  const dispatch = useAppDispatch();
  const userLoadingStatus = useAppSelector(selectUserStatus);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      dispatch(setUserId(userId));
      dispatch(fetchUserDataAsync({ dispatch }));
    } else {
      dispatch(createUserInDbAsync({ dispatch }));
    }
  }, [dispatch]);
  useEffect(() => {
    if (userLoadingStatus === 'userLoaded') {
      dispatch(startUpdatesToDb());
    }
  }, [dispatch, userLoadingStatus]);

  return (
    <div className="app-container">
      <Game />
    </div>
  );
};

export default App;
