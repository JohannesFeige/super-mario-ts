import { Entity } from '../Entity';
import { Trait } from './Trait';

export enum Direction {
  Left = -1,
  Idle = 0,
  Right = 1,
}

export class Go extends Trait {
  static SLOW_DRAG = 1 / 1000;
  static FAST_DRAG = 1 / 5000;

  dir: Direction;
  distance: number;
  heading: Direction;
  dragFactor: number;

  private acceleration: number;
  private deceleration: number;

  constructor() {
    super();

    this.dir = Direction.Idle;
    this.distance = 0;
    this.heading = Direction.Right;
    this.dragFactor = Go.SLOW_DRAG;

    this.acceleration = 400;
    this.deceleration = 300;
  }

  update(entity: Entity, deltaTime: number) {
    const absX = Math.abs(entity.vel.x);

    if (this.dir !== 0) {
      entity.vel.x += this.acceleration * deltaTime * this.dir;

      if (entity.jump) {
        if (entity.jump.falling === false) {
          this.heading = this.dir;
        }
      } else {
        this.heading = this.dir;
      }
    } else if (entity.vel.x !== 0) {
      const decel = Math.min(absX, this.deceleration * deltaTime);
      entity.vel.x += entity.vel.x > 0 ? -decel : decel;
    } else {
      this.distance = 0;
    }

    const drag = this.dragFactor * entity.vel.x * absX;
    entity.vel.x -= drag;

    this.distance += absX * deltaTime;
  }
}
