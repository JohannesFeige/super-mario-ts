import { Entity } from '../Entity';
import { Level } from '../Level';
import { Vec2 } from '../math';
import { GameContext } from '../types';
import { Killable } from './Killable';
import { Stomper } from './Stomper';
import { Trait } from './Trait';

export class PlayerController extends Trait {
  player: Entity | null;
  checkpoint: Vec2;
  time: number;
  score: number;

  constructor() {
    super('playerController');

    this.player = null;
    this.checkpoint = new Vec2(0, 0);
    this.time = 300;
    this.score = 0;
  }

  setPlayer(entity: Entity) {
    this.player = entity;

    (this.player.traitProperties.stomper as Stomper).events.listen('stomp', () => {
      this.score += 100;
    });
  }

  override update(_entity: Entity, { deltaTime }: GameContext, level: Level): void {
    if (this.player && !level.entities.has(this.player)) {
      (this.player.traitProperties.killable as Killable)?.revive();
      this.player.pos.set(this.checkpoint.x, this.checkpoint.y);
      level.entities.add(this.player);
    } else {
      this.time -= deltaTime * 2;
    }
  }
}
