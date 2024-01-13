import { BoundingBox } from './BoundingBox';
import { Vec2 } from './math';
import { Jump } from './traits/Jump';
import { Trait } from './traits/Trait';

export type Side = 'top' | 'bottom' | 'left' | 'right';

export class Entity {
  pos: Vec2;
  vel: Vec2;
  size: Vec2;
  offset: Vec2;
  lifetime: number;
  jump?: Jump;
  bounds: BoundingBox;

  private traits: Trait[];

  constructor() {
    this.pos = new Vec2(0, 0);
    this.vel = new Vec2(0, 0);
    this.size = new Vec2(0, 0);
    this.offset = new Vec2(0, 0);

    this.traits = [];
    this.lifetime = 0;

    this.bounds = new BoundingBox(this.pos, this.size, this.offset);
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
    this.lifetime += deltaTime;
  }
  draw!: (context: CanvasRenderingContext2D) => void;
}
