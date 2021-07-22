import { Vec2 } from './math';

export class Entity {
  pos = new Vec2();
  vel = new Vec2();

  update: (deltaTime: number) => void;
  draw: (context: CanvasRenderingContext2D) => void;
}
