import { SpriteSheet } from './SpriteSheet';
import { createAnimation } from './animation';
import { SheetSpec } from './types';

export async function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve) => {
    const image = new Image();
    image.addEventListener('load', () => {
      resolve(image);
    });
    image.src = `${import.meta.env.BASE_URL}${url}`;
  });
}

export async function loadJSON<T = unknown>(url: string) {
  return fetch(`${import.meta.env.BASE_URL}${url}`).then((r) => r.json()) as Promise<T>;
}

export async function loadSpriteSheet(name: string) {
  const sheetSpec = await loadJSON<SheetSpec>(`/sprites/${name}.json`);
  const image = await loadImage(sheetSpec.imageUrl);

  const sprites = new SpriteSheet(image, sheetSpec.tileW, sheetSpec.tileH);

  sheetSpec.tiles?.forEach((tile) => {
    sprites.defineTile(tile.name, ...tile.index);
  });

  sheetSpec.frames?.forEach((frameSpec) => {
    sprites.define(frameSpec.name, ...frameSpec.rect);
  });

  sheetSpec.animations?.forEach((animationSpec) => {
    const animation = createAnimation(animationSpec.frames, animationSpec.frameLen);
    sprites.defineAnimation(animationSpec.name, animation);
  });

  return sprites;
}
