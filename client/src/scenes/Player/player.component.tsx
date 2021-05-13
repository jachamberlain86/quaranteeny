import React, { useEffect, useState } from 'react';
import Konva from 'konva';
import { Stage, Layer, Image, Rect } from 'react-konva';

import { useAppSelector } from '../../app/hooks';
import { triggerSetTimeMoved } from '../../helpers/player.helper';
import {
  selectMovePos,
  selectCurPos,
  selectCharacter,
} from '../../features/character/characterSlice';
import { store } from '../../app/store';

const Player = (): JSX.Element => {
  const [layerB, setLayerB] = useState<JSX.Element | null>(null);
  const [layerEl, setLayerEl] = useState<JSX.Element | null>(null);
  const character = useAppSelector(selectCharacter);

  // const makeChar = (): any => {
  //   const char = (
  //     <Rect
  //       x={character.pixelLocation[0]}
  //       y={character.pixelLocation[1]}
  //       height={character.dimensions[0]}
  //       width={character.dimensions[1]}
  //       fill="red"
  //     />
  //   );
  //   return char;
  // };

  // useEffect(() => {
  //   setLayerB(makeChar());
  // }, []);

  // useEffect(() => {
  //   window.requestAnimationFrame();
  // }, []);

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
