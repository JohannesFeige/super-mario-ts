import { AudioBoard } from '../AudioBoard';
import { SpriteSheet } from '../SpriteSheet';
import { loadSpriteSheet } from '../loaders';
import { loadAudioBoard } from '../loaders/audio';
import { AnimationName, CharacterName } from '../types';
import { Mario } from './Mario';

export async function loadMario(audioContext: AudioContext) {
  const [sprite, audio] = await Promise.all([loadSpriteSheet('mario'), loadAudioBoard('mario', audioContext)]);
  return createMarioFactory(sprite, audio);
}

function createMarioFactory(sprite: SpriteSheet, audio: AudioBoard) {
  const runAnimation = sprite.animations.get('run')!;
  function routeFrame(mario: Mario): CharacterName | AnimationName {
    if (mario.jump.falling) {
      return 'jump';
    }

    if (mario.go.distance > 0) {
      if (mario.vel.x * mario.go.dir < 0) {
        return 'break';
      }
      return runAnimation(mario.go.distance);
    }

    return 'idle';
  }

  function drawMario(this: Mario, context: CanvasRenderingContext2D) {
    sprite.draw(routeFrame(this), context, 0, 0, this.go.heading < 0);
  }

  return () => {
    const mario = new Mario(audio);
    mario.size.set(14, 16);

    mario.draw = drawMario;

    return mario;
  };
}
