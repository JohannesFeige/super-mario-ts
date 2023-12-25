import { Timer } from './Timer';
import { createMario } from './entities';
import { setupKeyboard } from './input';
import { createCollisionLayer } from './layer';
import { loadLevel } from './loaders';

const canvas = document.getElementById('screen') as HTMLCanvasElement;
const context = canvas.getContext('2d');

if (!context) {
  throw 'context not found';
}

Promise.all([createMario(), loadLevel('1-1')]).then(([mario, level]) => {
  mario.pos.set(64, 180);

  const collisionLayer = createCollisionLayer(level);

  level.entities.add(mario);

  const input = setupKeyboard(mario);

  input.listenTo(window);

  (['mousedown', 'mousemove'] as const).forEach((eventName) => {
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

    level.comp.draw(context!);

    collisionLayer(context);
  };

  timer.start();
});
