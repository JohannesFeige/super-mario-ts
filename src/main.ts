import { Camera } from './Camera';
import { Timer } from './Timer';
import { setupMouseControl } from './debug';
import { createMario } from './entities';
import { setupKeyboard } from './input';
// import { createCameraLayer, createCollisionLayer } from './layers';
import { loadLevel } from './loaders';

const canvas = document.getElementById('screen') as HTMLCanvasElement;
const context = canvas.getContext('2d');

if (!context) {
  throw 'context not found';
}

Promise.all([createMario(), loadLevel('1-1')]).then(([mario, level]) => {
  const camera = new Camera();

  //@ts-ignore
  window.camera = camera;

  mario.pos.set(64, 180);

  // level.comp.layers.push(createCollisionLayer(level), createCameraLayer(camera));

  level.entities.add(mario);

  const input = setupKeyboard(mario);

  input.listenTo(window);

  setupMouseControl(canvas, mario, camera);

  const timer = new Timer();
  timer.update = function update(deltaTime) {
    level.update(deltaTime);

    level.comp.draw(context!, camera);
  };

  timer.start();
});
