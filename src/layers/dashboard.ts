import { Entity } from '../Entity';
import { PlayerController } from '../traits/PlayerController';
import { Font } from './font';

export function createDashboardLayer(font: Font, playerEnv: Entity) {
  const LINE1 = font.size;
  const LINE2 = font.size * 2;

  const coins = 13;

  return (context: CanvasRenderingContext2D) => {
    const { time, score } = playerEnv.traitProperties['playerController'] as PlayerController;

    font.print('MARIO', context, 16, LINE1);
    font.print(`${score}`.padStart(6, '0'), context, 16, LINE2);

    font.print('@x' + coins.toString().padStart(2, '0'), context, 96, LINE2);

    font.print('WORLD', context, 152, LINE1);
    font.print('1-1', context, 160, LINE2);

    font.print('TIME', context, 208, LINE1);
    font.print(`${time.toFixed()}`.padStart(3, '0'), context, 216, LINE2);
  };
}
