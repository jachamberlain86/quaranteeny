export interface Need {
  readonly name: string;
  readonly decayRate: number;
  readonly safeSize: number;
  readonly deficitImpacts: string[];
  readonly excessImpacts: string[];
}
