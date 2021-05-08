import React from 'react';
import Room from '../../scenes/Room/Room.scene';
import MeterArea from '../MeterArea/MeterArea.component';
import DayCounter from '../DayCounter/DayCounter.component';
import './Game.styles.css';

export default function Game(): React.ReactElement {
  return (
    <div className="game">
      <DayCounter />
      <Room />
      <MeterArea />
    </div>
  );
}
