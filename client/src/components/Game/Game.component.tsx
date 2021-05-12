import React, { useEffect, useRef } from 'react';
import { useAppSelector } from '../../app/hooks';
import './Game.styles.css';
import Room from '../../scenes/Room/Room.scene';
import MeterArea from '../MeterArea/MeterArea.component';
import DayCounter from '../DayCounter/DayCounter.component';
import Mood from '../Mood/Mood.component';
import Player from '../../scenes/Player/player.component';
import GameOver from '../GameOver/GameOver.component';

const Game = (): JSX.Element => {
  const { gameOver } = useAppSelector((state) => state.game);
  // TODO find a better solution to this forbidden non-null assertion
  const gameScreen = useRef<HTMLDivElement | null>(null);
  const currentGameScreen = gameScreen.current as HTMLDivElement;
  useEffect(() => {
    const id: NodeJS.Timeout = setTimeout(() => {
      if (currentGameScreen && gameOver) {
        currentGameScreen.classList.add('grey');
      }
    }, 1000);
    return () => {
      clearTimeout(id);
    };
  }, [gameOver]);

  return (
    <div ref={gameScreen} className={gameOver ? 'game fadeToGrey' : 'game'}>
      {gameOver && <GameOver />}
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
