export interface Character {
  curPos: number[];
  movePos: number[];
  dimensions: number[];
  pixelLocation: number[];
  direction: string;
  isMoving: boolean;
  leftFired: boolean;
  rightFired: boolean;
  upFired: boolean;
  downFired: boolean;
  moveIntId: number | null;
  moveDir: string | null;
  delay: number;
}
