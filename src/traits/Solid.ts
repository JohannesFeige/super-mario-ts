import { Entity, Side } from '../Entity';
import { Match } from '../types';
import { Trait } from './Trait';

export class Solid extends Trait {
  obstructs: boolean;
  constructor() {
    super('solid');
    this.obstructs = true;
  }

  obstruct(entity: Entity, side: Side, match: Match): void {
    if (!this.obstructs) {
      return;
    }

    if (side === 'bottom') {
      entity.bounds.bottom = match.y1;
      entity.vel.y = 0;
    } else if (side === 'left') {
      entity.bounds.left = match.x2;
      entity.vel.x = 0;
    } else if (side === 'right') {
      entity.bounds.right = match.x1;
      entity.vel.x = 0;
    } else if (side === 'top') {
      entity.bounds.top = match.y2;
      entity.vel.y = 0;
    }
  }
}
