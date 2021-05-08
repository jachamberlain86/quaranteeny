import React from 'react';
import './Furniture.styles.css';

interface FurnitureProps {
  name: string;
}

const Furniture = ({ name }: FurnitureProps): React.ReactElement => {
  return (
    <button type="button" className="nes-btn is-primary meter-btn">
      {name}
    </button>
  );
};

export default Furniture;
