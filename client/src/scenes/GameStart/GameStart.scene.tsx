import React, { useState } from 'react';
import './GameStart.styles.css';
import { useHistory } from 'react-router-dom';
import { setUserName } from '../../features/game/gameSlice';
import { useAppDispatch } from '../../app/hooks';

const GameStart = (): JSX.Element => {
  const [animate, setAnimate] = useState(false);
  const [nameInput, setNameInput] = useState('');
  const history = useHistory();
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(setUserName(nameInput));
    setTimeout(() => {
      history.push('/start');
    }, 500);
  };

  const handleInput = (e: React.FormEvent<HTMLInputElement>): void => {
    const input = e.currentTarget.value;
    setNameInput(input);
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
              }, 600);
            }}
          >
            Start Game
          </button>
          <form
            className={animate ? 'form slideIn' : 'displayOff'}
            onSubmit={handleSubmit}
          >
            <label htmlFor="userName">
              Type your user name
              <input
                type="text"
                name="userName"
                id="userName"
                placeholder="Type here..."
                className="nes-input"
                value={nameInput}
                onChange={handleInput}
              />
            </label>
            <button type="submit" className="nes-btn is-error submit-btn">
              Play
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GameStart;
