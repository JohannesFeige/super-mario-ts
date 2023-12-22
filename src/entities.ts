import { Entity } from './Entity';
import { loadMarioSprites } from './sprites';

export async function createMario() {
  const sprite = await loadMarioSprites();

  const mario = new Entity();

  mario.draw = function (context) {
    sprite.draw('idle', context, this.pos.x, this.pos.y);
  };

  mario.update = function (deltaTime) {
    this.pos.x += this.vel.x * deltaTime;
    this.pos.y += this.vel.y * deltaTime;
  };
  return mario;
}
