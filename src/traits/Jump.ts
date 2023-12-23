import { Entity } from '../Entity';
import { Trait } from './Trait';

export class Jump extends Trait {
  duration = 0.5;
  velocity = 200;
  engageTime = 0;

  start() {
    this.engageTime = this.duration;
  }

  cancel() {
    this.engageTime = 0;
  }

  update(entity: Entity, deltaTime: number) {
    if (this.engageTime > 0) {
      entity.vel.y = -this.velocity;
      this.engageTime -= deltaTime;
    }
  }
}
