import { SpriteName, TileName } from './types';

export class SpriteSheet {
  image: HTMLImageElement;
  width: number;
  height: number;
  tiles: Map<SpriteName, HTMLCanvasElement> = new Map();

  constructor(image: HTMLImageElement, width: number, height: number) {
    this.image = image;
    this.width = width;
    this.height = height;
  }

  define(name: SpriteName, x: number, y: number, width: number, height: number) {
    const buffer = document.createElement('canvas');
    buffer.width = width;
    buffer.height = height;
    buffer.getContext('2d')?.drawImage(this.image, x, y, width, height, 0, 0, width, height);

    this.tiles.set(name, buffer);
  }

  defineTile(name: SpriteName, x: number, y: number) {
    this.define(name, x * this.width, y * this.height, this.width, this.height);
  }

  draw(name: SpriteName, context: CanvasRenderingContext2D, x: number, y: number) {
    const buffer = this.tiles.get(name);

    if (!buffer) {
      throw `Tile ${name} not found`;
    }

    context.drawImage(buffer, x, y);
  }

  drawTile(name: SpriteName, context: CanvasRenderingContext2D, x: number, y: number) {
    this.draw(name, context, x * this.width, y * this.height);
  }
}
