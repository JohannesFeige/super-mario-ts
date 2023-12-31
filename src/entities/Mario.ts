import { Entity } from '../Entity';
import { Go } from '../traits/Go';
import { Jump } from '../traits/Jump';

export class Mario extends Entity {
  jump: Jump;
  go: Go;

  constructor() {
    super();

    this.jump = this.addTrait(new Jump());
    this.go = this.addTrait(new Go());
  }
}
