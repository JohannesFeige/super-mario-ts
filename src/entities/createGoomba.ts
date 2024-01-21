import { Entity } from '../Entity';
import { SpriteSheet } from '../SpriteSheet';
import { loadSpriteSheet } from '../loaders';
import { Killable } from '../traits/Killable';
import { PendulumMove } from '../traits/PendulumMove';
import { Trait } from '../traits/Trait';

export async function loadGoomba() {
  const sprite = await loadSpriteSheet('goomba');
  return createGoombaFactory(sprite);
}

class Behavior extends Trait {
  constructor() {
    super('behavior');
  }

  collides(us: Entity, them: Entity) {
    if ((us.traitProperties.killable as Killable).dead) {
      return;
    }

    if (them.traitProperties.stomper) {
      if (them.vel.y > us.vel.y) {
        (us.traitProperties.pendulumMove as PendulumMove).speed = 0;
        (us.traitProperties.killable as Killable).kill();
      } else {
        (them.traitProperties.killable as Killable)?.kill();
      }
    }
  }
}

function createGoombaFactory(sprite: SpriteSheet) {
  const walkAnimation = sprite.animations.get('walk')!;

  function routeAnimation(goomba: Entity) {
    if ((goomba.traitProperties.killable as Killable).dead) {
      return 'flat';
    }

    return walkAnimation(goomba.lifetime);
  }

  function drawGoomba(this: Entity, context: CanvasRenderingContext2D) {
    sprite.draw(routeAnimation(this), context, 0, 0);
  }

  return () => {
    const goomba = new Entity();
    goomba.size.set(16, 16);
    goomba.vel.x = -30;

    goomba.addTrait(new PendulumMove());
    goomba.addTrait(new Behavior());
    goomba.addTrait(new Killable());

    goomba.draw = drawGoomba;

    return goomba;
  };
}
