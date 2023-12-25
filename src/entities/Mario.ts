import { Entity } from '../Entity';
import { Go } from '../traits/Go';
import { Jump } from '../traits/Jump';

export class Mario extends Entity {
  jump = this.addTrait(new Jump());
  go = this.addTrait(new Go());

  constructor() {
    super();
  }
}
