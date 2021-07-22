import { loadImage, loadLevel } from './loaders';
import { raise } from './raise';
import { SpriteSheet } from './SpriteSheet';
import { BackgroundSpec } from './types';

function drawBackground(background: BackgroundSpec, context: CanvasRenderingContext2D, sprites: SpriteSheet) {
  background.ranges.forEach(([x1, x2, y1, y2]) => {
    for (let x = x1; x < x2; ++x) {
      for (let y = y1; y < y2; ++y) {
        sprites.drawTile(background.tile, context, x, y);
      }
    }
  });
}

async function main(canvas: HTMLCanvasElement) {
  const context = canvas.getContext('2d') || raise('Canvas not supported');

  const image = await loadImage('/images/tiles.png');
  const sprites = new SpriteSheet(image, 16, 16);
  sprites.define('ground', 0, 0);
  sprites.define('sky', 3, 23);

  const level = await loadLevel('1-1');

  level.backgrounds.forEach(background => {
    drawBackground(background, context, sprites);
  });
}

const canvas = document.getElementById('screen');

if (canvas instanceof HTMLCanvasElement) {
  main(canvas).catch(console.error);
} else {
  console.warn('Canvas not found.');
}
