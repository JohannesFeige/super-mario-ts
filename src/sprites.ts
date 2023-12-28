import { SpriteSheet } from './SpriteSheet';
import charactersURL from './images/characters.gif';
import { loadImage } from './loaders';

export async function loadMarioSprites() {
  const image = await loadImage(charactersURL);
  const sprites = new SpriteSheet(image, 16, 16);

  sprites.define('idle', 276, 44, 16, 16);

  return sprites;
}
