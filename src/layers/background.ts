import { Camera } from '../Camera';
import { Level } from '../Level';
import { SpriteSheet } from '../SpriteSheet';
import { TileResolver } from '../TileResolver';
import { Matrix } from '../math';
import { TileName } from '../types';

export function createBackgroundLayer(level: Level, tileMatrix: Matrix<{ name: TileName }>, sprites: SpriteSheet) {
  const resolver = new TileResolver(tileMatrix);

  const buffer = document.createElement('canvas');
  buffer.width = 256 + 16;
  buffer.height = 240;

  const context = buffer.getContext('2d')!;

  function redraw(startIndex: number, endIndex: number) {
    context.clearRect(0, 0, buffer.width, buffer.height);

    for (let x = startIndex; x <= endIndex; ++x) {
      tileMatrix.grid[x]?.forEach((tile, y) => {
        if (sprites.animations.has(tile.name)) {
          sprites.drawAnimation(tile.name, context, x - startIndex, y, level.totalTime);
        } else {
          sprites.drawTile(tile.name, context, x - startIndex, y);
        }
      });
    }
  }

  return (context: CanvasRenderingContext2D, camera: Camera) => {
    const drawWidth = resolver.toIndex(camera.size.x);
    const drawFrom = resolver.toIndex(camera.pos.x);
    const drawTo = drawFrom + drawWidth;
    redraw(drawFrom, drawTo);

    context.drawImage(buffer, -camera.pos.x % 16, -camera.pos.y);
  };
}
