import gameReducer, {
  GameState,
  updateClockTime,
  updateClockWhenFastForwarding,
} from './gameSlice';
import { second, hour, day } from '../../data/time.data';

const initialTime = new Date('2021-01-01T00:00:00').getTime();
const fastForwardGameSpeed = 10_000;

describe('game reducer', () => {
  const initialState: GameState = {
    gameSpeed: 1,
    startTime: 0,
    currClockTimeReal: 0,
    currClockTimeInGame: 0,
    isInFastForwardMode: false,
    gameOver: false,
    timeLasted: 0,
    isCurrentGameActive: false,
    starvationCounter: 0,
    sleepDepCounter: 0,
    sickCounter: 0,
  };
  const newGameState: GameState = {
    ...initialState,
    startTime: initialTime,
    currClockTimeReal: initialTime,
    currClockTimeInGame: initialTime,
  };
  const returningGameState1x: GameState = {
    ...newGameState,
    currClockTimeReal: newGameState.currClockTimeReal + hour,
    currClockTimeInGame: newGameState.currClockTimeInGame + hour,
  };

  const returningGameState1440x: GameState = {
    ...newGameState,
    gameSpeed: 1440,
    currClockTimeReal: newGameState.currClockTimeReal + hour,
    currClockTimeInGame: newGameState.currClockTimeInGame + hour * 1440,
  };

  it('when gameSpeed is 1x, updateClockTime sets clock to timeNow', () => {
    const actual = gameReducer(
      newGameState,
      updateClockTime({ timeNow: initialTime + second })
    );
    expect(actual.currClockTimeReal).toEqual(initialTime + second);
    expect(actual.currClockTimeInGame).toEqual(initialTime + second);

    const actual2 = gameReducer(
      returningGameState1x,
      updateClockTime({ timeNow: initialTime + hour + second })
    );
    expect(actual2.currClockTimeReal).toEqual(initialTime + hour + second);
    expect(actual2.currClockTimeInGame).toEqual(initialTime + hour + second);
  });

  it('when gameSpeed is 1440x, updateClockTime sets clock correctly', () => {
    const actual = gameReducer(
      { ...newGameState, gameSpeed: 1440 },
      updateClockTime({ timeNow: initialTime + second })
    );
    expect(actual.currClockTimeReal).toEqual(initialTime + second);
    expect(actual.currClockTimeInGame).toEqual(
      initialTime + second * actual.gameSpeed
    );

    const actual2 = gameReducer(
      returningGameState1440x,
      updateClockTime({ timeNow: initialTime + hour + second })
    );
    expect(actual2.currClockTimeReal).toEqual(initialTime + hour + second);
    expect(actual2.currClockTimeInGame).toEqual(
      initialTime + (hour + second) * 1440
    );
  });

  it('when gameSpeed is 1x updateClockWhenFastForwarding sets clock correctly', () => {
    const actual = gameReducer(
      { ...returningGameState1x, gameSpeed: fastForwardGameSpeed },
      updateClockWhenFastForwarding({
        timeNow: returningGameState1x.currClockTimeReal + day,
        gameSpeedOriginal: 1,
      })
    );
    expect(actual.currClockTimeReal).toEqual(
      returningGameState1x.currClockTimeReal + second * fastForwardGameSpeed
    );
    expect(actual.currClockTimeInGame).toEqual(
      returningGameState1x.currClockTimeInGame + second * fastForwardGameSpeed
    );
  });
  it('when gameSpeed is 1x updateClockWhenFastForwarding does not overtake present moment', () => {
    const actual = gameReducer(
      { ...returningGameState1x, gameSpeed: fastForwardGameSpeed },
      updateClockWhenFastForwarding({
        timeNow: returningGameState1x.currClockTimeReal + second,
        gameSpeedOriginal: 1,
      })
    );
    expect(actual.currClockTimeReal).toEqual(
      returningGameState1x.currClockTimeReal + second
    );
    expect(actual.currClockTimeInGame).toEqual(
      returningGameState1x.currClockTimeInGame + second
    );
  });
  it('when gameSpeed is 1440x updateClockWhenFastForwarding sets clock correctly', () => {
    const actual = gameReducer(
      { ...returningGameState1440x, gameSpeed: fastForwardGameSpeed },
      updateClockWhenFastForwarding({
        timeNow: returningGameState1440x.currClockTimeReal + day,
        gameSpeedOriginal: 1440,
      })
    );
    expect(actual.currClockTimeReal).toEqual(
      returningGameState1440x.currClockTimeReal + second * fastForwardGameSpeed
    );
    expect(actual.currClockTimeInGame).toEqual(
      returningGameState1440x.currClockTimeInGame +
        second * 1440 * fastForwardGameSpeed
    );
  });
  it('when gameSpeed is 1440x updateClockWhenFastForwarding does not overtake present moment', () => {
    const actual = gameReducer(
      { ...returningGameState1440x, gameSpeed: fastForwardGameSpeed },
      updateClockWhenFastForwarding({
        timeNow: returningGameState1440x.currClockTimeReal + second,
        gameSpeedOriginal: 1440,
      })
    );
    expect(actual.currClockTimeReal).toEqual(
      returningGameState1440x.currClockTimeReal + second
    );
    expect(actual.currClockTimeInGame).toEqual(
      returningGameState1440x.currClockTimeInGame + second * 1440
    );
  });
});
