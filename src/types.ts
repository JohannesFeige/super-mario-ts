// todo: clean up literal types
export type TileName = 'ground' | 'sky' | 'chocolate' | 'bricks' | 'chance' | AnimationName;
export type TileType = 'ground';
export type CharacterName = 'idle' | 'run-1' | 'run-2' | 'run-3' | 'break' | 'jump' | 'flat' | 'hiding';
export type SpriteName = TileName | CharacterName | (string & {});
export type AnimationName = 'chance-1' | 'chance-2' | 'chance-3' | 'run' | 'walk' | 'wake';
export type PatternName = 'pipe-2h';

export type LevelSpec = {
  spriteSheet: string;
  layers: Layer[];
  patterns: Patterns;
  entities: { name: string; pos: [x: number, y: number] }[];
};

export type Layer = {
  tiles: Tile[];
};

export type Tile = LevelSpecTile & {
  ranges: TileRange[];
  pattern: PatternName;
};

export type TileRange = [x1: number, x2: number, y1: number, y2: number];

export type Patterns = Record<PatternName, { tiles: Tile[] }>;

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

export type Match<T = unknown> = { tile: T; x1: number; x2: number; y1: number; y2: number };

export type GameContext = { audioContext: AudioContext; deltaTime: number };

export type AudioSheetSpec = {
  fx: {
    [x: string]: {
      url: string;
    };
  };
};
