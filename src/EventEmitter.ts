import { Entity } from "./Entity";

interface MyEvents {
    ["stomp"]: [us: Entity, them: Entity];
}

export class EventEmitter {
    private listeners: { [K in keyof MyEvents]?: ((...args: MyEvents[K]) => void)[] } = {};

    listen<K extends keyof MyEvents>(name: K, callback: (...args: MyEvents[K]) => void): void {
        if (!this.listeners[name]) {
            this.listeners[name] = [];
        }
        this.listeners[name]!.push(callback);
    }

    emit<K extends keyof MyEvents>(name: K, ...args: MyEvents[K]): void {
        const callbacks = this.listeners[name];
        if (callbacks) {
            callbacks.forEach(callback => callback(...args));
        }
    }
}