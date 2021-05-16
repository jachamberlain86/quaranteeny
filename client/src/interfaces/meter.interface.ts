export interface Meter {
  readonly decayRate: number;
  readonly safeSize: number;
  readonly deficitPoint: number;
  readonly deficitImpacts: string[];
  readonly excessPoint: number;
  readonly excessImpacts: string[];
  readonly max: number;
  readonly initialValue: number;
  readonly pauseDecay: boolean;
}
