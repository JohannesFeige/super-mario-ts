import { AnimationName, SpriteName } from './types';

export class SpriteSheet {
  private image: HTMLImageElement;
  private width: number;
  private height: number;
  private tiles: Map<SpriteName, HTMLCanvasElement[]>;
  animations: Map<SpriteName, (distance: number) => AnimationName>;

  constructor(image: HTMLImageElement, width = 0, height = 0) {
    this.image = image;
    this.width = width;
    this.height = height;
    this.tiles = new Map();
    this.animations = new Map();
  }

  defineAnimation(name: SpriteName, animation: (distance: number) => AnimationName) {
    this.animations.set(name, animation);
  }

  define(name: SpriteName, x: number, y: number, width: number, height: number) {
    const buffers = [false, true].map((flip) => {
      const buffer = document.createElement('canvas');
      buffer.width = width;
      buffer.height = height;

      const context = buffer.getContext('2d')!;

      if (flip) {
        context.scale(-1, 1);
        context.translate(-width, 0);
      }

      context.drawImage(this.image, x, y, width, height, 0, 0, width, height);

      return buffer;
    });

    this.tiles.set(name, buffers);
  }

  defineTile(name: SpriteName, x: number, y: number) {
    this.define(name, x * this.width, y * this.height, this.width, this.height);
  }

  draw(name: SpriteName, context: CanvasRenderingContext2D, x: number, y: number, flip = false) {
    const buffer = this.tiles.get(name)?.[Number(flip)];

    if (!buffer) {
      throw `Tile ${name} not found`;
    }

    context.drawImage(buffer, x, y);
  }

  drawAnimation(name: SpriteName, context: CanvasRenderingContext2D, x: number, y: number, distance: number) {
    const animation = this.animations.get(name)!;
    this.drawTile(animation(distance), context, x, y);
  }

  drawTile(name: SpriteName, context: CanvasRenderingContext2D, x: number, y: number) {
    this.draw(name, context, x * this.width, y * this.height);
  }
}
