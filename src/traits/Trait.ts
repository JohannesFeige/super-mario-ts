import { Entity } from '../Entity';

export abstract class Trait {
  abstract update(entity: Entity, deltaTime: number): void;
}
