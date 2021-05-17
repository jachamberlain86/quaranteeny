import { Stage, Layer } from 'react-konva';
import React, { useEffect, useState, useRef } from 'react';
import { ReactReduxContext, Provider } from 'react-redux';
import game from '../../data/gameMap.data';
import Player from '../Player/player.component';
import { renderLayer } from '../../helpers/game.helper';

import './Room.styles.css';
import Furniture from '../Furniture/Furniture.component';

const Room = (): JSX.Element => {
  const { cols, tileSize } = game;
  const canvasWidth = cols * tileSize;
  const canvasHeight = cols * tileSize;

  const [layer0, setLayer0] = useState<JSX.Element[]>([]);
  const [layer2, setLayer2] = useState<JSX.Element[]>([]);

  useEffect(() => {
    setLayer0(renderLayer(0));
    setLayer2(renderLayer(2));
  }, []);

  return (
    <ReactReduxContext.Consumer>
      {({ store }) => (
        <Stage width={canvasWidth} height={canvasHeight}>
          <Provider store={store}>
            <Layer>{layer0}</Layer>
            <Furniture />
            {/* <Layer> */}
            <Player />
            {/* </Layer> */}
            <Layer>{layer2}</Layer>
          </Provider>
        </Stage>
      )}
    </ReactReduxContext.Consumer>
  );
};

export default Room;
