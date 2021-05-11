/* eslint-disable prettier/prettier */
import React, { FC, useEffect, useState, useRef } from 'react';
import game from '../../../data/gameMap.data';

const Map: FC = () => {
  
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [context, setContext] = useState<CanvasRenderingContext2D|null>(null)
  const {cols, layers, tileSize} = game; 

  
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
  }, [context,]);

  return (
    <canvas ref={canvasRef} width="400" height="400"/>
  )
};

export default Map;

// context.fillStyle = '#FF1493';
// context.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);

