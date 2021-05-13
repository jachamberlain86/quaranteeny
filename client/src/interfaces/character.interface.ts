export interface Character {
  curPos: number[];
  movePos: number[];
  timeMoved: number;
  dimensions: number[];
  position: number[];
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
