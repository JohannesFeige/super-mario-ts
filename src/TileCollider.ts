import { Entity } from './Entity';
import { TileResolver, TileResolverMatrix } from './TileResolver';

export class TileCollider {
  tileResolver: TileResolver;

  constructor(tileMatrix: TileResolverMatrix) {
    this.tileResolver = new TileResolver(tileMatrix);
  }

  checkY(entity: Entity) {
    let y: number;
    if (entity.vel.y > 0) {
      y = entity.pos.y + entity.size.y;
    } else if (entity.vel.y < 0) {
      y = entity.pos.y;
    } else {
      return;
    }

    const matches = this.tileResolver.searchByRange(
      entity.pos.x,
      entity.pos.x + entity.size.x,
      y,
      y
    );

    for (const match of matches) {
      if (match.tile.name !== 'ground') {
        return;
      }

      if (entity.vel.y > 0) {
        if (entity.pos.y + entity.size.y > match.y1) {
          entity.pos.y = match.y1 - entity.size.y;
          entity.vel.y = 0;
        }
      } else if (entity.vel.y < 0) {
        if (entity.pos.y < match.y2) {
          entity.pos.y = match.y2;
          entity.vel.y = 0;
        }
      }
    }
  }

  test(entity: Entity) {
    this.checkY(entity);
  }
}
