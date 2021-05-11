import { MetersState } from '../meters/metersSlice';

const { REACT_APP_SERVER_PORT, REACT_APP_SERVER_HOST } = process.env;

const baseUrl = `http://${REACT_APP_SERVER_HOST}:${REACT_APP_SERVER_PORT}`;
// TODO: Get from local storage / cookies
const userId = '614ee727-961a-4469-bfc1-c0692f74b911';

export async function fetchUserData(): Promise<MetersState | null> {
  try {
    const res = await fetch(`${baseUrl}/users/${userId}`);
    const data = await res.json();
    const { hunger, energy, health, money } = data;
    return {
      hunger: { value: hunger, incRate: 100, decRate: 100 },
      energy: { value: energy, incRate: 100, decRate: 100 },
      health: { value: health, incRate: 100, decRate: 100 },
      money: { value: money, incRate: 100, decRate: 100 },
    };
  } catch (error) {
    console.error(error); // eslint-disable-line
    return null;
  }
}
