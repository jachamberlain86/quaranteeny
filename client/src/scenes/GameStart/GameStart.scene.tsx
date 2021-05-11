import React, { useState } from 'react';
import './GameStart.styles.css';
import { useHistory } from 'react-router-dom';

const GameStart = (): JSX.Element => {
  const [animate, setAnimate] = useState(false);
  console.log('animate: ', animate);
  const history = useHistory();
  return (
    <div className={animate ? 'game-start-page animate' : 'game-start-page'}>
      <h1>Quarantiny</h1>
      <button
        type="button"
        className="nes-btn is-error"
        onClick={(): void => {
          setAnimate(!animate);
          setTimeout(() => {
            history.push('/start');
          }, 500);
        }}
      >
        Start Game
      </button>
    </div>
  );
};

export default GameStart;
