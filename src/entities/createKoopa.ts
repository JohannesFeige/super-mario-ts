import { Entity } from '../Entity';
import { SpriteSheet } from '../SpriteSheet';
import { loadSpriteSheet } from '../loaders';
import { PendulumWalk } from '../traits/PendulumWalk';

export async function loadKoopa() {
  const sprite = await loadSpriteSheet('koopa');
  return createKoopaFactory(sprite);
}

function createKoopaFactory(sprite: SpriteSheet) {
  const walkAnimation = sprite.animations.get('walk')!;

  function drawKoopa(this: Entity, context: CanvasRenderingContext2D) {
    sprite.draw(walkAnimation(this.lifetime), context, 0, 0, this.vel.x < 0);
  }

  return () => {
    const koopa = new Entity();
    koopa.size.set(16, 16);
    koopa.vel.x = -30;
    koopa.offset.y = 8;

    koopa.addTrait(new PendulumWalk());

    koopa.draw = drawKoopa;

    return koopa;
  };
}
