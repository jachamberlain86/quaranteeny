import React, { useState } from 'react';
import './GameStart.styles.css';
import { useHistory } from 'react-router-dom';
import { setUserName } from '../../features/user/userSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

const GameStart = (): JSX.Element => {
  const [animate, setAnimate] = useState(false);
  const [nameInput, setNameInput] = useState('');
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { userId, userName } = useAppSelector((state) => state.user);
  const { gameOver } = useAppSelector((state) => state.game);

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

  const startGameBtn: JSX.Element = (
    <button
      type="button"
      className={
        animate
          ? 'nes-btn is-error slideOut start-btn'
          : 'nes-btn is-error start-btn'
      }
      onClick={(e): void => {
        setAnimate(!animate);
        setTimeout(() => {
          const cssStyle = e.target as Element;
          cssStyle.classList.add('displayOff');
        }, 600);
      }}
    >
      Start
    </button>
  );

  const renderNewUserForm = (): JSX.Element => {
    return (
      <div>
        <form
          className={animate ? 'form slideIn' : 'displayOff'}
          onSubmit={handleSubmit}
          autoComplete="off"
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
    );
  };

  const renderReturnUser = (): JSX.Element => {
    return (
      <div className={animate ? 'return-user-container' : 'displayOff'}>
        <div className={animate ? 'slideInFromLeft' : 'displayOff'}>
          <h3 className="rtn-title">Hey {userName}, welcome back</h3>
        </div>
        <div
          className={animate ? 'return-btn-container slideIn' : 'displayOff'}
        >
          {gameOver ? (
            <button type="button" className="nes-btn is-error rtn-btn">
              New Game
            </button>
          ) : (
            <div className="return-btn-container">
              <button
                type="button"
                className="nes-btn is-warning rtn-btn"
                onClick={() => history.push('/start')}
              >
                Continue Game
              </button>
              <button type="button" className="nes-btn is-error rtn-btn">
                New Game
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="game-start-page">
      <div className="start-page-container">
        <div className="title-row">
          <h1>Quarantiny</h1>
        </div>
        <div className="bottom-row">
          {startGameBtn}
          {userId && !gameOver ? renderReturnUser() : renderNewUserForm()}
        </div>
      </div>
    </div>
  );
};

export default GameStart;
