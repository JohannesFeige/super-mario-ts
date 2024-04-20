import { Entity, Side } from '../Entity';
import { Level } from '../Level';
import { Match } from '../types';

export abstract class Trait {
  NAME: string;
  tasks: (() => void)[];
  constructor(name: string) {
    this.NAME = name;
    this.tasks = [];
  }

  finalize() {
    this.tasks.forEach((task) => task());
    this.tasks.length = 0;
  }

  queue(task: () => void) {
    this.tasks.push(task);
  }

  update(_entity: Entity, _deltaTime: number, _level: Level) {}
  obstruct(_entity: Entity, _side: Side, _match: Match) {}
  collides(_us: Entity, _them: Entity) {}
}
