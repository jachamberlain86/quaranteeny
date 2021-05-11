import React from 'react';

const CanvasContext = React.createContext<CanvasRenderingContext2D | null>(
  null
);
export default CanvasContext;
