import meterReducer, { MeterState, incrementByAmount } from './meterSlice';

describe('meter reducer', () => {
  const initialState: MeterState = {
    value: 3,
  };
  it('should handle initial state', () => {
    expect(meterReducer(undefined, { type: 'unknown' })).toEqual({
      value: 0,
    });
  });

  it('should handle incrementByAmount', () => {
    const actual = meterReducer(initialState, incrementByAmount(2));
    expect(actual.value).toEqual(5);
  });
});
