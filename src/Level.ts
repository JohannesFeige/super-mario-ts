import { Compositor } from './Compositor';
import { Entity } from './Entity';
import { TileCollider } from './TileCollider';
import { Matrix } from './math';
import { LevelSpecTile } from './types';

export class Level {
  gravity = 2000;
  totalTime = 0;
  entities = new Set<Entity>();
  comp = new Compositor();
  tiles = new Matrix<LevelSpecTile>();
  tileCollider: TileCollider;

  constructor() {
    this.tileCollider = new TileCollider(this.tiles);
  }

  update(deltaTime: number) {
    this.entities.forEach((entity) => {
      entity.update(deltaTime);

      entity.pos.x += entity.vel.x * deltaTime;
      this.tileCollider.checkX(entity);

      entity.pos.y += entity.vel.y * deltaTime;
      this.tileCollider.checkY(entity);

      entity.vel.y += this.gravity * deltaTime;
    });

    this.totalTime += deltaTime;
  }
}
