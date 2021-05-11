import React, { FC, useEffect, useRef, useState } from 'react';
import CanvasContext from './canvasContext';
import Map from './Map/gameMap.component';

import './Room.styles.css';

// pass the character data in through the props - this is where it's rendered.
// pass the game map data in through the props - this is where it's rendered.
// the canvas context means that everything is referring to the same canvas.

// step one: get the room rendered.

const Room: FC = () => {
  return <Map />;
};

export default Room;
