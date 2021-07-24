import { Level } from '../Level';
import { SpriteSheet } from '../SpriteSheet';

export function createBackgroundLayer(level: Level, sprites: SpriteSheet) {
  const buffer = document.createElement('canvas');
  buffer.width = 256;
  buffer.height = 240;

  const context = buffer.getContext('2d');

  level.tiles.forEach((tile, x, y) => {
    sprites.drawTile(tile.name, context, x, y);
  });

  return function drawBackgroundLayer(context: CanvasRenderingContext2D) {
    context.drawImage(buffer, 0, 0);
  };
}
