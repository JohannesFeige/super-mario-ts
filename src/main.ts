import { Camera } from './Camera';
import { Timer } from './Timer';
import { loadEntities } from './entities';
import { Mario } from './entities/Mario';
import { setupKeyboard } from './input';
import { createCollisionLayer } from './layers';
import { createLevelLoader } from './loaders/level';

const canvas = document.getElementById('screen') as HTMLCanvasElement;
const context = canvas.getContext('2d');

if (!context) {
  throw 'context not found';
}

const entityFactory = await loadEntities();
const level = await createLevelLoader(entityFactory)('1-1');

const camera = new Camera();

const mario = entityFactory.mario() as Mario;
mario.pos.set(64, 180);

level.entities.add(mario);

level.comp.layers.push(createCollisionLayer(level)!);

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
