import { Layer } from './types';

export class Compositor {
  layers: Layer[];
  constructor() {
    this.layers = [];
  }

  draw(context: CanvasRenderingContext2D) {
    this.layers.forEach((layer) => {
      layer(context);
    });
  }
}
