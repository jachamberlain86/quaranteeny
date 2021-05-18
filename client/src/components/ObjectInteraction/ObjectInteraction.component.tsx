import React, { useState, useEffect } from 'react';
import './ObjectInteraction.styles.css';
import { useAppSelector } from '../../app/hooks';

const ObjectInteraction = (): JSX.Element => {
  const { objectsNearBy } = useAppSelector((state) => state.sprite);
  const objectList = objectsNearBy.map((object, index) => {
    const keys = ['k', 'l', 'j'];
    return (
      <li key={object}>
        Use the {object.toUpperCase()}, press {keys[index]}
      </li>
    );
  });
  const interactionIndicator = <div>press K to interact</div>;
  return (
    <div>
      {/* {objectList.length > 0 ? interactionIndicator : null} */}
      <ul>{objectList && objectList}</ul>
    </div>
  );
};

export default ObjectInteraction;
