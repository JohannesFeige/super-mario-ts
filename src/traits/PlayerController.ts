import { Entity } from '../Entity';
import { Level } from '../Level';
import { Vec2 } from '../math';
import { Killable } from './Killable';
import { Trait } from './Trait';

export class PlayerController extends Trait {
  player: Entity | null;
  checkpoint: Vec2;

  constructor() {
    super('playerController');

    this.player = null;
    this.checkpoint = new Vec2(0, 0);
  }

  setPlayer(entity: Entity) {
    this.player = entity;
  }

  update(_entity: Entity, _deltaTime: number, level: Level): void {
    if (this.player && !level.entities.has(this.player)) {
      (this.player.traitProperties.killable as Killable)?.revive();
      this.player.pos.set(this.checkpoint.x, this.checkpoint.y);
      level.entities.add(this.player);
    }
  }
}
