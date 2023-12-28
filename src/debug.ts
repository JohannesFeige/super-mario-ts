import { Camera } from './Camera';
import { Entity } from './Entity';

export function setupMouseControl(canvas: HTMLCanvasElement, entity: Entity, camera: Camera) {
  (['mousedown', 'mousemove'] as const).forEach((eventName) => {
    canvas.addEventListener(eventName, (event) => {
      if (event.buttons === 1) {
        entity.vel.set(0, 0);
        entity.pos.set(event.offsetX + camera.pos.x, event.offsetY + camera.pos.y);
      } else if (event.buttons === 2 && event.type === 'mousemove') {
        camera.pos.x -= event.movementX;
      }
    });
  });

  canvas.addEventListener('contextmenu', (event) => event.preventDefault());
}
