import { Entity, Side } from '../Entity';
import { GameContext } from '../types';
import { Trait } from './Trait';

export class Jump extends Trait {
  private ready: number;
  private duration: number;
  private engageTime: number;
  private requestTime: number;
  private gracePeriod: number;
  private speedBoost: number;

  private velocity: number;

  get falling() {
    return this.ready < 0;
  }

  constructor() {
    super('jump');

    this.ready = 0;
    this.duration = 0.3;
    this.engageTime = 0;
    this.requestTime = 0;
    this.gracePeriod = 0.1;
    this.speedBoost = 0.3;

    this.velocity = 200;
  }

  start() {
    this.requestTime = this.gracePeriod;
  }

  cancel() {
    this.engageTime = 0;
    this.requestTime = 0;
  }

  override obstruct(_entity: Entity, side: Side): void {
    if (side === 'bottom') {
      this.ready = 1;
    } else if (side === 'top') {
      this.cancel();
    }
  }

  override update(entity: Entity, { deltaTime }: GameContext) {
    if (this.requestTime > 0) {
      if (this.ready > 0) {
        this.sounds.add('jump');
        this.engageTime = this.duration;
        this.requestTime = 0;
      }

      this.requestTime -= deltaTime;
    }

    if (this.engageTime > 0) {
      entity.vel.y = -(this.velocity + Math.abs(entity.vel.x) * this.speedBoost);
      this.engageTime -= deltaTime;
    }

    this.ready--;
  }
}
