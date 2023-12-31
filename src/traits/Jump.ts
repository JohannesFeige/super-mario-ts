import { Entity } from '../Entity';
import { Trait } from './Trait';

export class Jump extends Trait {
  private duration: number;
  private velocity: number;
  private engageTime: number;

  constructor() {
    super();

    this.duration = 0.5;
    this.velocity = 200;
    this.engageTime = 0;
  }

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
