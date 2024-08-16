import { Entity } from '../Entity';
import { Level } from '../Level';
import { GameContext } from '../types';
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
    this.queue(() => (this.dead = true));
  }

  revive() {
    this.dead = false;
    this.deadTime = 0;
  }

  override update(entity: Entity, { deltaTime }: GameContext, level: Level): void {
    if (this.dead) {
      this.deadTime += deltaTime;
    }

    if (this.deadTime > this.removeAfter) {
      this.queue(() => {
        level.entities.delete(entity);
      });
    }
  }
}
