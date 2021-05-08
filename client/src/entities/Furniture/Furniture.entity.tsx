import React, { FC } from 'react';
import './Furniture.styles.css';

interface FurnitureProps {
  name: string;
}

const Furniture: FC<FurnitureProps> = ({ name }: FurnitureProps) => {
  return (
    <button type="button" className="nes-btn is-primary meter-btn">
      {name}
    </button>
  );
};

export default Furniture;
