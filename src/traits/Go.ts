import { Entity } from '../Entity';
import { Trait } from './Trait';

export class Go extends Trait {
  dir = 0;
  speed = 6000;
  engageTime = 0;

  update(entity: Entity, deltaTime: number) {
    entity.vel.x = this.speed * this.dir * deltaTime;
  }
}
