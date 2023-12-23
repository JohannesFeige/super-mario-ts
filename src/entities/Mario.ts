import { Entity } from '../Entity';
import { Jump } from '../traits/Jump';

export class Mario extends Entity {
  jump = this.addTrait(new Jump());

  constructor() {
    super();
  }
}
