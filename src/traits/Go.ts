import { Entity } from '../Entity';
import { Trait } from '../Trait';

export class Go extends Trait {
  direction = 0;
  speed = 6000;

  update(entity: Entity, deltaTime: number) {
    entity.vel.x = this.speed * this.direction * deltaTime;
  }
}
