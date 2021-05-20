import React, { useContext, useEffect, useRef } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import './Game.styles.css';
import Room from '../../scenes/Room/Room.scene';
import MeterArea from '../MeterArea/MeterArea.component';
import DayCounter from '../DayCounter/DayCounter.component';
import Mood from '../Mood/Mood.component';
import GameOver from '../GameOver/GameOver.component';
import FastForward from '../FastForward/FastForward.component';
import HighScores from '../HighScores/HighScores.component';
import ProgressBar from '../ProgressBar/ProgressBar.component';
import Loading from '../Loading/Loading.component';
import { selectUserStatus } from '../../features/user/userSlice';
import { upHandler, downHandler } from '../../helpers/input.helper';
import { store } from '../../app/store';
import { setCurrentSong } from '../../features/music/musicSlice';
import {
  checkLoseStates,
  checkConditionsState,
  resumeInProgressInteraction,
} from '../../helpers/sprite.helper';
import { startClock } from '../../helpers/game.helper';
import {
  selectIsInFastForwardMode,
  selectIsRoomLoading,
} from '../../features/game/gameSlice';
import { checkMeterStates, decayMeters } from '../../helpers/meters.helper';
import { meters } from '../../data/meters.data';
import GameOverBtn from '../GameOverBtn/GameOverBtn.component';
import MuteSoundBtn from '../MuteSoundBtn/MuteSoundBtn.component';
import ObjectInteraction from '../ObjectInteraction/ObjectInteraction.component';
import {
  gameOverOne,
  gameOverTwo,
  gameOverThree,
  gameOverFour,
} from '../../audioControllers/gameOverSounds';
import { gameOverMusic } from '../../audioControllers/gameOverMusic';
import SoundBar from '../SoundBar/SoundBar.components';
import musicContext from '../../contexts/music.context';
import { musicController } from '../../audioControllers/musicController';
import { stopObjectSound } from '../../audioControllers/houseObjectsSounds';

const Game = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const userLoadingStatus = useAppSelector(selectUserStatus);
  const isRoomLoading = useAppSelector(selectIsRoomLoading);
  const isInFastForwardMode = useAppSelector(selectIsInFastForwardMode);
  const { gameOver } = useAppSelector((state) => state.game);
  const { currentSong } = useAppSelector((state) => state.music);
  const gameScreen = useRef<HTMLDivElement | null>(null);
  const currentGameScreen = gameScreen.current as HTMLDivElement;

  useEffect(() => {
    const timersArr: NodeJS.Timeout[] = [];
    if (userLoadingStatus === 'userLoaded' && !gameOver) {
      const clockTimer = startClock();
      timersArr.push(clockTimer);
      resumeInProgressInteraction();
      const metersTimers = checkMeterStates();
      metersTimers.forEach((timer) => {
        timersArr.push(timer);
      });
      const conditionsTimer = checkConditionsState();
      timersArr.push(conditionsTimer);
      const loseStatesTimer = checkLoseStates();
      timersArr.push(loseStatesTimer);
      const decayTimers = decayMeters(meters);
      decayTimers.forEach((timer) => {
        timersArr.push(timer);
      });
    }

    return () => {
      timersArr.forEach((timer) => {
        clearInterval(timer);
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, userLoadingStatus]);
  // TODO mention that this is causing the page to rerender every second
  // }, [dispatch, userLoadingStatus]);

  useEffect(() => {
    let moveTimer: NodeJS.Timeout | undefined;
    window.addEventListener('keydown', (event) => {
      moveTimer = downHandler(event);
    });
    window.addEventListener('keyup', upHandler);

    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keydown', upHandler);
      if (moveTimer) clearInterval(moveTimer);
    };
  }, []);

  useEffect(() => {
    const id: NodeJS.Timeout = setTimeout(() => {
      if (currentGameScreen && gameOver) {
        currentGameScreen.classList.add('grey');
      }
    }, 1000);
    return () => {
      clearTimeout(id);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameOver]);

  useEffect(() => {
    const howlSongFile = musicController?.findHowlFileFromTitle('Hero');
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
  useEffect(() => {
    if (gameOver) {
      const howlSongFile = musicController.findHowlFileFromTitle(currentSong);
      if (howlSongFile) musicController.stopSong(howlSongFile);
      gameOverTwo.play();
      setTimeout(() => {
        gameOverMusic.play();
      }, 200);
    }
  }, [gameOver]);

  const roomLoading = isRoomLoading ? <Loading /> : '';
  const fastForwardIndicator = isInFastForwardMode ? <FastForward /> : '';

  return (
    <div className="game-container">
      <div className="max-width-container">
        <div ref={gameScreen} className={gameOver ? 'game fadeToGrey' : 'game'}>
          {gameOver && <GameOver />}
          {fastForwardIndicator}
          {roomLoading}

          <div className="panel_space" id="left_panel_space">
            <div className="panel-component-border" id="dcount_panel">
              <DayCounter />
            </div>
            <div className="panel-component-border" id="hscore_panel">
              <HighScores />
            </div>

            <div id="gover_panel">
              <GameOverBtn />
              {/* <button type="button" onClick={() => stopObjectSound()}>
                Stop EFX Loop
              </button> */}
            </div>
          </div>
          <div>
            <Room />
          </div>

          <div className="panel_space" id="right_panel_space">
            <div className="panel-component-border" id="mood_panel">
              <MeterArea />
              <Mood />
              <ObjectInteraction />
              <ProgressBar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
