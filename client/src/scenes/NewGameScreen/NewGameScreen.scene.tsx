import React, { useState, useRef, useEffect, useContext } from 'react';
import { Howler } from 'howler';
import './NewGameScreen.styles.css';
import { useHistory } from 'react-router-dom';
import { setUserName } from '../../features/user/userSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  changeGameSpeed,
  setIsCurrentGameActive,
} from '../../features/game/gameSlice';
import { resetGamePlay } from '../../helpers/game.helper';
import spriteGif from '../../assets/oldImages/TinyJamesWalk.gif';
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
import MuteSoundBtn from '../../components/MuteSoundBtn/MuteSoundBtn.component';
import SoundBar from '../../components/SoundBar/SoundBar.components';
import musicContext from '../../contexts/music.context';
import { store } from '../../app/store';
import { setCurrentSong } from '../../features/music/musicSlice';
import IntroAnimations from '../../components/IntroAnimations/IntroAnimations.component';
import NewGamePageAnimations from '../../components/NewGamePageAnimations/NewGamePageAnimations.component';

const NewGameScreen = (): JSX.Element => {
  const history = useHistory();
  const handleSubmit = (): void => {
    // TODO handle radio button selection
    history.push('/start');
  };
  const playGameBtn = (
    <button type="button" onClick={handleSubmit}>
      Press enter to start
    </button>
  );
  return (
    <div>
      <div className="game-container">
        <div className="max-width-container">
          <div className="new-game-page-content">
            <div className="difficulty-radio-buttons">
              <div className="diff-radio-button-space" id="easy">
                <h1>easy</h1>
                <p>1 Real Minute = 1 Quaranteeny Minute</p>
                <input type="radio" className="diff-radio" />
              </div>
              <div className="diff-radio-button-space" id="middle">
                <h1>medium</h1>
                <p>1 Real Minute = 1 Quaranteeny Hour</p>

                <input type="radio" className="diff-radio" />
              </div>
              <div className="diff-radio-button-space" id="hard">
                <h1> hard</h1>
                <p>1 Real Minute = 1 Quaranteeny Day</p>

                <input type="radio" className="diff-radio" />
              </div>
            </div>
            <div className="direction-key-instructions">
              <div className="key-arrow" id="up-arrow" />
              <div className="letter-instruction" id="w">
                W
              </div>
              <div className="bottom-row-of-direction-buttons">
                <div className="key-arrow" id="left-arrow" />

                <div className="letter-instruction" id="a">
                  A
                </div>
                <div className="letter-instruction" id="s">
                  S
                </div>
                <div className="letter-instruction" id="d">
                  D
                </div>
                <div className="key-arrow" id="right-arrow" />
              </div>
              <div className="key-arrow" id="down-arrow" />
              <p> Use the W, A, S, and D keys to move around the screen</p>
              <div className="flashing-button">{playGameBtn}</div>
            </div>
            <div className="direction-key-instructions">
              <div className="k-and-l-key-instructions">
                <div className="letter-instruction" id="k">
                  K
                </div>
                <div className="letter-instruction" id="l">
                  L
                </div>
              </div>
              <p>
                {' '}
                Your Quaranteeny will tell you when they need something. Use K
                and L to interact with items in their flat
              </p>
            </div>
          </div>
        </div>
        {/* <div className="new-game-page-furniture-icons">
          <div className="new-game-page-icon" id="sofa" />
        </div> */}
        <div className="new-game-page-furniture-icons">
          <NewGamePageAnimations />
        </div>
      </div>
    </div>
  );
};

export default NewGameScreen;
