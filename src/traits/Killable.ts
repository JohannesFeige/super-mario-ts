import { Entity } from '../Entity';
import { Level } from '../Level';
import { Trait } from './Trait';

export class Killable extends Trait {
  dead: boolean;
  removeAfter: number;
  private deadTime: number;
  constructor() {
    super('killable');

    this.dead = false;
    this.deadTime = 0;
    this.removeAfter = 2;
  }

  kill() {
    this.dead = true;
  }

  revive() {
    this.dead = false;
    this.deadTime = 0;
  }

  update(entity: Entity, deltaTime: number, level: Level): void {
    if (this.dead) {
      this.deadTime += deltaTime;
    }

    if (this.deadTime > this.removeAfter) {
      level.entities.delete(entity);
    }
  }
}
