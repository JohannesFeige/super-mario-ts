export type LevelSpec = {
  backgrounds: BackgroundSpec[];
};

export type LevelSpecTile = {
  // type: string;
  name?: string;
  // pattern?: string;
  // ranges: TileRange[];
};

export type BackgroundSpec = {
  tile: string;
  ranges: TileRange[];
};

export type TileRange = number[];
