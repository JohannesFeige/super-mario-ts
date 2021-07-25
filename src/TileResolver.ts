import { Matrix } from './math';
import { LevelSpecTile } from './types';

export type TileResolverMatch = {
  tile: LevelSpecTile;
  x1: number;
  x2: number;
  y1: number;
  y2: number;
  // indexX: number;
  // indexY: number;
};

export type TileResolverMatrix = Matrix<LevelSpecTile>;

export class TileResolver {
  constructor(public matrix: TileResolverMatrix, public tileSize = 16) {}

  toIndex(pos: number) {
    return Math.floor(pos / this.tileSize);
  }

  toIndexRange(pos1: number, pos2: number) {
    const pMax = Math.ceil(pos2 / this.tileSize) * this.tileSize;
    const range: number[] = [];
    let pos = pos1;
    do {
      range.push(this.toIndex(pos));
      pos += this.tileSize;
    } while (pos < pMax);
    return range;
  }

  getByIndex(indexX: number, indexY: number) {
    const tile = this.matrix.get(indexX, indexY);
    if (tile) {
      const x1 = indexX * this.tileSize;
      const x2 = x1 + this.tileSize;
      const y1 = indexY * this.tileSize;
      const y2 = y1 + this.tileSize;
      return {
        tile,
        x1,
        x2,
        y1,
        y2
      };
    }
  }

  searchByPosition(posX: number, posY: number) {
    return this.getByIndex(this.toIndex(posX), this.toIndex(posY));
  }

  searchByRange(x1: number, x2: number, y1: number, y2: number) {
    const matches: TileResolverMatch[] = [];
    this.toIndexRange(x1, x2).forEach((indexX) => {
      this.toIndexRange(y1, y2).forEach((indexY) => {
        const match = this.getByIndex(indexX, indexY);
        if (match) {
          matches.push(match);
        }
      });
    });
    return matches;
  }
}
