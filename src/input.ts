import { Mario } from './entities/Mario';
import { Keyboard } from './Keyboard';

export function setupKeyboard(mario: Mario) {
  const input = new Keyboard();

  input.addListener('Space', (keyState) => {
    if (keyState) {
      mario.jump.start();
    } else {
      mario.jump.cancel();
    }
  });

  input.addListener('ArrowRight', (keystate) => {
    mario.go.direction = keystate;
  });

  input.addListener('ArrowLeft', (keystate) => {
    mario.go.direction = -keystate;
  });

  return input;
}
