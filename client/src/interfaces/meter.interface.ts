export interface Meter {
  readonly decayRate: number;
  readonly safeSize: number;
  readonly deficitPoint: number;
  readonly excessPoint: number;
  readonly max: number;
}
