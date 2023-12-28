import { Level } from './Level';
import { SpriteSheet } from './SpriteSheet';
import { createBackgroundLayer, createSpriteLayer } from './layers';
import { Background, LevelSpec, SheetSpec } from './types';

export function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve) => {
    const image = new Image();
    image.addEventListener('load', () => {
      resolve(image);
    });
    image.src = url;
  });
}

async function loadJSON<T = unknown>(url: string) {
  return fetch(url).then((r) => r.json()) as Promise<T>;
}

function createTiles(level: Level, backgrounds: Background[]) {
  function applyRanges(background: Background, xStart: number, xLength: number, yStart: number, yLength: number) {
    const xEnd = xStart + xLength;
    const yEnd = yStart + yLength;

    for (let x = xStart; x < xEnd; x++) {
      for (let y = yStart; y < yEnd; y++) {
        level.tiles.set(x, y, { name: background.tile, type: background.type });
      }
    }
  }

  backgrounds.forEach((background) => {
    background.ranges.forEach((range) => {
      if (range.length === 4) {
        applyRanges(background, ...range);
      } else if (range.length === 3) {
        const [xStart, xLen, yStart] = range;
        applyRanges(background, xStart, xLen, yStart, 1);
      } else if (range.length === 2) {
        const [xStart, yStart] = range;
        applyRanges(background, xStart, 1, yStart, 1);
      }
    });
  });
}

async function loadSpriteSheet(name: string) {
  const sheetSpec = await loadJSON<SheetSpec>(`/sprites/${name}.json`);
  const image = await loadImage(sheetSpec.imageUrl);

  const sprites = new SpriteSheet(image, sheetSpec.tileW, sheetSpec.tileH);

  sheetSpec.tiles.forEach((tile) => {
    sprites.defineTile(tile.name, ...tile.index);
  });

  return sprites;
}

export async function loadLevel(name: string) {
  const levelSpec = await loadJSON<LevelSpec>(`/levels/${name}.json`);
  const backgroundSprites = await loadSpriteSheet(levelSpec.spriteSheet);

  const level = new Level();
  createTiles(level, levelSpec.backgrounds);

  const backgroundLayer = createBackgroundLayer(level, backgroundSprites);
  level.comp.layers.push(backgroundLayer);

  const spriteLayer = createSpriteLayer(level.entities);
  level.comp.layers.push(spriteLayer);

  return level;
}
