import { Camera } from './Camera';

type Layer = (context: CanvasRenderingContext2D, camera: Camera) => void;

export class Compositor {
  layers: Layer[] = [];

  draw(context: CanvasRenderingContext2D, camera: Camera) {
    this.layers.forEach((layer) => {
      layer(context, camera);
    });
  }
}
