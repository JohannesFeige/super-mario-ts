import { Camera } from './Camera';
import { Entity } from './Entity';
import { Timer } from './Timer';
import { loadEntities } from './entities';
import { Mario } from './entities/Mario';
import { setupKeyboard } from './input';
import { createCollisionLayer } from './layers/collision';
import { loadFont } from './layers/font';
import { createLevelLoader } from './loaders/level';
import './style.css';
import { PlayerController } from './traits/PlayerController';
import { createDashboardLayer } from './layers/dashboard';

function createPlayerEnv(playerEntity: Entity) {
  const playerEnv = new Entity();
  const playerControler = new PlayerController();
  playerControler.checkpoint.set(64, 64);
  playerControler.setPlayer(playerEntity);
  playerEnv.addTrait(playerControler);

  return playerEnv;
}

const canvas = document.getElementById('screen') as HTMLCanvasElement;
const context = canvas.getContext('2d');

if (!context) {
  throw 'context not found';
}

const [entityFactory, font] = await Promise.all([loadEntities(), loadFont()]);
const level = await createLevelLoader(entityFactory)('1-1');

const camera = new Camera();

const mario = entityFactory.mario() as Mario;

const playerEnv = createPlayerEnv(mario);
level.entities.add(playerEnv);

level.comp.layers.push(createCollisionLayer(level)!);
level.comp.layers.push(createDashboardLayer(font, playerEnv));

const input = setupKeyboard(mario);

input.listenTo(window);

const timer = new Timer();
timer.update = function update(deltaTime) {
  level.update(deltaTime);

  camera.pos.x = Math.max(0, mario.pos.x - 100);

  level.comp.draw(context!, camera);
};

timer.start();
