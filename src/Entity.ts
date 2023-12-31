import { Trait } from './traits/Trait';
import { Vec2 } from './math';

export class Entity {
  pos: Vec2;
  vel: Vec2;
  size: Vec2;

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

  update(deltaTime: number) {
    this.traits.forEach((trait) => {
      trait.update(this, deltaTime);
    });
  }
  draw!: (context: CanvasRenderingContext2D) => void;
}
