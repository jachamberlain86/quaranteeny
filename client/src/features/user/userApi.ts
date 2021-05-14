import { MetersState } from '../meters/metersSlice';
import { GameState } from '../game/gameSlice';
import { SpriteState } from '../sprite/spriteSlice';
import { UserStateInDb } from './userSlice';

const { REACT_APP_SERVER_PORT, REACT_APP_SERVER_HOST } = process.env;

const baseUrl = `http://${REACT_APP_SERVER_HOST}:${REACT_APP_SERVER_PORT}`;

export async function fetchUserData(): Promise<{
  id: string;
  game: GameState;
  sprite: SpriteState;
  meters: MetersState;
  user: UserStateInDb;
} | null> {
  try {
    const userId = localStorage.getItem('userId');
    const res = await fetch(`${baseUrl}/users/${userId}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error); // eslint-disable-line
    return null;
  }
}

export async function createUserInDb(): Promise<string | null> {
  try {
    const res = await fetch(`${baseUrl}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    });
    const { id } = await res.json();
    return id;
  } catch (error) {
    console.error(error); // eslint-disable-line
    return null;
  }
}

export async function updateUserInDb({
  id,
  game,
  sprite,
  meters,
  user,
}: {
  id: string;
  game: GameState;
  sprite: SpriteState;
  meters: MetersState;
  user: UserStateInDb;
}): Promise<{
  id: string;
  game: GameState;
  sprite: SpriteState;
  meters: MetersState;
  user: UserStateInDb;
} | null> {
  try {
    const res = await fetch(`${baseUrl}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, game, sprite, meters, user }),
    });
    return await res.json();
  } catch (error) {
    console.error(error); // eslint-disable-line
    return null;
  }
}
