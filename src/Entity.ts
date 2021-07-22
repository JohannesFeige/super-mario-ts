import { Vec2 } from './math';
import { Trait } from './Trait';

export class Entity {
  pos = new Vec2();
  vel = new Vec2();

  traits = [] as Trait[];

  addTrait<T extends Trait>(trait: T) {
    this.traits.push(trait);
    return trait;
  }

  update(deltaTime: number) {
    this.traits.forEach((trait) => {
      trait.update(this, deltaTime);
    });
  }
  draw: (context: CanvasRenderingContext2D) => void;
}
