export class Vec2 {
  x!: number;
  y!: number;

  constructor(x: number = 0, y: number = 0) {
    this.set(x, y);
  }

  set(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}
