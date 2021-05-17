export interface Character {
  curPos: number[];
  movePos: number[];
  leftFired: boolean;
  rightFired: boolean;
  upFired: boolean;
  downFired: boolean;
  moveIntId: number | null;
  moveDir: string | null;
  lastInput: number;
}
