import React, { FC } from 'react';
import './Furniture.styles.css';
import { handleInteraction } from '../../helpers/entities.helper';

interface FurnitureProps {
  name: string;
}

const Furniture: FC<FurnitureProps> = ({ name }: FurnitureProps) => {
  return (
    <button
      type="button"
      className="nes-btn is-primary meter-btn"
      onClick={() => {
        handleInteraction(name);
      }}
    >
      {name}
    </button>
  );
};

export default Furniture;
