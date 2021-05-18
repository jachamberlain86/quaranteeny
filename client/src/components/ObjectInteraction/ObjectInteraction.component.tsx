import React, { useState, useEffect } from 'react';
import './ObjectInteraction.styles.css';
import { useAppSelector } from '../../app/hooks';
import { playObjectSound } from '../../audioControllers/houseObjectsSounds';

const ObjectInteraction = (): JSX.Element => {
  const { objectsNearBy } = useAppSelector((state) => state.sprite);
  // const [isInteraction, setIsInteraction] = useState(
  //   objectsNearBy.length !== 0
  // );
  const objectList = objectsNearBy.map((object, index) => {
    // return <li key={object}>{object}</li>;
    const keys = ['k', 'l', 'j'];
    return (
      <li key={object}>
        Use the {object.toUpperCase()}, press {keys[index]}
      </li>
    );
  });
  // window.addEventListener('keyup', (event: KeyboardEvent): void => {
  //   // fireInteraction
  //   if (event.key === 'k') {
  //     console.log('interact with "k"');
  //     console.log('objectsNearBy[0]', objectsNearBy[0]);
  //     // playObjectSound(objectsNearBy[0]);
  //   }
  //   if (event.key === 'l') {
  //     console.log('interact with "l"');
  //     console.log('objectsNearBy[1]', objectsNearBy[1]);
  //     // playObjectSound(objectsNearBy[1]);
  //   }
  // });
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
