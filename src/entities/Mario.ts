import { Entity } from '../Entity';
import { Go } from '../traits/Go';
import { Jump } from '../traits/Jump';
import { Killable } from '../traits/Killable';
import { Stomper } from '../traits/Stomper';

export class Mario extends Entity {
  jump: Jump;
  go: Go;
  stomper: Stomper;
  killable: Killable;

  constructor() {
    super();

    this.jump = this.addTrait(new Jump());
    this.go = this.addTrait(new Go());
    this.stomper = this.addTrait(new Stomper());
    this.killable = this.addTrait(new Killable());

    this.killable.removeAfter = 0;
  }

  turbo(turboOn: boolean) {
    this.go.dragFactor = turboOn ? Go.FAST_DRAG : Go.SLOW_DRAG;
  }
}
