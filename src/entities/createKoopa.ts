import { Entity } from '../Entity';
import { SpriteSheet } from '../SpriteSheet';
import { loadSpriteSheet } from '../loaders';
import { Killable } from '../traits/Killable';
import { PendulumMove } from '../traits/PendulumMove';
import { Physics } from '../traits/Physics';
import { Solid } from '../traits/Solid';
import { Trait } from '../traits/Trait';
import { GameContext } from '../types';

export async function loadKoopa(_audioContext: AudioContext) {
  const sprite = await loadSpriteSheet('koopa');
  return createKoopaFactory(sprite);
}

type State = 'walking' | 'hiding' | 'panic';

class Behavior extends Trait {
  state: State;
  hideTime: number;
  private hideDuration: number;
  private panicSpeed: number;
  private walkSpeed: number | null;
  constructor() {
    super('behavior');

    this.state = 'walking';
    this.hideTime = 0;
    this.hideDuration = 5;
    this.panicSpeed = 300;
    this.walkSpeed = null;
  }

  override collides(us: Entity, them: Entity) {
    if ((us.traitProperties.killable as Killable).dead) {
      return;
    }

    if (them.traitProperties.stomper) {
      if (them.vel.y > us.vel.y) {
        this.handleStomp(us, them);
      } else {
        this.handleNudge(us, them);
      }
    }
  }

  handleNudge(us: Entity, them: Entity) {
    if (this.state === 'walking') {
      (them.traitProperties.killable as Killable)?.kill();
    } else if (this.state === 'hiding') {
      this.panic(us, them);
    } else if (this.state === 'panic') {
      const travelDir = Math.sign(us.vel.x);
      const impactDir = Math.sign(us.pos.x - them.pos.x);

      if (travelDir !== 0 && travelDir !== impactDir) {
        (them.traitProperties.killable as Killable).kill();
      }
    }
  }

  handleStomp(us: Entity, _them: Entity) {
    console.log('handle Stomp');
    if (this.state === 'walking') {
      this.hide(us);
    } else if (this.state === 'hiding') {
      (us.traitProperties.killable as Killable).kill();
      us.vel.set(100, -200);
      (us.traitProperties.solid as Solid).obstructs = false;
    } else if (this.state === 'panic') {
      this.hide(us);
    }
  }

  hide(us: Entity) {
    us.vel.x = 0;
    (us.traitProperties.pendulumMove as PendulumMove).enabled = false;
    if (this.walkSpeed == null) {
      this.walkSpeed = (us.traitProperties.pendulumMove as PendulumMove).speed;
    }

    this.hideTime = 0;
    this.state = 'hiding';
  }

  unhide(us: Entity) {
    (us.traitProperties.pendulumMove as PendulumMove).enabled = true;
    (us.traitProperties.pendulumMove as PendulumMove).speed = this.walkSpeed!;
    this.state = 'walking';
  }

  panic(us: Entity, them: Entity) {
    this.state = 'panic';
    (us.traitProperties.pendulumMove as PendulumMove).enabled = true;
    (us.traitProperties.pendulumMove as PendulumMove).speed = this.panicSpeed * Math.sign(them.vel.x);
  }

  override update(us: Entity, { deltaTime }: GameContext): void {
    if (this.state === 'hiding') {
      this.hideTime += deltaTime;

      if (this.hideTime > this.hideDuration) {
        this.unhide(us);
      }
    }
  }
}

function createKoopaFactory(sprite: SpriteSheet) {
  const walkAnimation = sprite.animations.get('walk')!;
  const wakeAnimation = sprite.animations.get('wake')!;

  function routeAnimation(koopa: Entity) {
    if (
      (koopa.traitProperties.behavior as Behavior)?.state === 'hiding' ||
      (koopa.traitProperties.behavior as Behavior)?.state === 'panic'
    ) {
      if ((koopa.traitProperties.behavior as Behavior)?.hideTime > 3) {
        return wakeAnimation((koopa.traitProperties.behavior as Behavior).hideTime);
      }
      return 'hiding';
    }

    if ((koopa.traitProperties.behavior as Behavior)?.state === 'panic') {
      return 'hiding';
    }

    return walkAnimation(koopa.lifetime);
  }

  function drawKoopa(this: Entity, context: CanvasRenderingContext2D) {
    sprite.draw(routeAnimation(this), context, 0, 0, this.vel.x < 0);
  }

  return () => {
    const koopa = new Entity();
    koopa.size.set(16, 16);
    koopa.vel.x = -30;
    koopa.offset.y = 8;

    koopa.addTrait(new Physics());
    koopa.addTrait(new Solid());
    koopa.addTrait(new PendulumMove());
    koopa.addTrait(new Behavior());
    koopa.addTrait(new Killable());

    koopa.draw = drawKoopa;

    return koopa;
  };
}
