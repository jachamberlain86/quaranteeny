import React, { useState } from 'react';
import './GameStart.styles.css';
import { useHistory } from 'react-router-dom';

const GameStart = (): JSX.Element => {
  const [animate, setAnimate] = useState(false);
  const history = useHistory();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    history.push('/start');
  };

  return (
    <div className="game-start-page">
      <div className="start-page-container">
        <div className="title-row">
          <h1>Quarantiny</h1>
        </div>

        <div className="bottom-row">
          <button
            type="button"
            className={
              animate ? 'nes-btn is-error slideOut' : 'nes-btn is-error'
            }
            onClick={(e): void => {
              setAnimate(!animate);
              setTimeout(() => {
                const cssStyle = e.target as Element;
                cssStyle.classList.add('displayOff');
                // e.target.style.add('display: none');
              }, 600);
              // CHANGE SCREEN
              // setTimeout(() => {
              //   history.push('/start');
              // }, 500);
            }}
          >
            Start Game
          </button>
          <form
            className={animate ? 'form slideIn' : 'displayOff'}
            onSubmit={handleSubmit}
          >
            <label htmlFor="userName">
              {/* <label htmlFor="userName" className={animate ? '' : 'displayOff'}> */}
              Type your user name
              <input
                type="text"
                name="userName"
                id="userName"
                placeholder="Type here..."
                className="nes-input"
                // className={animate ? 'nes-input slideIn' : 'displayOff'}
              />
            </label>
            <button
              type="submit"
              className="nes-btn is-error submit-btn"
              // className={animate ? 'nes-btn is-error slideIn' : 'displayOff'}
            >
              Play
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GameStart;
