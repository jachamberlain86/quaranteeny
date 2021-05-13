export interface Character {
  curPos: number[];
  movePos: number[];
  timeMoved: number;
  dimensions: number[];
  pixelLocation: number[];
  delayMove: number;
  direction: string;
  isMoving: boolean;
  leftFired: boolean;
  rightFired: boolean;
  upFired: boolean;
  downFired: boolean;
  moveIntId: number | null;
  moveDir: string | null;
}
