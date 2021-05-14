import React, { useEffect, useState } from 'react';
import { Layer } from 'react-konva';
import { renderLayer } from '../../helpers/game.helper';

const Furniture = (): JSX.Element => {
  const [layer1, setLayer1] = useState<JSX.Element[]>([]);

  useEffect(() => {
    setLayer1(renderLayer(1));
  }, []);

  return <Layer>{layer1}</Layer>;
};

export default Furniture;
