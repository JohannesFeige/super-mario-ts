import { Entity } from '../Entity';
import { SpriteSheet } from '../SpriteSheet';
import { loadSpriteSheet } from '../loaders';
import { PendulumWalk } from '../traits/PendulumWalk';

export async function loadGoomba() {
  const sprite = await loadSpriteSheet('goomba');
  return createGoombaFactory(sprite);
}

function createGoombaFactory(sprite: SpriteSheet) {
  const walkAnimation = sprite.animations.get('walk')!;

  function drawGoomba(this: Entity, context: CanvasRenderingContext2D) {
    sprite.draw(walkAnimation(this.lifetime), context, 0, 0);
  }

  return () => {
    const goomba = new Entity();
    goomba.size.set(16, 16);
    goomba.vel.x = -30;

    goomba.addTrait(new PendulumWalk());

    goomba.draw = drawGoomba;

    return goomba;
  };
}
