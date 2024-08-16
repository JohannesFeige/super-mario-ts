import { AudioBoard } from '../AudioBoard';
import { Entity, Side } from '../Entity';
import { Level } from '../Level';
import { GameContext, Match } from '../types';

export abstract class Trait {
  NAME: string;
  sounds: Set<string>;
  tasks: (() => void)[];
  constructor(name: string) {
    this.NAME = name;
    this.sounds = new Set();
    this.tasks = [];
  }

  finalize() {
    this.tasks.forEach((task) => task());
    this.tasks.length = 0;
  }

  queue(task: () => void) {
    this.tasks.push(task);
  }

  playSounds(audioBoard: AudioBoard, audioContext: AudioContext) {
    this.sounds.forEach((name) => {
      audioBoard.playAudio(name, audioContext);
    });
    this.sounds.clear();
  }

  update(_entity: Entity, _gameContext: GameContext, _level: Level) {}
  obstruct(_entity: Entity, _side: Side, _match: Match) {}
  collides(_us: Entity, _them: Entity) {}
}
