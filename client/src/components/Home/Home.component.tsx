import React, { useState, useEffect } from 'react';
import './Home.styles.css';
import { useHistory } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { store } from '../../app/store';
import { setUserName } from '../../features/user/userSlice';
import { setCurrentSong } from '../../features/music/musicSlice';
import { resetGamePlay } from '../../helpers/game.helper';
import {
  btnPressOne,
  btnPressTwo,
  bleepFiveConfirmation,
  cancelButton,
  handleBtnHoverEnter,
  handleBtnHoverLeave,
} from '../../audioControllers/buttonSounds';
import { musicController } from '../../audioControllers/musicController';
import IntroAnimations from '../IntroAnimations/IntroAnimations.component';

const Home = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [nameInput, setNameInput] = useState('');
  const [isUserNameAlert, setIsUserNameAlert] = useState(false);
  const { userName } = useAppSelector((state) => state.user);
  const { isCurrentGameActive } = useAppSelector((state) => state.game);

  const handleNoUserName = (): void => {
    cancelButton.play();
    setIsUserNameAlert(true);
  };
  const handleInput = (e: React.FormEvent<HTMLInputElement>): void => {
    const input = e.currentTarget.value;
    setIsUserNameAlert(false);
    setNameInput(input.toUpperCase());
    e.preventDefault();
  };
  const handleSubmit = (
    e: React.FormEvent<HTMLButtonElement | HTMLFormElement>
  ): void => {
    e.preventDefault();
    if (!nameInput) {
      handleNoUserName();
    }
    dispatch(setUserName(nameInput));
    btnPressOne.play();
    history.push('/new-game');
  };
  const handleNewGame = (): void => {
    bleepFiveConfirmation.play();
    resetGamePlay();
    history.push('/new-game');
  };

  const handleContinueGame = (): void => {
    btnPressTwo.play();
    history.push('/start');
  };
  useEffect(() => {
    const howlSongFile = musicController?.findHowlFileFromTitle('Connect');
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

  const newUser = (
    <>
      <div className="home-form">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <h2>You´re new!</h2>
          <label htmlFor="userName">
            Type your name
            <div className="brown_border_box">
              <input
                type="text"
                name="userName"
                id="userName"
                placeholder="Type here..."
                value={nameInput}
                onChange={handleInput}
              />
            </div>
          </label>
          <div>
            {isUserNameAlert && !nameInput ? (
              <p>Please fill in your name</p>
            ) : null}
          </div>
        </form>
      </div>
    </>
  );

  const returnUser = (
    <>
      <div className="return-greeting">
        <h2>Hey {userName}!</h2>
        <h2>Welcome Back</h2>
      </div>
      <div className="home__btn-container">
        {isCurrentGameActive && (
          <button
            type="button"
            onClick={handleContinueGame}
            onMouseEnter={handleBtnHoverEnter}
            onMouseLeave={handleBtnHoverLeave}
            className="bordered-button"
          >
            Continue
          </button>
        )}
        <button
          type="button"
          onClick={handleNewGame}
          onMouseEnter={handleBtnHoverEnter}
          onMouseLeave={handleBtnHoverLeave}
          className="bordered-button"
        >
          New Game
        </button>
      </div>
    </>
  );
  return (
    <div className="home-background-color">
      <div className="max-width-container">
        <div className="home__container">
          <div className="home__title-row">
            <h1>Quaranteeny</h1>
          </div>
          <div className="home__middle-row">
            <div className="home__col-left">
              <div className="home__story">
                <h2>The story so far...</h2>
                <p>
                  Giant crabs have overrun the world!
                  <br />
                  Quaranteeny has been put in lockdown.
                  <br />
                  Keep quaranteeny happy, healthy, and safely indoors!
                </p>
                <p>
                  Pay attention to quaranteeny´s needs.
                  <br />
                  Keep their meters topped up, and don´t spend too much time in
                  the danger zones!
                </p>
              </div>
            </div>
            <div className="home__col-right">
              {userName ? returnUser : newUser}
            </div>
          </div>
          {!userName && (
            <div className="home__bottom-row">
              <button
                type="button"
                className="home__submit-btn"
                id="submit-btn"
                onClick={handleSubmit}
                onMouseEnter={handleBtnHoverEnter}
                onMouseLeave={handleBtnHoverLeave}
              >
                New Game
              </button>
            </div>
          )}
          <IntroAnimations />
        </div>
      </div>
    </div>
  );
};

export default Home;
