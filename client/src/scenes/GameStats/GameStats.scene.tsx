import React, { FC, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { useAppSelector } from '../../app/hooks';
import { resetGamePlay } from '../../helpers/game.helper';
import { selectScores } from '../../features/user/userSlice';
import {} from '../../features/game/gameSlice';
import { store } from '../../app/store';
import { musicController } from '../../audioControllers/musicController';
import { setCurrentSong } from '../../features/music/musicSlice';
import {
  handleBtnHoverEnter,
  handleBtnHoverLeave,
  bleepFiveConfirmation,
} from '../../audioControllers/buttonSounds';

import './GameStats.styles.css';

const GameStats: FC = () => {
  const history = useHistory();
  const { timeLasted, gameOverCause } = useAppSelector((state) => state.game);
  const timeLastedPretty = moment.duration(timeLasted).humanize();
  const scores = useAppSelector(selectScores);
  const sortedScored = scores.slice().sort((a, b) => b - a);
  const scoresPretty = sortedScored.map((score) =>
    moment.duration(score).humanize()
  );
  const topFiveScores = scoresPretty.slice(0, 5);

  const handlePlayAgain = (): void => {
    resetGamePlay();
    bleepFiveConfirmation.play();
    history.push('/new-game');
  };

  useEffect(() => {
    const howlSongFile = musicController?.findHowlFileFromTitle('stats');
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

  let gameOverText1 =
    'Quaranteeny went outside and got mauled by a giant crab.';
  let gameOverText2 =
    "It's not safe outdoors! Remember to look after quaranteeny!";
  if (gameOverCause === 'starvation') {
    gameOverText1 =
      "Quaranteeny went looking for food. Now they're crab food...";
    gameOverText2 = 'Eat dinner or be eaten. Remember to keep quaranteeny fed!';
  } else if (gameOverCause === 'sleep deprivation') {
    gameOverText1 =
      'Quaranteeny went sleepwalking and bumped into an angry crab.';
    gameOverText2 = 'Sleep keeps you safe! Remember to put quaranteeny to bed!';
  } else if (gameOverCause === 'sickness') {
    gameOverText1 =
      'Quaranteeny went in search of medicine, but found crabs instead.';
    gameOverText2 =
      "Crabs are bad for you! Take better care of quaranteeny's health!";
  }

  return (
    <div className="game-container">
      <div className="GameStats__page">
        <div className="max-width-container">
          <div className="GameStats__main-container">
            <div className="GameStats__content-container">
              <div className="GameStats__column">
                <h1>Oh no!</h1>
                <div className="GameStats__why-lost-text">{gameOverText1}</div>
                <div className="GameStats__why-lost-text">{gameOverText2}</div>
              </div>
              <div className="GameStats__column GameStats__column-right">
                {timeLastedPretty && <h1>Lasted for {timeLastedPretty}</h1>}
                <div className="GameStats__high-scores">
                  <h2>List of top times</h2>
                  <ol className="GameStats__high-scores-list">
                    {topFiveScores.map((score, index) => {
                      // eslint-disable-next-line react/no-array-index-key
                      return <li key={index}>{score}</li>;
                    })}
                  </ol>
                </div>
              </div>
            </div>
            <div className="GameStats__btn-container">
              <button
                type="button"
                className="GameStats__new-game-btn"
                onClick={handlePlayAgain}
                onMouseEnter={handleBtnHoverEnter}
                onMouseLeave={handleBtnHoverLeave}
              >
                New game
              </button>
            </div>
          </div>
        </div>
        <div className="crab" />
      </div>
    </div>
  );
};

export default GameStats;
