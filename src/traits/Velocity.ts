import { Entity } from '../Entity';
import { Trait } from '../Trait';

export class Velocity extends Trait {
  update(entity: Entity, deltaTime: number) {
    entity.pos.x += entity.vel.x * deltaTime;
    entity.pos.y += entity.vel.y * deltaTime;
  }
}
