import React from 'react';
import Room from '../../scenes/Room/Room.scene';
import MeterArea from '../MeterArea/MeterArea.component';
import DayCounter from '../DayCounter/DayCounter.component';
import Mood from '../Mood/Mood.component';
import Player from '../../scenes/Player/player.component';
import './Game.styles.css';

const Game = (): JSX.Element => {
  return (
    <div className="game">
      <div>
        <DayCounter />
        <Mood />
      </div>
      <Room>
        <Player />
      </Room>
      <MeterArea />
    </div>
  );
};

export default Game;
