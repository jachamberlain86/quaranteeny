import React, { useState, useEffect } from 'react';
import './Home.styles.css';
import { useHistory } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { store } from '../../app/store';
import { setUserName } from '../../features/user/userSlice';
import { setCurrentSong } from '../../features/music/musicSlice';
import {
  btnPressOne,
  btnPressTwo,
  btnClickOne,
  whooshOne,
  bleepOneHover,
  bleepTwo,
  bleepFiveConfirmation,
  bleepSevenHover,
  cancelButton,
} from '../../audioControllers/buttonSounds';
import { musicController } from '../../audioControllers/musicController';

interface initialState {
  name: string;
}
const initialState = {
  name: 'showForm',
};

// TODO move to sound effects
export const handleBtnHoverEnter = (): void => {
  console.log('handleBtnHoverEnter');
  bleepTwo.play();
};
export const handleBtnHoverLeave = (): void => {
  console.log('handleBtnHoverLeave');
  bleepOneHover.play();
};

const Home = (): JSX.Element => {
  const animationSpeed = 400;
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [nameInput, setNameInput] = useState('');
  const [isUserNameAlert, setIsUserNameAlert] = useState(false);
  const [animate, setAnimate] = useState(initialState);
  const handleNoUserName = (): void => {
    cancelButton.play();
    setIsUserNameAlert(true);
  };
  const handleInput = (e: React.FormEvent<HTMLInputElement>): void => {
    const input = e.currentTarget.value;
    setIsUserNameAlert(false);
    setNameInput(input.toUpperCase());
  };
  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    if (!nameInput) {
      handleNoUserName();
      return;
    }
    dispatch(setUserName(nameInput));
    btnPressOne.play();
    history.push('/new-game');
    // const target = e.target as HTMLFormElement;
    // target.classList.add('slideOutLeft');
    // whooshOne.play();
    // setTimeout(() => {
    //   setAnimate({ name: 'showChooseGameSpeed' });
    //   setNameInput('');
    //   // target.classList.add('displayOff');
    // }, animationSpeed);
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
  return (
    <div className="home-background-color">
      <div className="max-width-container">
        <div className="home-container">
          <div className="home-title-row">
            <h1>Quaranteeny</h1>
          </div>
          <div className="home-middle-row">
            <div className="home-col-left">
              <div className="home-story">
                <h2>The story</h2>
                <p>
                  Giant crabs have taken over the world, and your Quaranteeny
                  has gone into lockdown. Only you can stop them from going
                  outside.
                </p>
                <p>
                  Pay attention to your Quaranteeny´s needs, make sure they have
                  health, energy, and money - and don´t let them stay in the
                  danger zone too long!
                </p>
              </div>
            </div>
            <div className="home-col-right">
              <div className="home-form">
                <form
                  className="form"
                  // onSubmit={handleSubmit}
                  autoComplete="off"
                >
                  <h2>You´re new!</h2>
                  <label htmlFor="userName">
                    Type your user name
                    <input
                      type="text"
                      name="userName"
                      id="userName"
                      placeholder="Type here..."
                      className=""
                      value={nameInput}
                      onChange={handleInput}
                    />
                  </label>
                  <div>
                    {isUserNameAlert && !nameInput ? (
                      <p>Please fill in your name</p>
                    ) : null}
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="home-bottom-row">
            <button
              type="button"
              className="submit-btn"
              id="submit-btn"
              // disabled={!nameInput}
              onClick={handleSubmit}
              onMouseEnter={handleBtnHoverEnter}
              onMouseLeave={handleBtnHoverLeave}
            >
              Play
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
