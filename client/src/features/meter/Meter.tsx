import React, { useState, useEffect } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { changeByAmount, selectMeter, decayMeter } from './meterSlice';
import styles from './Meter.module.css';

export function Meter(): React.ReactElement {
  const { food, energy, money } = useAppSelector(selectMeter);
  const dispatch = useAppDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');

  const incrementValue = Number(incrementAmount) || 0;
  useEffect(() => {
    dispatch(
      decayMeter({
        name: 'food',
        amount: -5,
      })
    );
  }, [dispatch]);
  return (
    <div>
      <div className={styles.row}>
        <p>Food</p>
        <span className={styles.value}>{food}</span>
      </div>
      <div className={styles.row}>
        <input
          className={`${styles.textbox} nes-input`}
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(e.target.value)}
        />
        <button
          className="nes-btn is-primary"
          onClick={() =>
            dispatch(changeByAmount({ name: 'food', amount: incrementValue }))
          }
          type="button"
        >
          Add Amount
        </button>
      </div>
    </div>
  );
}
