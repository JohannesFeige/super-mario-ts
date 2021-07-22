import { Compositor } from './Compositor';
import { createBackgroundLayer } from './layers/background';
import { loadLevel } from './loaders';
import { loadBackgroundSprites, loadMarioSprite } from './loaders/sprite';
import { raise } from './raise';
import { SpriteSheet } from './SpriteSheet';

function createSpriteLayer(sprite: SpriteSheet, pos: { x: number; y: number }) {
  return function drawSpriteLayer(context: CanvasRenderingContext2D) {
    sprite.draw('idle', context, pos.x, pos.y);
  };
}

async function main(canvas: HTMLCanvasElement) {
  const context = canvas.getContext('2d') || raise('Canvas not supported');

  const [marioSprite, backgroundSprites, level] = await Promise.all([
    loadMarioSprite(),
    loadBackgroundSprites(),
    loadLevel('1-1')
  ]);

  const comp = new Compositor();

  const backgroundLayer = createBackgroundLayer(
    level.backgrounds,
    backgroundSprites
  );
  comp.layers.push(backgroundLayer);

  const pos = {
    x: 0,
    y: 0
  };

  const spriteLayer = createSpriteLayer(marioSprite, pos);
  comp.layers.push(spriteLayer);

  function update() {
    comp.draw(context);
    pos.x += 2;
    pos.y += 2;

    requestAnimationFrame(update);
  }

  update();
}

const canvas = document.getElementById('screen');

if (canvas instanceof HTMLCanvasElement) {
  main(canvas).catch(console.error);
} else {
  console.warn('Canvas not found.');
}
