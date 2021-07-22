import { Compositor } from './Compositor';
import { createMario } from './entities';
import { createBackgroundLayer } from './layers/background';
import { createSpriteLayer } from './layers/sprites';
import { loadLevel } from './loaders';
import { loadBackgroundSprites } from './loaders/sprite';
import { raise } from './raise';
import { Timer } from './Timer';

async function main(canvas: HTMLCanvasElement) {
  const context = canvas.getContext('2d') || raise('Canvas not supported');

  const [mario, backgroundSprites, level] = await Promise.all([
    createMario(),
    loadBackgroundSprites(),
    loadLevel('1-1')
  ]);

  const comp = new Compositor();

  const backgroundLayer = createBackgroundLayer(
    level.backgrounds,
    backgroundSprites
  );
  // comp.layers.push(backgroundLayer);

  const spriteLayer = createSpriteLayer(mario);
  comp.layers.push(spriteLayer);

  const gravity = 30;
  mario.pos.set(64, 180);
  mario.vel.set(200, -600);

  const timer = new Timer();

  timer.update = function update(deltaTime) {
    comp.draw(context);
    mario.update(deltaTime);
    console.log(mario.pos);
    mario.vel.y += gravity;
  };

  timer.start();
}

const canvas = document.getElementById('screen');

if (canvas instanceof HTMLCanvasElement) {
  main(canvas).catch(console.error);
} else {
  console.warn('Canvas not found.');
}
