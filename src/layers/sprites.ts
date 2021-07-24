import { Entity } from '../Entity';

export function createSpriteLayer(entities: Set<Entity>) {
  return function drawSpriteLayer(context: CanvasRenderingContext2D) {
    entities.forEach((entity) => entity.draw(context));
  };
}
