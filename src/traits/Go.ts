import { Entity } from '../Entity';
import { Trait } from './Trait';

export enum Direction {
  Left = -1,
  Idle = 0,
  Right = 1,
}

export class Go extends Trait {
  dir: Direction;
  distance: number;
  heading: Direction;

  private speed: number;

  constructor() {
    super();

    this.dir = Direction.Idle;
    this.speed = 6000;
    this.distance = 0;
    this.heading = Direction.Right;
  }

  update(entity: Entity, deltaTime: number) {
    entity.vel.x = this.speed * this.dir * deltaTime;

    if (this.dir) {
      this.heading = this.dir;
      this.distance += Math.abs(entity.vel.x) * deltaTime;
    } else {
      this.distance = 0;
    }
  }
}
