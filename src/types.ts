export type TileName = 'ground' | 'sky' | 'chocolate' | 'bricks' | 'chance' | AnimationName;
export type TileType = 'ground';
export type CharacterName = 'idle' | 'run-1' | 'run-2' | 'run-3';
export type SpriteName = TileName | CharacterName;
export type AnimationName = 'chance-1' | 'chance-2' | 'chance-3';

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

export type SheetSpec = { imageUrl: string } & TileSpec & FrameSpec;

type TileSpec = {
  tileW: number;
  tileH: number;
  tiles: { name: TileName; index: [number, number] }[];
  animations: { name: TileName; frameLen: number; frames: AnimationName[] }[];
};

type FrameSpec = {
  frames: { name: CharacterName; rect: [x: number, y: number, width: number, height: number] }[];
};
