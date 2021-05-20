import React, { useState, useRef, useEffect, useContext } from 'react';
import { Howler } from 'howler';
import './GameStart.styles.css';
import { useHistory } from 'react-router-dom';
import { setUserName } from '../../features/user/userSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  changeGameSpeed,
  setIsCurrentGameActive,
} from '../../features/game/gameSlice';
import { resetGamePlay } from '../../helpers/game.helper';
import spriteGif from '../../assets/oldImages/TinyJamesWalk.gif';
// import { musicCuriousIntense } from '../../audioControllers/soundTracks';
import {
  btnPressOne,
  btnPressTwo,
  btnClickOne,
  whooshOne,
  bleepOneHover,
  bleepTwo,
  bleepFiveConfirmation,
  bleepSevenHover,
  handleBtnHoverEnter,
  handleBtnHoverLeave,
} from '../../audioControllers/buttonSounds';
import MuteSoundBtn from '../../components/MuteSoundBtn/MuteSoundBtn.component';
import SoundBar from '../../components/SoundBar/SoundBar.components';
import musicContext from '../../contexts/music.context';
import { store } from '../../app/store';
import { setCurrentSong } from '../../features/music/musicSlice';

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
  const { gameSpeed, gameOver, isCurrentGameActive } = useAppSelector(
    (state) => state.game
  );
  const chooseSpeedDivRef = useRef<HTMLDivElement | null>(null);
  const gameInfoDivRef = useRef<HTMLDivElement | null>(null);
  const musicController = useContext(musicContext);
  useEffect(() => {
    const howlSongFile = musicController?.findHowlFileFromTitle('Connected');
    if (howlSongFile) {
      const songTitle = musicController?.findSongTitleFromHowlFile(
        howlSongFile
      );
      if (songTitle) {
        store.dispatch(setCurrentSong(songTitle));
        musicController?.playSong(howlSongFile);
      }
    }
  }, []);
  const handleInput = (e: React.FormEvent<HTMLInputElement>): void => {
    const input = e.currentTarget.value;
    setNameInput(input.toUpperCase());
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    target.classList.add('slideOutLeft');
    dispatch(setUserName(nameInput));
    whooshOne.play();
    btnPressOne.play();
    setTimeout(() => {
      setAnimate({ name: 'showChooseGameSpeed' });
      setNameInput('');
      target.classList.add('displayOff');
    }, animationSpeed);
  };

  const handleStart = (e: React.FormEvent<HTMLButtonElement>): void => {
    btnPressOne.play();
    setTimeout(() => {
      whooshOne.play();
    }, 125);
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
      dispatch(changeGameSpeed(1000));
    }
    currentChooseSpeedDivRef.classList.add('slideOutLeft');
    btnPressOne.play();
    whooshOne.play();
    setTimeout(() => {
      currentChooseSpeedDivRef.classList.add('displayOff');
      setAnimate({ name: 'showGameInfo' });
    }, animationSpeed);
  };

  const handleBeginGame = (): void => {
    const currentGameInfoDivRef = gameInfoDivRef.current as HTMLDivElement;
    currentGameInfoDivRef.classList.add('slideOutDown');
    bleepFiveConfirmation.play();
    whooshOne.play();
    setTimeout(() => {
      dispatch(setIsCurrentGameActive());
      history.push('/start');
    }, animationSpeed);
  };

  const handleNewGame = (): void => {
    // TODO add choice of game speed again
    bleepFiveConfirmation.play();
    whooshOne.play();
    resetGamePlay();
    setAnimate({ name: 'showChooseGameSpeed' });
  };

  const handleContinueGame = (): void => {
    btnPressTwo.play();
    whooshOne.play();
    history.push('/start');
  };

  const renderStartBtn = (): JSX.Element => {
    return (
      <button
        type="button"
        className="nes-btn is-error start-btn"
        onClick={handleStart}
        onMouseEnter={() => {
          bleepTwo.play();
        }}
        onMouseLeave={() => {
          bleepOneHover.play();
        }}
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
          {isCurrentGameActive ? (
            <div className="return-btn-container">
              <button
                type="button"
                className="nes-btn is-warning rtn-btn"
                onClick={handleContinueGame}
                onMouseEnter={handleBtnHoverEnter}
                onMouseLeave={handleBtnHoverLeave}
              >
                Continue Game
              </button>
              <button
                type="button"
                className="nes-btn is-error rtn-btn"
                onClick={handleNewGame}
                onMouseEnter={handleBtnHoverEnter}
                onMouseLeave={handleBtnHoverLeave}
              >
                New Game
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="nes-btn is-error rtn-btn"
              onClick={handleNewGame}
              onMouseEnter={handleBtnHoverEnter}
              onMouseLeave={handleBtnHoverLeave}
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
            onMouseEnter={handleBtnHoverEnter}
            onMouseLeave={handleBtnHoverLeave}
          >
            Real time
          </button>
          <button
            type="button"
            className="nes-btn speed-btn is-warning"
            id="oneMinIsOneHour"
            onClick={handleChooseSpeed}
            onMouseEnter={handleBtnHoverEnter}
            onMouseLeave={handleBtnHoverLeave}
          >
            1min = 1hour
          </button>
          <button
            type="button"
            className="nes-btn speed-btn is-error"
            id="oneMinIsOneDay"
            onClick={handleChooseSpeed}
            onMouseEnter={handleBtnHoverEnter}
            onMouseLeave={handleBtnHoverLeave}
          >
            1min = 1day
          </button>
        </div>
      </div>
    );
  };

  const renderModeSelected = (): JSX.Element => {
    if (gameSpeed === 1) {
      return (
        <div>
          <h4>Easy Mode:</h4>
          <h5> Real Time</h5>
        </div>
      );
    }
    if (gameSpeed === 60) {
      return (
        <div>
          <h4>Normal Mode:</h4>
          <h5>Every second is One minute</h5>
        </div>
      );
    }
    if (gameSpeed === 1000) {
      return (
        <div>
          <h4>Hard Mode:</h4>
          <h5>Every second is One hour</h5>
        </div>
      );
    }
    return <div />;
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
              <h3>Time selected:</h3>
              {renderModeSelected()}
            </div>
            <div>
              <h3>Character selected:</h3>
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
              onMouseEnter={handleBtnHoverEnter}
              onMouseLeave={handleBtnHoverLeave}
            >
              Play
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="max-width-container">
        <div className="game-start-page">
          <div className="start-page-container">
            <div className="title-row">
              <h1>Quarantiny</h1>
            </div>
            <div className="bottom-row">
              {animate.name === 'showStartBtn' ? renderStartBtn() : null}
              {!userName && animate.name === 'showForm'
                ? renderNewUserForm()
                : null}
              {userName && animate.name === 'showReturnUser'
                ? renderReturnUser()
                : null}
              {animate.name === 'showChooseGameSpeed'
                ? renderChooseSpeed()
                : null}
              {animate.name === 'showGameInfo' ? renderGameInfo() : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameStart;
