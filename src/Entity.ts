import { Trait } from './traits/Trait';
import { Vec2 } from './math';
import { Jump } from './traits/Jump';

export type Side = 'top' | 'bottom';

export class Entity {
  pos: Vec2;
  vel: Vec2;
  size: Vec2;

  jump?: Jump;

  private traits: Trait[];

  constructor() {
    this.pos = new Vec2(0, 0);
    this.vel = new Vec2(0, 0);
    this.size = new Vec2(0, 0);

    this.traits = [];
  }

  addTrait<T extends Trait>(trait: T) {
    this.traits.push(trait);
    return trait;
  }

  obstruct(side: Side) {
    this.traits.forEach((trait) => {
      trait.obstruct(this, side);
    });
  }

  update(deltaTime: number) {
    this.traits.forEach((trait) => {
      trait.update(this, deltaTime);
    });
  }
  draw!: (context: CanvasRenderingContext2D) => void;
}
