import { Mario } from './entities/Mario';
import { loadMarioSprites } from './sprites';

export async function createMario() {
  const sprite = await loadMarioSprites();

  const mario = new Mario();
  mario.size.set(14, 16);

  mario.draw = function (context) {
    sprite.draw('idle', context, 0, 0);
  };

  return mario;
}
