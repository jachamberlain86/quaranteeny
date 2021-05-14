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

  // useEffect(() => {
  //   if (charNode) {
  //     const newTween = new Konva.Tween({
  //       node: layerB,
  //       x: character.pixelLocation[0],
  //       y: character.pixelLocation[1],
  //     });
  //   }
  // }, [layerB]);

  return (
    <ReactReduxContext.Consumer>
      {({ store }) => (
        <Stage width={canvasWidth} height={canvasHeight}>
          <Provider store={store}>
            <Layer listening={false}>{layer0}</Layer>
            <Furniture />
            <Layer>
              <Player />
            </Layer>
          </Provider>
        </Stage>
      )}
    </ReactReduxContext.Consumer>
  );
};

export default Room;
