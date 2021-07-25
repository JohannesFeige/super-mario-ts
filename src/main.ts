import { createMario } from './entities';
import { setupKeyboard } from './input';
import { loadLevel } from './loaders';
import { raise } from './raise';
import { Timer } from './Timer';

async function main(canvas: HTMLCanvasElement) {
  const context = canvas.getContext('2d') || raise('Canvas not supported');

  const [mario, level] = await Promise.all([createMario(), loadLevel('1-1')]);

  mario.pos.set(74, 180);

  level.entities.add(mario);

  const input = setupKeyboard(mario);

  input.listenTo(window);
  // ['mousedown', 'mousemove'].forEach((eventName) => {
  //   canvas.addEventListener(eventName, (event) => {
  //     if (event.buttons === 1) {
  //       mario.vel.set(0, 0);
  //       mario.pos.set(event.offsetX, event.offsetY);
  //     }
  //   });
  // });

  const timer = new Timer();

  timer.update = function update(deltaTime) {
    level.update(deltaTime);
    level.comp.draw(context);
  };

  timer.start();
}

const canvas = document.getElementById('screen');

if (canvas instanceof HTMLCanvasElement) {
  main(canvas).catch(console.error);
} else {
  console.warn('Canvas not found.');
}
