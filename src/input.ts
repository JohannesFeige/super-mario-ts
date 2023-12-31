import { KeyState, KeyboardState } from './KeyboardState';
import { Mario } from './entities/Mario';

export function setupKeyboard(mario: Mario) {
  const input = new KeyboardState();
  input.addMapping('KeyP', (keystate) => {
    if (keystate === KeyState.Pressed) {
      mario.jump.start();
    } else {
      mario.jump.cancel();
    }
  });

  input.addMapping('KeyO', (keystate) => {
    mario.turbo(Boolean(keystate));
  });

  input.addMapping('KeyD', (keystate) => {
    mario.go.dir += keystate ? 1 : -1;
  });

  input.addMapping('KeyA', (keystate) => {
    mario.go.dir += keystate ? -1 : 1;
  });

  return input;
}
