export interface MeterModifier {
  readonly meter: string;
  readonly incRateModifier: number;
  readonly decRateModifier: number;
}
