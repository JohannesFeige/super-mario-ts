export enum KeyState {
  Released = 0,
  Pressed = 1,
}

export class KeyboardState {
  // Holds the current state of a given key
  private keyStates: Map<string, any> = new Map();

  // Holds the callback functions for a key code
  private keyMap: Map<string, any> = new Map();

  constructor() {
    this.keyStates = new Map();
    this.keyMap = new Map();
  }

  addMapping(code: string, callback: (keyState: KeyState) => void) {
    this.keyMap.set(code, callback);
  }

  private handleEvent(event: KeyboardEvent) {
    const { code } = event;

    if (!this.keyMap.has(code)) {
      return;
    }

    event.preventDefault();

    const keyState: KeyState = event.type === 'keydown' ? KeyState.Pressed : KeyState.Released;

    if (this.keyStates.get(code) === keyState) {
      return;
    }

    this.keyStates.set(code, keyState);
    this.keyMap.get(code)(keyState);
  }

  listenTo(window: Window) {
    const eventNames = ['keydown', 'keyup'] as const;
    eventNames.forEach((eventName) => {
      window.addEventListener(eventName, (event) => {
        this.handleEvent(event);
      });
    });
  }
}
