import { Camera } from './Camera';
import { Timer } from './Timer';
import { createMario } from './entities';
import { setupKeyboard } from './input';
import { loadLevel } from './loaders';

const canvas = document.getElementById('screen') as HTMLCanvasElement;
const context = canvas.getContext('2d');

if (!context) {
  throw 'context not found';
}

Promise.all([createMario(), loadLevel('1-1')]).then(([mario, level]) => {
  const camera = new Camera();

  mario.pos.set(64, 180);

  level.entities.add(mario);

  const input = setupKeyboard(mario);

  input.listenTo(window);

  const timer = new Timer();
  timer.update = function update(deltaTime) {
    level.update(deltaTime);

    if (mario.pos.x > 100) {
      camera.pos.x = mario.pos.x - 100;
    }

    level.comp.draw(context!, camera);
  };

  timer.start();
});
