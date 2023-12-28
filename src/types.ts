export type TileName = 'ground' | 'sky' | 'chocolate' | 'bricks' | 'chance';
export type TileType = 'ground';
export type CharacterName = 'idle';
export type SpriteName = TileName | CharacterName;

export type LevelSpec = {
  spriteSheet: string;
  backgrounds: Background[];
};

export type Background = {
  tile: TileName;
  type?: TileType;
  ranges: [x1: number, x2: number, y1: number, y2: number][];
};

export type Position = {
  x: number;
  y: number;
};

export type LevelSpecTile = {
  name: TileName;
  type?: TileType;
};

export type SheetSpec = {
  imageUrl: string;
  tileW: number;
  tileH: number;
  tiles: { name: TileName; index: [number, number] }[];
};
