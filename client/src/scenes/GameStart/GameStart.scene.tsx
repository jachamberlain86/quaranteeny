import React, { useState } from 'react';
import './GameStart.styles.css';
import { useHistory } from 'react-router-dom';
import { setUserName } from '../../features/user/userSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { changeGameSpeed } from '../../features/game/gameSlice';

interface initialState {
  name: string;
}
const initialState = {
  name: 'showStartBtn',
};

const GameStart = (): JSX.Element => {
  const animationSpeed = 300;
  const [animate, setAnimate] = useState(initialState);
  const [nameInput, setNameInput] = useState('');
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { userId, userName } = useAppSelector((state) => state.user);
  const { gameOver } = useAppSelector((state) => state.game);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    target.classList.add('slideOutLeft');
    dispatch(setUserName(nameInput));
    // setTimeout(() => {
    //   history.push('/start');
    // }, 500);
    setTimeout(() => {
      setAnimate({ name: 'showChooseGameSpeed' });
      setNameInput('');
      target.classList.add('displayOff');
    }, animationSpeed);
  };

  const handleInput = (e: React.FormEvent<HTMLInputElement>): void => {
    const input = e.currentTarget.value;
    setNameInput(input);
  };

  const handleStart = (e: React.FormEvent<HTMLButtonElement>): void => {
    const cssStyle = e.target as Element;
    console.log('cssStyle', cssStyle);
    cssStyle.classList.add('slideOutLeft');
    if (userId) {
      // TODO finish logic to show return user here
      setTimeout(() => {
        cssStyle.classList.add('displayOff');
        setAnimate({ name: 'showReturnUser' });
      }, animationSpeed);
    } else {
      setTimeout(() => {
        cssStyle.classList.add('displayOff');
        setAnimate({ name: 'showForm' });
      }, animationSpeed);
    }
  };

  const handleChooseSpeed = (e: React.FormEvent<HTMLButtonElement>): void => {
    const { id } = e.target as Element;
    if (id === 'realTime') {
      changeGameSpeed(1);
    } else if (id === 'oneMinIsOneHour') {
      changeGameSpeed(60);
    } else if (id === 'oneMinIsOneDay') {
      changeGameSpeed(1440);
    }
    setTimeout(() => {
      console.log('change screens');
    });
  };

  const renderStartBtn = (): JSX.Element => {
    return (
      <button
        type="button"
        className="nes-btn is-error start-btn"
        onClick={handleStart}
      >
        Start
      </button>
    );
  };

  const renderNewUserForm = (): JSX.Element => {
    return (
      <div>
        <form
          className={
            animate.name === 'showForm' ? 'form slideIn' : 'displayOff'
          }
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
          <button
            type="submit"
            className="nes-btn is-error submit-btn"
            disabled={!nameInput}
          >
            Play
          </button>
        </form>
      </div>
    );
  };

  const renderReturnUser = (): JSX.Element => {
    return (
      <div
        className={
          animate.name === 'showReturnUser'
            ? 'return-user-container'
            : 'displayOff'
        }
      >
        <div
          className={
            animate.name === 'showReturnUser' ? 'slideInFromLeft' : 'displayOff'
          }
        >
          <h3 className="rtn-title">Hey {userName}, welcome back</h3>
        </div>
        <div
          className={
            animate.name === 'showReturnUser'
              ? 'return-btn-container slideIn'
              : 'displayOff'
          }
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

  const renderChooseSpeed = (): JSX.Element => {
    return (
      <div>
        <div className="choose-speed-title">
          <h3>Choose game speed</h3>
        </div>
        <div className="speed-btn-container">
          <button
            type="button"
            className="nes-btn speed-btn"
            id="realTime"
            onClick={handleChooseSpeed}
          >
            Real time
          </button>
          <button
            type="button"
            className="nes-btn speed-btn is-warning"
            id="oneMinIsOneHour"
            onClick={handleChooseSpeed}
          >
            1min = 1hour
          </button>
          <button
            type="button"
            className="nes-btn speed-btn is-error"
            id="oneMinIsOneDay"
            onClick={handleChooseSpeed}
          >
            1min = 1day
          </button>
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
          {animate.name === 'showStartBtn' ? renderStartBtn() : null}
          {userId && !gameOver ? renderReturnUser() : renderNewUserForm()}
          {animate.name === 'showChooseGameSpeed' ? renderChooseSpeed() : null}
        </div>
      </div>
    </div>
  );
};

export default GameStart;
