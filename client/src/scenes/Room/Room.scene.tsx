import { Stage, Layer } from 'react-konva';
import React, { useEffect, useState } from 'react';
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
