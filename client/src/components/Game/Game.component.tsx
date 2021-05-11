import React, { FC } from 'react';
import Room from '../../scenes/Room/Room.scene';
import MeterArea from '../MeterArea/MeterArea.component';
import DayCounter from '../DayCounter/DayCounter.component';
import Player from '../../scenes/Player/player.component';
import './Game.styles.css';

const Game: FC = () => {
  return (
    <div className="game">
      <DayCounter />
      <Room>
        <Player />
      </Room>
      <MeterArea />
    </div>
  );
};

export default Game;
