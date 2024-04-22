import { Camera } from '../Camera';
import { Entity } from '../Entity';
import { Level } from '../Level';
import { TileCollider } from '../TileCollider';

function createEntityLayer(entities: Set<Entity>) {
  return (context: CanvasRenderingContext2D, camera: Camera) => {
    context.strokeStyle = 'red';
    entities.forEach((entity) => {
      context.beginPath();
      context.rect(entity.bounds.left - camera.pos.x, entity.bounds.top - camera.pos.y, entity.size.x, entity.size.y);
      context.stroke();
    });
  };
}

function createTileCandidateLayer(tileCollider: TileCollider) {
  const resolvedTiles: { x: number; y: number }[] = [];

  const tileResolver = tileCollider.tiles;
  const tileSize = tileResolver.tileSize;

  const getByIndexOriginal = tileResolver.getByIndex;
  tileResolver.getByIndex = function getByIndexSpy(x: number, y: number) {
    resolvedTiles.push({ x, y });
    return getByIndexOriginal.call(tileResolver, x, y);
  };

  return (context: CanvasRenderingContext2D, camera: Camera) => {
    context.strokeStyle = 'blue';

    resolvedTiles.forEach(({ x, y }) => {
      context.beginPath();
      context.rect(x * tileSize - camera.pos.x, y * tileSize - camera.pos.y, tileSize, tileSize);
      context.stroke();
    });

    resolvedTiles.length = 0;
  };
}

export function createCollisionLayer(level: Level) {
  if (!level.tileCollider) {
    return;
  }

  const drawTileCandidate = createTileCandidateLayer(level.tileCollider);
  const drawBoundingBoxes = createEntityLayer(level.entities);

  return (context: CanvasRenderingContext2D, camera: Camera) => {
    drawTileCandidate(context, camera);
    drawBoundingBoxes(context, camera);
  };
}
