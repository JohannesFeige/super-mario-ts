import { Compositor } from './Compositor';
import { Entity } from './Entity';
import { TileCollider } from './TileCollider';
import { Matrix } from './math';
import { LevelSpecTile } from './types';

export class Level {
  private gravity: number;
  totalTime: number;
  entities: Set<Entity>;
  comp: Compositor;
  tiles: Matrix<LevelSpecTile>;
  tileCollider: TileCollider;

  constructor() {
    this.gravity = 1500;
    this.totalTime = 0;
    this.entities = new Set<Entity>();
    this.comp = new Compositor();
    this.tiles = new Matrix<LevelSpecTile>();
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
