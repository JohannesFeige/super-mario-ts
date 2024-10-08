import { Entity } from '../Entity';
import { Killable } from './Killable';
import { Trait } from './Trait';

export class Stomper extends Trait {
  queueBounce: boolean;
  private bounceSpeed: number;

  constructor() {
    super('stomper');

    this.queueBounce = false;
    this.bounceSpeed = 400;
  }

  private bounce(us: Entity, them: Entity) {
    us.bounds.bottom = them.bounds.top;
    us.vel.y = -this.bounceSpeed;

    this.queueBounce = true;
  }

  override collides(us: Entity, them: Entity) {
    if (!(them.traitProperties.killable as Killable) || (them.traitProperties.killable as Killable).dead) {
      return;
    }

    if (us.vel.y > them.vel.y) {
      this.bounce(us, them);
      this.sounds.add('stomp');
      this.events.emit('stomp', us, them)
    }
  }
}
