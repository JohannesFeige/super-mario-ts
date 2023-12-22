import { Level } from './types';

export function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve) => {
    const image = new Image();
    image.addEventListener('load', () => {
      resolve(image);
    });
    image.src = url;
  });
}

export async function loadLevel(name: string) {
  const level = await fetch(`/levels/${name}.json`);
  return await (level.json() as Promise<Level>);
}
