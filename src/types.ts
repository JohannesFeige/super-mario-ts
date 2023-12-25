export type TileName = 'ground' | 'sky';
export type CharacterName = 'idle';
export type SpriteName = TileName | CharacterName;

export type LevelSpec = {
  backgrounds: Background[];
};

export type Background = {
  tile: TileName;
  ranges: [x1: number, x2: number, y1: number, y2: number][];
};

export type Position = {
  x: number;
  y: number;
};

export type LevelSpecTile = {
  name: TileName;
};
