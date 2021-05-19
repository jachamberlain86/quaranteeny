import React, { useState } from 'react';
import './Home.styles.css';
import { useHistory } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setUserName } from '../../features/user/userSlice';
import {
  btnPressOne,
  btnPressTwo,
  btnClickOne,
  whooshOne,
  bleepOneHover,
  bleepTwo,
  bleepFiveConfirmation,
  bleepSevenHover,
} from '../../audioControllers/buttonSounds';

interface initialState {
  name: string;
}
const initialState = {
  name: 'showForm',
};

// TODO move to sound effects
export const handleBtnHoverEnter = (): void => {
  bleepTwo.play();
};
export const handleBtnHoverLeave = (): void => {
  bleepOneHover.play();
};

const Home = (): JSX.Element => {
  const animationSpeed = 400;
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [nameInput, setNameInput] = useState('');
  const [animate, setAnimate] = useState(initialState);
  const handleInput = (e: React.FormEvent<HTMLInputElement>): void => {
    const input = e.currentTarget.value;
    setNameInput(input.toUpperCase());
  };
  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    dispatch(setUserName(nameInput));
    btnPressOne.play();
    history.push('/');
    // const target = e.target as HTMLFormElement;
    // target.classList.add('slideOutLeft');
    // whooshOne.play();
    // setTimeout(() => {
    //   setAnimate({ name: 'showChooseGameSpeed' });
    //   setNameInput('');
    //   // target.classList.add('displayOff');
    // }, animationSpeed);
  };
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
                </form>
              </div>
            </div>
          </div>
          <div className="home-bottom-row">
            <button
              type="button"
              className="submit-btn"
              id="submit-btn"
              disabled={!nameInput}
              onClick={handleSubmit}
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
