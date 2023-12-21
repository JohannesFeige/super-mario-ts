export type SpriteName = 'ground' | 'sky';

export type Level = {
  backgrounds: {
    tile: SpriteName;
    ranges: [x1: number, x2: number, y1: number, y2: number][];
  }[];
};
