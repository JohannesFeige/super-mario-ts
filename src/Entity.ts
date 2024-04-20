import { BoundingBox } from './BoundingBox';
import { Level } from './Level';
import { Vec2 } from './math';
import { Trait } from './traits/Trait';

export type Side = 'top' | 'bottom' | 'left' | 'right';

export class Entity {
  pos: Vec2;
  vel: Vec2;
  size: Vec2;
  offset: Vec2;
  lifetime: number;
  traitProperties: Record<string, Trait>;
  bounds: BoundingBox;
  canCollide: boolean;

  private traits: Trait[];

  constructor() {
    this.pos = new Vec2(0, 0);
    this.vel = new Vec2(0, 0);
    this.size = new Vec2(0, 0);
    this.offset = new Vec2(0, 0);

    this.traits = [];
    this.traitProperties = {};
    this.lifetime = 0;
    this.canCollide = true;

    this.bounds = new BoundingBox(this.pos, this.size, this.offset);
  }

  addTrait<T extends Trait>(trait: T) {
    this.traits.push(trait);
    this.traitProperties[trait.NAME] = trait;
    return trait;
  }

  collides(candidate: Entity) {
    this.traits.forEach((trait) => {
      trait.collides(this, candidate);
    });
  }

  obstruct(side: Side) {
    this.traits.forEach((trait) => {
      trait.obstruct(this, side);
    });
  }

  draw(_context: CanvasRenderingContext2D) {}

  finalize() {
    this.traits.forEach((trait) => trait.finalize());
  }

  update(deltaTime: number, level: Level) {
    this.traits.forEach((trait) => {
      trait.update(this, deltaTime, level);
    });
    this.lifetime += deltaTime;
  }
}
