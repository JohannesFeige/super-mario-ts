import { Entity } from './Entity';
import { loadGoomba } from './entities/createGoomba';
import { loadKoopa } from './entities/createKoopa';
import { loadMario } from './entities/createMario';

export async function loadEntities(audioContext: AudioContext) {
  const entityFactories: Record<string, () => Entity> = {};

  function addAs(name: string) {
    return (factory: () => Entity) => (entityFactories[name] = factory);
  }

  await Promise.all([
    loadMario(audioContext).then(addAs('mario')),
    loadGoomba(audioContext).then(addAs('goomba')),
    loadKoopa(audioContext).then(addAs('koopa')),
  ]);
  return entityFactories;
}
