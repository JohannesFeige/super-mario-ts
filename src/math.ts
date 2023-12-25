export class Matrix<T = unknown> {
  grid: T[][] = [];

  get(x: number, y: number) {
    return this.grid[x]?.[y];
  }

  set(x: number, y: number, value: T) {
    if (!this.grid[x]) {
      this.grid[x] = [];
    }

    this.grid[x][y] = value;
  }

  forEach(callback: (value: T, x: number, y: number) => void) {
    this.grid.forEach((column, x) => {
      column.forEach((tile, y) => {
        callback(tile, x, y);
      });
    });
  }
}

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
