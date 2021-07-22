import { Entity } from '../Entity';

export function createSpriteLayer(entity: Entity) {
  return function drawSpriteLayer(context: CanvasRenderingContext2D) {
    entity.draw(context);
  };
}
