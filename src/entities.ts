import { Mario } from './entities/Mario';
import { loadMarioSprites } from './sprites';

export async function createMario() {
  const sprite = await loadMarioSprites();

  const mario = new Mario();
  mario.size.set(14, 16);

  mario.draw = function (context) {
    sprite.draw('idle', context, this.pos.x, this.pos.y);
  };

  return mario;
}
