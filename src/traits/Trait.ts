import { Entity, Side } from '../Entity';

export abstract class Trait {
  abstract update(entity: Entity, deltaTime: number): void;
  obstruct(_entity: Entity, _side: Side) {}
}
