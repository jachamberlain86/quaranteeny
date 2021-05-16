export interface Need {
  readonly name: string;
  readonly decayRate: number;
  readonly pauseDecay: boolean;
  readonly safeSize: number;
  readonly deficitImpacts: string[];
  readonly excessImpacts: string[];
}
