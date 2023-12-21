import { SpriteSheet } from './SpriteSheet';
import tilesURL from './images/tiles.png?url';
import { loadImage, loadLevel } from './loaders';
import { Level } from './types';

function drawBackground(background: Level['backgrounds'][number], context: CanvasRenderingContext2D, sprites: SpriteSheet) {
  background.ranges.forEach(([x1, x2, y1, y2]) => {
    for (let x = x1; x < x2; x++) {
      for (let y = y1; y < y2; y++) {
        sprites.drawTile(background.tile, context, x, y);
      }
    }
  });
}

const canvas = document.getElementById('screen') as HTMLCanvasElement;
const context = canvas.getContext('2d');

if (!context) {
  throw 'context not found';
}

loadImage(tilesURL).then((image) => {
  const sprites = new SpriteSheet(image, 16, 16);
  sprites.define('ground', 0, 0);
  sprites.define('sky', 3, 23);

  loadLevel('1-1').then((level) => {
    level.backgrounds.forEach((background) => drawBackground(background, context, sprites));
  });

  for (let x = 0; x < 25; x++) {
    for (let y = 12; y < 14; y++) {
      sprites.drawTile('ground', context, x, y);
    }
  }
});
