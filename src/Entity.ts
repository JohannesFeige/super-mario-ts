import { Vec2 } from './math';

export class Entity {
  pos: Vec2 = new Vec2(0, 0);
  vel: Vec2 = new Vec2(0, 0);

  update!: (deltaTime: number) => void;
  draw!: (context: CanvasRenderingContext2D) => void;
}
