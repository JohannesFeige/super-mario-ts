import { Entity } from './Entity';

export abstract class Trait {
  update(entity: Entity, deltaTime: number) {}
}
