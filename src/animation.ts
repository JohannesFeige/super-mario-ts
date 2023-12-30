import { SpriteName } from './types';

export function createAnimation<T = SpriteName>(frames: T[], frameLen: number) {
  return function resolveFrame(distance: number): T {
    const frameIndex = Math.floor(distance / frameLen) % frames.length;
    const frameName = frames[frameIndex];

    return frameName;
  };
}
