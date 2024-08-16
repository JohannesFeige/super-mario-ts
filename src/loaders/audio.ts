import { AudioBoard } from '../AudioBoard';
import { loadJSON } from '../loaders';
import { AudioSheetSpec } from '../types';

export async function loadAudioBoard(name: string, audioContext: AudioContext) {
  const loadAudio = createAudioLoader(audioContext);
  const audioBoard = new AudioBoard(audioContext);
  const audioSheet = await loadJSON<AudioSheetSpec>(`/sounds/${name}.json`);

  const jobs = Object.keys(audioSheet.fx).map(async (name) => {
    const { url } = audioSheet.fx[name];
    const buffer = await loadAudio(url);
    audioBoard.addAudio(name, buffer);
  });

  await Promise.all(jobs);
  return audioBoard;
}

export function createAudioLoader(context: AudioContext) {
  return async (fileName: string) => {
    const response = await fetch(`${import.meta.env.BASE_URL}${fileName}`);
    const arrayBuffer = await response.arrayBuffer();
    return context.decodeAudioData(arrayBuffer);
  };
}
