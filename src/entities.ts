import { Mario } from './entities/Mario';
import { loadMarioSprite } from './loaders/sprite';
import { Go } from './traits/Go';
import { Jump } from './traits/Jump';
import { Velocity } from './traits/Velocity';

export async function createMario() {
  const sprite = await loadMarioSprite();

  const mario = new Mario();

  mario.draw = function drawMario(context: CanvasRenderingContext2D) {
    sprite.draw('idle', context, this.pos.x, this.pos.y);
  };

  // mario.addTrait(new Velocity());

  // mario.update = function updateMario(deltaTime: number) {
  //   this.pos.x += this.vel.x * deltaTime;
  //   this.pos.y += this.vel.y * deltaTime;
  // };

  return mario;
}
