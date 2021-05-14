import React, { useEffect, useState } from 'react';
import Konva from 'konva';
import { Stage, Layer, Image, Rect } from 'react-konva';
import { handleClickSprite } from '../../helpers/game.helper';

import { useAppSelector } from '../../app/hooks';
import { triggerSetTimeMoved } from '../../helpers/player.helper';
import {
  selectMovePos,
  selectCurPos,
  selectCharacter,
} from '../../features/character/characterSlice';
import { store } from '../../app/store';
import { imageDirectory, ImageDirectory } from '../../assets/library/index';
import game from '../../data/gameMap.data';

const Player = (): JSX.Element => {
  const character = useAppSelector(selectCharacter);
  const { tileSize } = game;

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

  const tileKey = imageDirectory.ofdon;
  // console.log(tileKey);

  const img = new window.Image();
  img.src = imageDirectory[tileKey as keyof ImageDirectory];
  img.crossOrigin = 'Anonymous';

  return (
    <Rect
      x={character.pixelLocation[0]}
      y={character.pixelLocation[1]}
      key={`${character.pixelLocation[0]}, ${character.pixelLocation[1]}`}
      fill="red"
      height={tileSize}
      width={tileSize}
      onClick={handleClickSprite}
    />
  );
  // image={img}
};

export default Player;
