import { Entity } from '../Entity';
import { Level } from '../Level';
import { GameContext } from '../types';
import { Trait } from './Trait';

export class Physics extends Trait {
  constructor() {
    super('physics');
  }

  override update(entity: Entity, { deltaTime }: GameContext, level: Level) {
    entity.pos.x += entity.vel.x * deltaTime;
    level.tileCollider?.checkX(entity);

    entity.pos.y += entity.vel.y * deltaTime;
    level.tileCollider?.checkY(entity);

    entity.vel.y += level.gravity * deltaTime;
  }
}
