import { Level } from './Level';
import { createBackgroundLayer, createSpriteLayer } from './layer';
import { loadBackgroundSprites } from './sprites';
import { Background, LevelSpec } from './types';

export function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve) => {
    const image = new Image();
    image.addEventListener('load', () => {
      resolve(image);
    });
    image.src = url;
  });
}

function createTiles(level: Level, backgrounds: Background[]) {
  backgrounds.forEach((background) => {
    background.ranges.forEach(([x1, x2, y1, y2]) => {
      for (let x = x1; x < x2; x++) {
        for (let y = y1; y < y2; y++) {
          level.tiles.set(x, y, { name: background.tile });
        }
      }
    });
  });
}

export async function loadLevel(name: string) {
  const [levelSpec, backgroundSprites] = await Promise.all([
    fetch(`/levels/${name}.json`).then((r) => r.json()) as Promise<LevelSpec>,
    loadBackgroundSprites(),
  ]);

  const level = new Level();
  createTiles(level, levelSpec.backgrounds);

  const backgroundLayer = createBackgroundLayer(level, backgroundSprites);
  level.comp.layers.push(backgroundLayer);

  const spriteLayer = createSpriteLayer(level.entities);
  level.comp.layers.push(spriteLayer);

  return level;
}
