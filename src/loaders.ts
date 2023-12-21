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

export function loadLevel(name: string) {
  return fetch(`/levels/${name}.json`).then((r) => r.json() as Promise<Level>);
}
