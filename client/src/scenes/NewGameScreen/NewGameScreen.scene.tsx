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

const NewGameScreen = (): JSX.Element => {
  return (
    <div className="max-width-container">
      <div className="new-game-page-content">
        <div className="difficulty-radio-buttons">
          <div className="diff-radio-button" id="easy">
            easy
            <input type="radio" />
          </div>
          <div className="diff-radio-button" id="middle">
            medium
            <input type="radio" />
          </div>
          <div className="diff-radio-button" id="hard">
            hard
            <input type="radio" />
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
        </div>
        <div className="k-and-l-key-instructions">
          <div className="letter-instruction" id="k">
            K
          </div>
          <div className="letter-instruction" id="l">
            L
          </div>
        </div>
      </div>
      <div> press enter to start </div>

      <div className="graphic-room-items-border-bar">
        the plants and stuff will go here
      </div>
    </div>
  );
};

export default NewGameScreen;
