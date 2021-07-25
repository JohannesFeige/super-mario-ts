import { createBackgroundLayer } from './layers/background';
import { createCollisionLayer } from './layers/collision';
import { createSpriteLayer } from './layers/sprites';
import { Level } from './Level';
import { loadBackgroundSprites } from './loaders/sprite';
import { BackgroundSpec, LevelSpec } from './types';

export function loadImage(url: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();

    image.addEventListener('load', () => {
      resolve(image);
    });

    image.addEventListener('error', (event) => {
      reject(`Could not load image from ${url}`);
    });

    image.src = url;
  });
}

export function loadJSON<T>(url: string): Promise<T> {
  return fetch(url).then((res) => res.json());
}

export function createTiles(level: Level, backgrounds: BackgroundSpec[]) {
  backgrounds.forEach((background) => {
    background.ranges.forEach(([x1, x2, y1, y2]) => {
      for (let x = x1; x < x2; ++x) {
        for (let y = y1; y < y2; ++y) {
          level.tiles.set(x, y, {
            name: background.tile
          });
        }
      }
    });
  });
}

export function loadLevel(name: string): Promise<Level> {
  return Promise.all([
    loadJSON<LevelSpec>(`levels/${name}.json`),
    loadBackgroundSprites()
  ]).then(([levelSpec, backgroundSprites]) => {
    const level = new Level();

    createTiles(level, levelSpec.backgrounds);

    const backgroundLayer = createBackgroundLayer(level, backgroundSprites);
    level.comp.layers.push(backgroundLayer);

    const spriteLayer = createSpriteLayer(level.entities);
    level.comp.layers.push(spriteLayer);

    // const collisionLayer = createCollisionLayer(level);
    // level.comp.layers.push(collisionLayer);

    return level;
  });
}
