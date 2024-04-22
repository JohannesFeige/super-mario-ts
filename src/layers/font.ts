import { loadImage } from '../loaders';
import { SpriteSheet } from '../SpriteSheet';

const CHARS = ' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~';

export class Font {
  private sprites: SpriteSheet;
  size: number;
  constructor(sprites: SpriteSheet, size: number) {
    this.sprites = sprites;
    this.size = size;
  }

  print(text: string, context: CanvasRenderingContext2D, x = 0, y = 0) {
    [...text].forEach((char, pos) => {
      this.sprites.draw(char, context, x + pos * this.size, y);
    });
  }
}

export async function loadFont() {
  return loadImage('./img/font.png').then((image) => {
    const fontSprite = new SpriteSheet(image);

    const size = 8;
    const rowLen = image.width;

    for (const [index, char] of [...CHARS].entries()) {
      const x = (index * size) % rowLen;
      const y = Math.floor((index * size) / rowLen) * size;
      fontSprite.define(char, x, y, size, size);
    }

    return new Font(fontSprite, size);
  });
}
