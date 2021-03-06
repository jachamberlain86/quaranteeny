export interface Character {
  curPos: { x: number; y: number };
  movePos: { x: number; y: number };
  leftFired: boolean;
  rightFired: boolean;
  upFired: boolean;
  downFired: boolean;
  kFired: boolean;
  lFired: boolean;
  moveIntId: NodeJS.Timeout | null;
  moveDir: string | null;
  lastInput: number;
  movingSelf: boolean;
}
