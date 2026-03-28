export interface AudioSettings {
  microphoneId: string;
  quality: 'low' | 'medium' | 'high';
  format: string;
}

export const defaultSettings: AudioSettings = {
  microphoneId: '',
  quality: 'high',
  format: 'WebM',
};

const STORAGE_KEY = 'audio-settings';

export function getMimeType(format: string, quality: 'low' | 'medium' | 'high'): string {
  if (format === 'WebM') {
    return quality === 'high' ? 'audio/webm;codecs=opus' : 'audio/webm';
  }
  if (format === 'WAV') return 'audio/wav';
  return 'audio/mp3';
}

export function getAudioSettings(): AudioSettings {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch { /* ignore */ }
  return defaultSettings;
}

export function saveAudioSettings(settings: AudioSettings): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
}

export function getMediaRecorderOptions(settings: AudioSettings): MediaRecorderOptions {
  const mimeType = getMimeType(settings.format, settings.quality);
  const options: MediaRecorderOptions = { mimeType };
  
  if (settings.quality === 'high') {
    options.audioBitsPerSecond = 256000;
  } else if (settings.quality === 'medium') {
    options.audioBitsPerSecond = 128000;
  } else {
    options.audioBitsPerSecond = 64000;
  }
  
  return options;
}
