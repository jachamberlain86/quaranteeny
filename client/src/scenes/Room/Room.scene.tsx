<<<<<<< HEAD
import { Stage, Layer } from 'react-konva';
=======
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-plusplus */
import { Stage, Layer, Rect, Image } from 'react-konva';
import Konva from 'konva';
// import { Tween } from 'konva';
>>>>>>> animations
import React, { useEffect, useState } from 'react';
import { ReactReduxContext, Provider } from 'react-redux';
import game from '../../data/gameMap.data';
import Player from '../Player/player.component';
<<<<<<< HEAD
import { renderLayer } from '../../helpers/game.helper';
=======
import { img } from '../../assets/library/index';
import { useAppSelector } from '../../app/hooks';

import { selectCharacter } from '../../features/character/characterSlice';
>>>>>>> animations

import './Room.styles.css';
import Furniture from '../Furniture/Furniture.component';

const Room = (): JSX.Element => {
  const { cols, tileSize } = game;
  const canvasWidth = cols * tileSize;
  const canvasHeight = cols * tileSize;

  const [layer0, setLayer0] = useState<JSX.Element[]>([]);

  useEffect(() => {
    setLayer0(renderLayer(0));
  }, []);

  return (
    <ReactReduxContext.Consumer>
      {({ store }) => (
        <Stage width={canvasWidth} height={canvasHeight}>
          <Provider store={store}>
            <Layer>{layer0}</Layer>
            <Layer>
              <Player />
            </Layer>
            <Furniture />
          </Provider>
        </Stage>
      )}
    </ReactReduxContext.Consumer>
  );
};

export default Room;
