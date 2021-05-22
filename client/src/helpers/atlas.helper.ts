/* helper functions used by atlas indices to calculate original size
and position in pixels. All assets were created on a 32x32 scale */

export const calcPixelPos = (axis: number): number => axis * 32;
export const calcPixelSize = (tiles: number): number => tiles * 32;
