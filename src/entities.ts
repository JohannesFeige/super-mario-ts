import { createAnimation } from './animation';
import { Mario } from './entities/Mario';
import { loadSpriteSheet } from './loaders';
import { Direction } from './traits/Go';
import { CharacterName } from './types';

export async function createMario() {
  const sprite = await loadSpriteSheet('mario');

  const mario = new Mario();
  mario.size.set(14, 16);

  const runAnimation = createAnimation(['run-1', 'run-2', 'run-3'] as const, 10);
  function routeFrame(mario: Mario): CharacterName {
    if (mario.go.dir !== Direction.Idle) {
      return runAnimation(mario.go.distance);
    }

    return 'idle';
  }

  mario.draw = function (context) {
    sprite.draw(routeFrame(this), context, 0, 0, this.go.heading < 0);
  };

  return mario;
}
