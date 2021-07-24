import { createMario } from './entities';
import { Keyboard } from './Keyboard';
import { loadLevel } from './loaders';
import { raise } from './raise';
import { Timer } from './Timer';

async function main(canvas: HTMLCanvasElement) {
  const context = canvas.getContext('2d') || raise('Canvas not supported');

  const [mario, level] = await Promise.all([createMario(), loadLevel('1-1')]);

  const gravity = 2000;
  mario.pos.set(64, 180);

  level.entities.add(mario);

  const SPACE = 'Space';
  const input = new Keyboard();

  input.addListener(SPACE, (keyState) => {
    if (keyState) {
      mario.jump.start();
    } else {
      mario.jump.cancel();
    }
  });

  input.listenTo(window);
  ['mousedown', 'mousemove'].forEach((eventName) => {
    canvas.addEventListener(eventName, (event) => {
      if (event.buttons === 1) {
        mario.vel.set(0, 0);
        mario.pos.set(event.offsetX, event.offsetY);
      }
    });
  });

  const timer = new Timer();

  timer.update = function update(deltaTime) {
    level.update(deltaTime);
    level.comp.draw(context);
    mario.vel.y += gravity * deltaTime;
  };

  timer.start();
}

const canvas = document.getElementById('screen');

if (canvas instanceof HTMLCanvasElement) {
  main(canvas).catch(console.error);
} else {
  console.warn('Canvas not found.');
}
