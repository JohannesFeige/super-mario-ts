import { SpriteSheet } from './SpriteSheet';
import { Background, Level } from './types';

function drawBackground(background: Level['backgrounds'][number], context: CanvasRenderingContext2D, sprites: SpriteSheet) {
  background.ranges.forEach(([x1, x2, y1, y2]) => {
    for (let x = x1; x < x2; x++) {
      for (let y = y1; y < y2; y++) {
        sprites.drawTile(background.tile, context, x, y);
      }
    }
  });
}
export function createBackgroundLayer(backgrounds: Background[], sprites: SpriteSheet) {
  const buffer = document.createElement('canvas');
  buffer.width = 256;
  buffer.height = 240;

  backgrounds.forEach((background) => drawBackground(background, buffer.getContext('2d')!, sprites));

  return (context: CanvasRenderingContext2D) => {
    context.drawImage(buffer, 0, 0);
  };
}
