import { Camera } from './Camera';
import { Entity } from './Entity';
import { Timer } from './Timer';
import { loadEntities } from './entities';
import { Mario } from './entities/Mario';
import { setupKeyboard } from './input';
import { createCollisionLayer } from './layers/collision';
import { loadFont } from './layers/font';
import { createLevelLoader } from './loaders/level';
import { PlayerController } from './traits/PlayerController';
import { createDashboardLayer } from './layers/dashboard';
import { GameContext } from './types';
import './style.css';

function createPlayerEnv(playerEntity: Entity) {
  const playerEnv = new Entity();
  const playerControler = new PlayerController();
  playerControler.checkpoint.set(64, 64);
  playerControler.setPlayer(playerEntity);
  playerEnv.addTrait(playerControler);

  return playerEnv;
}

async function main() {
  const canvas = document.getElementById('screen') as HTMLCanvasElement;
  const context = canvas.getContext('2d');

  if (!context) {
    throw 'context not found';
  }

  const audioContext = new AudioContext();

  const [entityFactory, font] = await Promise.all([loadEntities(audioContext), loadFont()]);
  const level = await createLevelLoader(entityFactory)('1-1');

  const camera = new Camera();

  const mario = entityFactory.mario() as Mario;

  const playerEnv = createPlayerEnv(mario);
  level.entities.add(playerEnv);

  level.comp.layers.push(createCollisionLayer(level)!);
  level.comp.layers.push(createDashboardLayer(font, playerEnv));

  const input = setupKeyboard(mario);

  input.listenTo(window);

  const gameContext: GameContext = {
    audioContext,
    deltaTime: 0,
  };

  const timer = new Timer();
  timer.update = function update(deltaTime) {
    gameContext.deltaTime = deltaTime;
    level.update(gameContext);

    camera.pos.x = Math.max(0, mario.pos.x - 100);

    level.comp.draw(context!, camera);
  };

  timer.start();
}

const start = () => {
  window.removeEventListener('click', start);
  main();
};

window.addEventListener('click', start);
