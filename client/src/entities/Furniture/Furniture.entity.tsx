import React, { FC } from 'react';
import './Furniture.styles.css';
import {
  handleInteraction,
  setCurrentInteraction,
} from '../../helpers/interactions.helper';

interface FurnitureProps {
  name: string;
}

const Furniture: FC<FurnitureProps> = ({ name }: FurnitureProps) => {
  return (
    <button
      type="button"
      className="nes-btn is-primary meter-btn"
      onClick={() => {
        if (setCurrentInteraction(name)) handleInteraction(name);
      }}
    >
      {name}
    </button>
  );
};

export default Furniture;
