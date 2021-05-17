import { createContext } from 'react';
import { Howl } from 'howler';

interface AppContextInterface {
  findHowlFileFromTitle(title: string): Howl | null;
  findSongTitleFromHowlFile(song: Howl): string | null;
  playSong(song: Howl): void;
  stopSong(song: Howl): void;
  handleStop(): void;
  handlePause(): void;
  handleMute(): void;
  handleVolume(value: number): void;
  handleSongSkip(direction: number): void;
}

const musicContext = createContext<AppContextInterface | null>(null);

export default musicContext;
