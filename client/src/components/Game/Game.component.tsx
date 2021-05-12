import React, { useEffect, useState, useRef } from 'react';
import Room from '../../scenes/Room/Room.scene';
import MeterArea from '../MeterArea/MeterArea.component';
import DayCounter from '../DayCounter/DayCounter.component';
import Mood from '../Mood/Mood.component';
import Player from '../../scenes/Player/player.component';
import { store } from '../../app/store';
import { useAppSelector } from '../../app/hooks';
import './Game.styles.css';

const Game = (): JSX.Element => {
  // const { gameOver } = store.getState().game;
  // const [gameState, setGameState] = useState(gameOver);
  // console.log('gameState', gameState);
  const { gameOver } = useAppSelector((state) => state.game);
  // TODO find a better solution to this forbidden non-null assertion
  const gameScreen = useRef<HTMLDivElement>(null!);
  useEffect(() => {
    const id: NodeJS.Timeout = setTimeout(() => {
      if (!gameScreen) return;
      if (gameScreen && gameOver) {
        gameScreen.current.classList.add('grey');
      }
    }, 2000);
    return () => {
      clearTimeout(id);
    };
  }, [gameOver]);

  return (
    <div ref={gameScreen} className={gameOver ? 'game fadeToGrey' : 'game'}>
      <div>
        <DayCounter />
        <Mood />
      </div>
      <Room />
      <Room>
        <Player />
      </Room>
      <MeterArea />
    </div>
  );
};

export default Game;
