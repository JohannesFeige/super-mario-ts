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

  constructor() {
    this.tileCollider = new TileCollider(this.tiles);
  }

  update(deltaTime: number) {
    this.entities.forEach((entity) => {
      entity.update(deltaTime);

      this.tileCollider.test(entity);
    });
  }
}
