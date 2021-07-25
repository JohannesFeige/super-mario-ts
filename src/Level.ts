import { Compositor } from './Compositor';
import { Entity } from './Entity';
import { Matrix } from './math';
import { TileCollider } from './TileCollider';
import { LevelSpecTile } from './types';

export class Level {
  comp = new Compositor();
  entities = new Set<Entity>();
  tiles = new Matrix<LevelSpecTile>();
  tileCollider: TileCollider;

  gravity = 1500;

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
  }
}
