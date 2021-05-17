import React, { useContext, useEffect, useRef } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import './Game.styles.css';
import Room from '../../scenes/Room/Room.scene';
import MeterArea from '../MeterArea/MeterArea.component';
import DayCounter from '../DayCounter/DayCounter.component';
import Mood from '../Mood/Mood.component';
import GameOver from '../GameOver/GameOver.component';
import { selectUserStatus } from '../../features/user/userSlice';
import { upHandler, downHandler } from '../../helpers/input.helper';
import { store } from '../../app/store';
import { setCurrentSong } from '../../features/music/musicSlice';
import {
  checkLoseStates,
  checkConditionsState,
} from '../../helpers/sprite.helper';
import { startClock } from '../../helpers/game.helper';
import { checkMeterStates, decayMeters } from '../../helpers/meters.helper';
import { meters } from '../../data/meters.data';
import GameOverBtn from '../GameOverBtn/GameOverBtn.component';
import MuteSoundBtn from '../MuteSoundBtn/MuteSoundBtn.component';
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

const Game = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const userLoadingStatus = useAppSelector(selectUserStatus);
  const { gameOver } = useAppSelector((state) => state.game);
  const { currentSong } = useAppSelector((state) => state.music);
  const gameScreen = useRef<HTMLDivElement | null>(null);
  const currentGameScreen = gameScreen.current as HTMLDivElement;

  useEffect(() => {
    if (userLoadingStatus === 'userLoaded' && !gameOver) {
      console.log('game started');
      startClock();
      checkMeterStates();
      checkConditionsState();
      checkLoseStates();
      decayMeters(meters);
      window.addEventListener('keydown', downHandler);
      window.addEventListener('keyup', upHandler);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, userLoadingStatus]);

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
  return (
    <div>
      <SoundBar />
      {/* {soundBarCTX && soundBarCTX.SoundBar} */}
      <div ref={gameScreen} className={gameOver ? 'game fadeToGrey' : 'game'}>
        {gameOver && <GameOver />}
        <div>
          <DayCounter />
          <Mood />
          <GameOverBtn />
          <MuteSoundBtn />
        </div>
        <Room />
        <MeterArea />
      </div>
    </div>
  );
};

export default Game;
