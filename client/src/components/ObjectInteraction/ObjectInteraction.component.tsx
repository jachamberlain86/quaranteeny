import React from 'react';
import './ObjectInteraction.styles.css';
import { useAppSelector } from '../../app/hooks';

const ObjectInteraction = (): JSX.Element => {
  const { objectsNearBy } = useAppSelector((state) => state.sprite);
  const objectList = objectsNearBy.map((object, index) => {
    const keys = ['K', 'L', 'J'];
    return (
      <li className="object-interaction__list-item" key={object}>
        <div>Use {object.toUpperCase()}</div>
        <div>
          <span className="object-interaction__key-press">{keys[index]}</span>
        </div>
      </li>
    );
  });
  return (
    <div
      className={objectList.length > 0 ? 'object-interaction__container' : ''}
    >
      <ul>{objectList && objectList}</ul>
    </div>
  );
};

export default ObjectInteraction;
