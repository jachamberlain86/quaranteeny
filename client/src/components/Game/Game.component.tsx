import React, { useEffect, useRef } from 'react';
import { useAppSelector } from '../../app/hooks';
import './Game.styles.css';
import Room from '../../scenes/Room/Room.scene';
import MeterArea from '../MeterArea/MeterArea.component';
import DayCounter from '../DayCounter/DayCounter.component';
import Mood from '../Mood/Mood.component';
import Player from '../../scenes/Player/player.component';
<<<<<<< HEAD
import GameOver from '../GameOver/GameOver.component';
=======
import './Game.styles.css';
import CanvasContext from '../../scenes/Player/canvasContext';
>>>>>>> feat/player_moves

const Game = (): JSX.Element => {
  const { gameOver } = useAppSelector((state) => state.game);
  // TODO find a better solution to this forbidden non-null assertion
  const gameScreen = useRef<HTMLDivElement>(null!);
  useEffect(() => {
    const id: NodeJS.Timeout = setTimeout(() => {
      if (!gameScreen) return;
      if (gameScreen && gameOver) {
        gameScreen.current.classList.add('grey');
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
      <MeterArea />
    </div>
  );
};

export default Game;
