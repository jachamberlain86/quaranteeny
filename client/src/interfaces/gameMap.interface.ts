export interface GameMap {
  readonly cols: number;
  readonly layers: [FurnitureTile[]];
  readonly tileSize: number;
}

export interface FurnitureTile {
  readonly key: string;
  readonly int: string | null;
  readonly intPos: string[];
  readonly walk: boolean;
}

export interface AltTile {
  readonly key: string;
}
