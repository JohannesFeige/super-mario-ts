import { KeyState, KeyboardState } from './KeyboardState';
import { Mario } from './entities/Mario';

export function setupKeyboard(mario: Mario) {
  const input = new KeyboardState();
  input.addMapping('Space', (keystate) => {
    if (keystate === KeyState.Pressed) {
      mario.jump.start();
    } else {
      mario.jump.cancel();
    }
  });

  input.addMapping('ArrowRight', (keystate) => {
    mario.go.dir = keystate;
  });

  input.addMapping('ArrowLeft', (keystate) => {
    mario.go.dir = -keystate;
  });

  return input;
}
