import { Compositor } from './Compositor';
import { Entity } from './Entity';
import { TileCollider } from './TileCollider';
import { Matrix } from './math';
import { TileType } from './types';

export class Level {
  private gravity: number;
  totalTime: number;
  entities: Set<Entity>;
  comp: Compositor;
  tileCollider?: TileCollider;

  constructor() {
    this.gravity = 1500;
    this.totalTime = 0;
    this.entities = new Set<Entity>();
    this.comp = new Compositor();
  }

  setCollisionGrid(matrix: Matrix<{ type?: TileType }>) {
    this.tileCollider = new TileCollider(matrix);
  }

  update(deltaTime: number) {
    this.entities.forEach((entity) => {
      entity.update(deltaTime);

      entity.pos.x += entity.vel.x * deltaTime;
      this.tileCollider?.checkX(entity);

      entity.pos.y += entity.vel.y * deltaTime;
      this.tileCollider?.checkY(entity);

      entity.vel.y += this.gravity * deltaTime;
    });

    this.totalTime += deltaTime;
  }
}
