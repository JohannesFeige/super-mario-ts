import { Entity, Side } from '../Entity';
import { Trait } from './Trait';

export class PendulumWalk extends Trait {
  private speed: number;

  constructor() {
    super();

    this.speed = -30;
  }

  update(entity: Entity, _deltaTime: number): void {
    entity.vel.x = this.speed;
  }

  obstruct(_entity: Entity, side: Side): void {
    if (side === 'left' || side === 'right') {
      this.speed = -this.speed;
    }
  }
}
