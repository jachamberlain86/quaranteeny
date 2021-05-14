import React, { useState, useRef } from 'react';
import './GameStart.styles.css';
import { useHistory } from 'react-router-dom';
import { setUserName } from '../../features/user/userSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  changeGameSpeed,
  setActiveCurrentGame,
} from '../../features/game/gameSlice';
import { resetGamePlay } from '../../helpers/game.helper';
import spriteGif from '../../assets/images/TinyJamesWalk.gif';

interface initialState {
  name: string;
}
const initialState = {
  name: 'showStartBtn',
};

const GameStart = (): JSX.Element => {
  const animationSpeed = 400;
  // TODO change animate variable name
  const [animate, setAnimate] = useState(initialState);
  const [nameInput, setNameInput] = useState('');
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { userName } = useAppSelector((state) => state.user);
  const { activeCurrentGame, gameSpeed } = useAppSelector(
    (state) => state.game
  );
  const chooseSpeedDivRef = useRef<HTMLDivElement | null>(null);
  // const currentChooseSpeedDivRef = chooseSpeedDivRef.current as HTMLDivElement;
  const gameInfoDivRef = useRef<HTMLDivElement | null>(null);

  const handleInput = (e: React.FormEvent<HTMLInputElement>): void => {
    const input = e.currentTarget.value;
    setNameInput(input.toUpperCase());
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    target.classList.add('slideOutLeft');
    dispatch(setUserName(nameInput));
    setTimeout(() => {
      setAnimate({ name: 'showChooseGameSpeed' });
      setNameInput('');
      target.classList.add('displayOff');
    }, animationSpeed);
  };

  const handleStart = (e: React.FormEvent<HTMLButtonElement>): void => {
    const cssStyle = e.target as Element;
    cssStyle.classList.add('slideOutLeft');
    if (userName) {
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
    const currentChooseSpeedDivRef = chooseSpeedDivRef.current as HTMLDivElement;
    const { id } = e.target as Element;
    if (id === 'realTime') {
      dispatch(changeGameSpeed(1));
    } else if (id === 'oneMinIsOneHour') {
      dispatch(changeGameSpeed(60));
    } else if (id === 'oneMinIsOneDay') {
      dispatch(changeGameSpeed(1440));
    }
    currentChooseSpeedDivRef.classList.add('slideOutLeft');
    setTimeout(() => {
      currentChooseSpeedDivRef.classList.add('displayOff');
      setAnimate({ name: 'showGameInfo' });
    }, animationSpeed);
  };

  const handleBeginGame = (): void => {
    const currentGameInfoDivRef = gameInfoDivRef.current as HTMLDivElement;
    currentGameInfoDivRef.classList.add('slideOutDown');
    setTimeout(() => {
      // currentGameInfoDivRef.classList.add('displayOff');
      dispatch(setActiveCurrentGame());
      history.push('/start');
    }, animationSpeed);
  };

  const handleNewGame = (): void => {
    // TODO add choice of game speed again
    resetGamePlay();
    setAnimate({ name: 'showChooseGameSpeed' });
    // console.log('clicked');
    // history.push('/start');
  };

  const handleContinueGame = (): void => {
    history.push('/start');
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
          {activeCurrentGame ? (
            <div className="return-btn-container">
              <button
                type="button"
                className="nes-btn is-warning rtn-btn"
                onClick={handleContinueGame}
              >
                Continue Game
              </button>
              <button
                type="button"
                className="nes-btn is-error rtn-btn"
                onClick={handleNewGame}
              >
                New Game
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="nes-btn is-error rtn-btn"
              onClick={handleNewGame}
            >
              New Game
            </button>
          )}
        </div>
      </div>
    );
  };

  const renderChooseSpeed = (): JSX.Element => {
    return (
      <div className="slideInFromRight" ref={chooseSpeedDivRef}>
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

  const renderGameInfo = (): JSX.Element => {
    return (
      <div className="slideInFromRight" ref={gameInfoDivRef}>
        <div className="game-info-title">
          {userName ? <h3>Let´s start {userName}</h3> : <h3>Let´s start</h3>}
        </div>
        <div className="game-info-container">
          <div className="game-info-sub-container">
            <div>
              <p>Time selected:</p>
              <p>{gameSpeed}</p>
            </div>
            <div>
              <p>Character selected:</p>
              <img
                src={spriteGif}
                alt="tiny james walking"
                style={{ width: '150px' }}
              />
            </div>
          </div>
          <div>
            <button
              type="button"
              className="nes-btn is-error start-btn"
              onClick={handleBeginGame}
            >
              Play
            </button>
          </div>
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
          {userName && animate.name === 'showReturnUser'
            ? renderReturnUser()
            : renderNewUserForm()}
          {animate.name === 'showChooseGameSpeed' ? renderChooseSpeed() : null}
          {animate.name === 'showGameInfo' ? renderGameInfo() : null}
        </div>
      </div>
    </div>
  );
};

export default GameStart;
