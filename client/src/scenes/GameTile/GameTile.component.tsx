import React from 'react';
import useImage from 'use-image';
import { Image } from 'react-konva';
import { v4 as uuidv4 } from 'uuid';
import game from '../../data/gameMap.data';
import { imageDirectory, ImageDirectory } from '../../assets/library/index';

type GameTileProps = {
  tileKey: string;
};

export const GameTile = (props: GameTileProps): JSX.Element => {
  const { tileKey } = props;
  const { tileSize } = game;

  const [image] = useImage(imageDirectory[tileKey as keyof ImageDirectory]);

  return (
    <Image key={uuidv4()} image={image} height={tileSize} width={tileSize} />
  );
};
