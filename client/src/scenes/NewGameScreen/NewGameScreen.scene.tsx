import React, { useState } from 'react';
import './NewGameScreen.styles.css';
import { useHistory } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import {
  changeGameSpeed,
  setIsCurrentGameActive,
} from '../../features/game/gameSlice';
import NewGamePageAnimations from '../../components/NewGamePageAnimations/NewGamePageAnimations.component';
import {
  btnClickOne,
  handleBtnHoverEnter,
  handleBtnHoverLeave,
} from '../../audioControllers/buttonSounds';

const NewGameScreen = (): JSX.Element => {
  const [radioBtn, setRadioBrn] = useState('');
  const history = useHistory();
  const dispatch = useAppDispatch();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    console.log('radio btn', value);
    setRadioBrn(value);
  };
  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    if (!radioBtn) return;
    if (radioBtn === 'easy') {
      dispatch(changeGameSpeed(1));
    } else if (radioBtn === 'middle') {
      dispatch(changeGameSpeed(60));
    } else if (radioBtn === 'hard') {
      dispatch(changeGameSpeed(1000));
    }
    dispatch(setIsCurrentGameActive());
    history.push('/start');
  };
  const playGameBtn = (
    <button
      type="submit"
      onClick={handleSubmit}
      onMouseEnter={handleBtnHoverEnter}
      onMouseLeave={handleBtnHoverLeave}
      // className="flashing-button"
    >
      Click to start
    </button>
  );

  return (
    <div className="game-container">
      <div className="max-width-container">
        <div className="new-game__page-content">
          <div className="new-game__row-1">
            <h1>New game</h1>
          </div>
          <div className="new-game__row-2">
            <div className="new-game__col-1-left">
              <h2>Choose a game speed</h2>
              <form className="new-game__difficulty-radio-buttons">
                <div className="new-game__diff-radio-button-space">
                  <h1>easy</h1>
                  <p>1 Real Minute = 1 Quaranteeny Minute</p>
                  <input
                    type="radio"
                    className="new-game__diff-radio"
                    id="easy"
                    value="easy"
                    name="gameSpeed"
                    // checked
                    onChange={handleChange}
                    onMouseOver={() => btnClickOne.play()}
                    onFocus={() => {
                      console.log('focus');
                    }}
                  />
                </div>
                <div className="new-game__diff-radio-button-space">
                  <h1>medium</h1>
                  <p>
                    1 Real Minute = <br />1 Quaranteeny Hour
                  </p>

                  <input
                    type="radio"
                    className="new-game__diff-radio"
                    id="middle"
                    value="middle"
                    name="gameSpeed"
                    onChange={handleChange}
                    onMouseOver={() => btnClickOne.play()}
                    onFocus={() => {
                      console.log('focus');
                    }}
                  />
                </div>
                <div className="new-game__diff-radio-button-space">
                  <h1> hard</h1>
                  <p>1 Real Minute = 1 Quaranteeny Day</p>

                  <input
                    type="radio"
                    className="new-game__diff-radio"
                    id="hard"
                    value="hard"
                    name="gameSpeed"
                    onChange={handleChange}
                    onMouseOver={() => btnClickOne.play()}
                    onFocus={() => {
                      console.log('focus');
                    }}
                  />
                </div>
              </form>
            </div>
            <div className="new-game__col-2-right">
              <h2>Controls</h2>
              <div className="instructions-container">
                <div className="instructions__direction-key-instructions">
                  <div className="instructions__-arrow" id="up-arrow" />
                  <div className="instructions__letter-instruction" id="w">
                    W
                  </div>
                  <div className="instructions__bottom-row-of-direction-buttons">
                    <div className="instructions__key-arrow" id="left-arrow" />
                    <div className="instructions__letter-instruction" id="a">
                      A
                    </div>
                    <div className="instructions__letter-instruction" id="s">
                      S
                    </div>
                    <div className="instructions__letter-instruction" id="d">
                      D
                    </div>
                    <div className="instructions__key-arrow" id="right-arrow" />
                  </div>
                  <div className="instructions__key-arrow" id="down-arrow" />
                  <p> Use the W, A, S, and D keys to move around the screen</p>
                </div>
                <div className="instructions__direction-key-instructions">
                  <div className="instructions__k-and-l-key-instructions">
                    <div className="instructions__letter-instruction" id="k">
                      K
                    </div>
                    <div className="instructions__letter-instruction" id="l">
                      L
                    </div>
                  </div>
                  <p>
                    {' '}
                    Use K and L (or your mouse) to interact with items in the
                    flat
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="new-game__row-3">
            <div className="new-game__flashing-button">{playGameBtn}</div>
          </div>
        </div>
        <div className="new-game__page-furniture-icons">
          <div className="new-game__page-icon" id="sofa" />
        </div>
        <div className="new-game__page-furniture-icons">
          <NewGamePageAnimations />
        </div>
      </div>
    </div>
  );
};

export default NewGameScreen;
