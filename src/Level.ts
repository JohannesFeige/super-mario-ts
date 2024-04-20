import { Compositor } from './Compositor';
import { Entity } from './Entity';
import { EntityCollider } from './EntityCollider';
import { TileCollider } from './TileCollider';
import { Matrix } from './math';
import { TileType } from './types';

export class Level {
  gravity: number;
  totalTime: number;
  entities: Set<Entity>;
  comp: Compositor;

  entityCollider: EntityCollider;
  tileCollider?: TileCollider;

  constructor() {
    this.gravity = 1500;
    this.totalTime = 0;
    this.entities = new Set<Entity>();
    this.comp = new Compositor();
    this.entityCollider = new EntityCollider(this.entities);
  }

  setCollisionGrid(matrix: Matrix<{ type?: TileType }>) {
    this.tileCollider = new TileCollider(matrix);
  }

  update(deltaTime: number) {
    this.entities.forEach((entity) => {
      entity.update(deltaTime, this);
    });

    this.entities.forEach((entity) => {
      this.entityCollider.check(entity);
    });

    this.entities.forEach((entity) => {
      entity.finalize();
    });

    this.totalTime += deltaTime;
  }
}
