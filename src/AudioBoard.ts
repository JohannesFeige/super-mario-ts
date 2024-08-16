export class AudioBoard {
  private buffers: Map<string, AudioBuffer>;

  constructor() {
    this.buffers = new Map();
  }

  addAudio(name: string, buffer: AudioBuffer) {
    this.buffers.set(name, buffer);
  }

  playAudio(name: string, audioContext: AudioContext) {
    const audioSource = audioContext.createBufferSource();
    audioSource.connect(audioContext.destination);

    if (!this.buffers.has(name)) {
      return;
    }

    audioSource.buffer = this.buffers.get(name)!;

    audioSource.start(0);
  }
}
