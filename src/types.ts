export type LevelSpec = {
  backgrounds: BackgroundSpec[];
};

export type BackgroundSpec = {
  tile: string;
  ranges: TileRange[];
};

export type TileRange = number[];
