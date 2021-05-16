export interface GameMap {
  readonly cols: number;
  readonly layers: [FloorTile[], FurnitureTile[], FurnitureTile[]];
  readonly tileSize: number;
}

export interface FloorTile {
  readonly key: string;
  readonly walk: boolean;
}

export interface FurnitureTile {
  readonly key: string;
  readonly int: string | null;
  readonly intPos: string[];
}

export interface FilterTile {
  readonly key: string;
}
