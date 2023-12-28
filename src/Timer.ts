export class Timer {
  private deltaTime = 1 / 60;
  private accumulatedTime = 0;
  private lastTime = 0;

  update!: (deltaTime: number) => void;

  start() {
    this.enqueue();
  }

  private updateProxy = (time: number) => {
    this.accumulatedTime += (time - this.lastTime) / 1000;

    while (this.accumulatedTime > this.deltaTime) {
      this.update(this.deltaTime);
      this.accumulatedTime -= this.deltaTime;
    }

    this.lastTime = time;

    this.enqueue();
  };

  private enqueue() {
    requestAnimationFrame(this.updateProxy);
  }
}
