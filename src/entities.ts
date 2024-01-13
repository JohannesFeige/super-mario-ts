import { Entity } from './Entity';
import { loadGoomba } from './entities/createGoomba';
import { loadKoopa } from './entities/createKoopa';
import { loadMario } from './entities/createMario';

export async function loadEntities() {
  const entityFactories: Record<string, () => Entity> = {};

  function addAs(name: string) {
    return (factory: () => Entity) => (entityFactories[name] = factory);
  }

  await Promise.all([loadMario().then(addAs('mario')), loadGoomba().then(addAs('goomba')), loadKoopa().then(addAs('koopa'))]);
  return entityFactories;
}
