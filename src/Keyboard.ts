export type KeyListener = (keyState: number) => void;

const PRESSED = 1;
const RELEASED = 0;

export class Keyboard {
  keyStates = new Map<string, number>();
  keyMap = new Map<string, KeyListener>();

  addListener(code: string, callback: KeyListener) {
    this.keyMap.set(code, callback);
  }

  listenTo(target: EventTarget) {
    ['keydown', 'keyup'].forEach((eventName) => {
      target.addEventListener(eventName, (event: Event) => {
        this.handleEvent(event as KeyboardEvent);
      });
    });
  }

  private handleEvent(event: KeyboardEvent) {
    if (!this.keyMap.has(event.code)) return;

    event.preventDefault();

    const keyState = event.type === 'keydown' ? PRESSED : RELEASED;

    if (this.keyStates.get(event.code) === keyState) {
      return;
    }

    this.keyStates.set(event.code, keyState);
    this.keyMap.get(event.code)(keyState);
  }
}
