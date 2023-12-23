import { Velocity } from './traits/Velocity';
import { loadMarioSprites } from './sprites';
import { Mario } from './entities/Mario';

export async function createMario() {
  const sprite = await loadMarioSprites();

  const mario = new Mario();

  mario.addTrait(new Velocity());

  mario.draw = function (context) {
    sprite.draw('idle', context, this.pos.x, this.pos.y);
  };

  return mario;
}
