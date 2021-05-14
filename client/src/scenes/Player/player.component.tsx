import React, { useEffect, useRef } from 'react';
import { Rect } from 'react-konva';
import { useAppSelector } from '../../app/hooks';
import { selectCharacter } from '../../features/character/characterSlice';
import { imageDirectory, ImageDirectory } from '../../assets/library/index';
import { handleClickSprite } from '../../helpers/game.helper';
import game from '../../data/gameMap.data';

const Player = (): JSX.Element => {
  const character = useAppSelector(selectCharacter);
  const rectRef = useRef<any | null>(null);
  const { tileSize } = game;

  useEffect(() => {
    const ref = rectRef.current;
    ref.to({
      x: character.pixelLocation[0],
      y: character.pixelLocation[1],
      duration: character.delay / 1000,
      fill: character.direction,
    });
    console.log(character);
  }, [character.pixelLocation]);

  const tileKey = imageDirectory.ofdon;
  // console.log(tileKey);

  const img = new window.Image();
  img.src = imageDirectory[tileKey as keyof ImageDirectory];
  img.crossOrigin = 'Anonymous';

  return (
    <Rect
      ref={rectRef}
      height={character.dimensions[0] * 2}
      width={character.dimensions[1]}
      onClick={handleClickSprite}
      offset={{ x: 0, y: tileSize }}
    />
  );
  // image={img}
};

export default Player;
