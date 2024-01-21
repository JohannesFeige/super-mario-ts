import { Entity, Side } from '../Entity';
import { Trait } from './Trait';

export class PendulumMove extends Trait {
  speed: number;
  enabled: boolean;

  constructor() {
    super('pendulumMove');

    this.speed = -30;
    this.enabled = true;
  }

  update(entity: Entity, _deltaTime: number): void {
    if (this.enabled) {
      entity.vel.x = this.speed;
    }
  }

  obstruct(_entity: Entity, side: Side): void {
    if (side === 'left' || side === 'right') {
      this.speed = -this.speed;
    }
  }
}
