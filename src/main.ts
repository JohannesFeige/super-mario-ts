import { Compositor } from './Compositor';
import { KeyboardState } from './KeyboardState';
import { Timer } from './Timer';
import { createMario } from './entities';
import { createBackgroundLayer, createSpriteLayer } from './layer';
import { loadLevel } from './loaders';
import { loadBackgroundSprites } from './sprites';

const canvas = document.getElementById('screen') as HTMLCanvasElement;
const context = canvas.getContext('2d');

if (!context) {
  throw 'context not found';
}

Promise.all([createMario(), loadBackgroundSprites(), loadLevel('1-1')]).then(([mario, backgroundSprites, level]) => {
  const compositor = new Compositor();

  const backgroundLayer = createBackgroundLayer(level.backgrounds, backgroundSprites);
  compositor.layers.push(backgroundLayer);

  const gravity = 2000;
  mario.pos.set(64, 180);

  const input = new KeyboardState();
  input.addMapping('Space', (keystate) => {
    if (keystate === 'pressed') {
      mario.jump.start();
    } else {
      mario.jump.cancel();
    }
  });

  input.listenTo(window);

  const spriteLayer = createSpriteLayer(mario);
  compositor.layers.push(spriteLayer);

  const timer = new Timer();
  timer.update = function update(deltaTime) {
    mario.update(deltaTime);

    compositor.draw(context!);
    mario.vel.y += gravity * deltaTime;
  };

  timer.start();
});
