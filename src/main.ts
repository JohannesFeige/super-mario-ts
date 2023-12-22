import { Compositor } from './Compositor';
import { SpriteSheet } from './SpriteSheet';
import { createBackgroundLayer } from './layer';
import { loadLevel } from './loaders';
import { loadBackgroundSprites, loadMarioSprites } from './sprites';
import { Position } from './types';

const canvas = document.getElementById('screen') as HTMLCanvasElement;
const context = canvas.getContext('2d');

if (!context) {
  throw 'context not found';
}

function createSpriteLayer(sprite: SpriteSheet, pos: Position) {
  return (context: CanvasRenderingContext2D) => {
    sprite.draw('idle', context, pos.x, pos.y);
  };
}

Promise.all([loadMarioSprites(), loadBackgroundSprites(), loadLevel('1-1')]).then(([marioSprite, backgroundSprites, level]) => {
  const compositor = new Compositor();

  const backgroundLayer = createBackgroundLayer(level.backgrounds, backgroundSprites);
  compositor.layers.push(backgroundLayer);

  const pos = {
    x: 64,
    y: 64,
  };

  const spriteLayer = createSpriteLayer(marioSprite, pos);
  compositor.layers.push(spriteLayer);

  function update() {
    compositor.draw(context!);

    pos.x += 2;
    pos.y += 2;

    requestAnimationFrame(update);
  }

  update();
});
