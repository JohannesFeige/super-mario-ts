import { SpriteName } from './types';

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

  define(name: SpriteName, x: number, y: number) {
    const buffer = document.createElement('canvas');
    buffer.width = this.width;
    buffer.height = this.height;
    buffer.getContext('2d')?.drawImage(this.image, x * this.width, y * this.height, this.width, this.height, 0, 0, this.width, this.height);

    this.tiles.set(name, buffer);
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
