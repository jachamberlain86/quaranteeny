import React, { useState, useEffect } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { changeByAmount, selectMeter, decayMeter } from './meterSlice';
import { handleInteraction } from '../../helpers/elements.helper';
import styles from './Meter.module.css';

export function Meter(): React.ReactElement {
  const { food, energy, money } = useAppSelector(selectMeter);
  const dispatch = useAppDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');

  useEffect(() => {
    dispatch(
      decayMeter({
        name: 'food',
        amount: -5,
      })
    );
    dispatch(
      decayMeter({
        name: 'energy',
        amount: -2,
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
        <p>Energy</p>
        <span className={styles.value}>{energy}</span>
      </div>
      <div className={styles.row}>
        <p>Money</p>
        <span className={styles.value}>{money}</span>
      </div>
      <div className={styles.row}>
        <button
          className="nes-btn is-primary"
          onClick={() => {
            handleInteraction('burger');
          }}
          type="button"
        >
          Eat Burger
        </button>
      </div>
    </div>
  );
}
