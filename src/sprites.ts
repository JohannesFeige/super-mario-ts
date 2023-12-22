import { SpriteSheet } from './SpriteSheet';
import tilesURL from './images/tiles.png?url';
import charactersURL from './images/characters.gif';
import { loadImage } from './loaders';

export async function loadMarioSprites() {
  const image = await loadImage(charactersURL);
  const sprites = new SpriteSheet(image, 16, 16);

  sprites.define('idle', 276, 44, 16, 16);

  return sprites;
}
export async function loadBackgroundSprites() {
  const image = await loadImage(tilesURL);
  const sprites = new SpriteSheet(image, 16, 16);

  sprites.defineTile('ground', 0, 0);
  sprites.defineTile('sky', 3, 23);

  return sprites;
}
