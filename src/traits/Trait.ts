import { Entity, Side } from '../Entity';
import { Level } from '../Level';

export abstract class Trait {
  NAME: string;
  constructor(name: string) {
    this.NAME = name;
  }
  update(_entity: Entity, _deltaTime: number, _level: Level) {}
  obstruct(_entity: Entity, _side: Side) {}
  collides(_us: Entity, _them: Entity) {}
}
