type Layer = (context: CanvasRenderingContext2D) => void;

export class Compositor {
  layers: Layer[] = [];

  draw(context: CanvasRenderingContext2D) {
    this.layers.forEach((layer) => {
      layer(context);
    });
  }
}
