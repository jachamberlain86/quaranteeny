export interface Character {
  curPos: { x: number; y: number };
  movePos: { x: number; y: number };
  leftFired: boolean;
  rightFired: boolean;
  upFired: boolean;
  downFired: boolean;
  moveIntId: number | null;
  moveDir: string | null;
  lastInput: number;
}
