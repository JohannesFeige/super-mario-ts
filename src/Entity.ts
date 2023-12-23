import { Trait } from './traits/Trait';
import { Vec2 } from './math';

export class Entity {
  pos: Vec2 = new Vec2(0, 0);
  vel: Vec2 = new Vec2(0, 0);
  private traits: Trait[] = [];

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
