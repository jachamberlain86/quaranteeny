import React, { useState, useEffect } from 'react';
import './ObjectInteraction.styles.css';
import { useAppSelector } from '../../app/hooks';

const ObjectInteraction = (): JSX.Element => {
  const { objectsNearBy } = useAppSelector((state) => state.sprite);
  // const [isInteraction, setIsInteraction] = useState(
  //   objectsNearBy.length !== 0
  // );
  const objectList = objectsNearBy.map((object) => {
    return <li key={object}>{object}</li>;
  });
  // useEffect(() => {
  //   if (objectList.length >= 1) {
  //     console.log('objectList', objectList);
  //     setIsInteraction(true);
  //   }
  //   setIsInteraction(false);
  //   return () => {
  //     console.log('unmounting');
  //   };
  // }, [objectList]);
  return (
    <div>
      {/* <div>{objectList && <h3>Do Stuff!</h3>}</div> */}
      <ul>{objectList && objectList}</ul>
    </div>
  );
};

export default ObjectInteraction;
