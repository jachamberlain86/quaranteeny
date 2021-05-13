import React, { useEffect, useState } from 'react';
import * as Konva from 'konva';
import { Rect } from 'react-konva';
import { useAppSelector } from '../../app/hooks';
import { triggerSetTimeMoved } from '../../helpers/player.helper';
import {
  selectMovePos,
  selectCurPos,
  selectCharacter,
} from '../../features/character/characterSlice';
import { store } from '../../app/store';

const Player = (): JSX.Element => {
  const character = useAppSelector(selectCharacter);

  return (
    <Rect
      x={character.pixelLocation[0]}
      y={character.pixelLocation[1]}
      height={character.dimensions[0]}
      width={character.dimensions[1]}
      fill="red"
    />
  );
};

export default Player;
