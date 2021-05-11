/* eslint-disable prettier/prettier */
import React, { FC, useEffect, useContext, useState, useRef } from 'react';
import { GameMap } from '../../../interfaces/gameMap.interface';
import game from '../../../data/gameMap.data';
import CanvasContext from '../canvasContext';

const Map: FC = (props) => {
  
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [context, setContext] = useState<CanvasRenderingContext2D|null>(null)
  const cols = 10; 
  const layers = [[
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    3, 1, 2, 1, 1, 1, 1, 1, 1, 0,
    3, 1, 1, 1, 1, 1, 1, 1, 1, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 1, 0,
    0, 1, 1, 1, 1, 0, 0, 0, 0, 0,
    0, 1, 1, 1, 1, 0, 1, 1, 2, 0,
    0, 2, 1, 1, 1, 0, 1, 1, 2, 0,
    0, 2, 1, 1, 1, 0, 1, 1, 1, 0,
    0, 2, 1, 1, 1, 0, 1, 1, 1, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0  
  ], [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 1, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 1, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 1, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 1, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 1, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 4, 0,
    0, 6, 1, 1, 1, 1, 1, 1, 5, 0,
    0, 7, 1, 1, 1, 1, 1, 1, 1, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0
  ]]
  const tileSize = 40;

  
  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement; 
    setContext(canvas.getContext('2d'))
  }, [])

  
  useEffect(() => {
    if (context) 
    {
      // eslint-disable-next-line no-plusplus
      for (let y = 0; y < cols; y++) {
      // eslint-disable-next-line no-plusplus
      for (let x = 0; x < cols; x++) {
        switch(layers[0][(y*cols)+x]){
          case 0: 
            context.fillStyle = "#FF1493"; 
            context.fillRect(x*tileSize, y*tileSize, tileSize, tileSize); 
          break; 
          default: 
            context.fillStyle="#eeeeee"; 
            context.fillRect(x*tileSize, y*tileSize, tileSize, tileSize)
        }
      }
    }
  }
  }, [context, layers]);

  return (
    <canvas ref={canvasRef} width="400" height="400"/>
  )
};

export default Map;

// context.fillStyle = '#FF1493';
// context.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);

