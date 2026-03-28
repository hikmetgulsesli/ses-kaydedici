import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
  getAudioSettings,
  saveAudioSettings,
  getMediaRecorderOptions,
  getMimeType,
  defaultSettings,
  type AudioSettings,
} from './audioSettings';

describe('audioSettings utils', () => {
  const TEST_KEY = 'audio-settings';

  beforeEach(() => {
    localStorage.removeItem(TEST_KEY);
  });

  afterEach(() => {
    localStorage.removeItem(TEST_KEY);
  });

  describe('getMimeType', () => {
    it('returns correct mime type for WebM high quality', () => {
      expect(getMimeType('WebM', 'high')).toBe('audio/webm;codecs=opus');
    });

    it('returns correct mime type for WebM medium quality', () => {
      expect(getMimeType('WebM', 'medium')).toBe('audio/webm');
    });

    it('returns correct mime type for WebM low quality', () => {
      expect(getMimeType('WebM', 'low')).toBe('audio/webm');
    });

    it('returns correct mime type for WAV', () => {
      expect(getMimeType('WAV', 'high')).toBe('audio/wav');
    });

    it('returns correct mime type for MP3', () => {
      expect(getMimeType('MP3', 'high')).toBe('audio/mp3');
    });
  });

  describe('getAudioSettings', () => {
    it('returns default settings when nothing is stored', () => {
      const settings = getAudioSettings();
      expect(settings).toEqual(defaultSettings);
    });

    it('returns stored settings when available', () => {
      const stored: AudioSettings = {
        microphoneId: 'device-123',
        quality: 'medium',
        format: 'WAV',
      };
      localStorage.setItem(TEST_KEY, JSON.stringify(stored));
      const settings = getAudioSettings();
      expect(settings).toEqual(stored);
    });

    it('returns default settings when stored data is invalid', () => {
      localStorage.setItem(TEST_KEY, 'invalid-json');
      const settings = getAudioSettings();
      expect(settings).toEqual(defaultSettings);
    });
  });

  describe('saveAudioSettings', () => {
    it('saves settings to localStorage', () => {
      const settings: AudioSettings = {
        microphoneId: 'device-456',
        quality: 'low',
        format: 'MP3',
      };
      saveAudioSettings(settings);
      const stored = JSON.parse(localStorage.getItem(TEST_KEY) || '{}');
      expect(stored).toEqual(settings);
    });
  });

  describe('getMediaRecorderOptions', () => {
    it('returns correct options for high quality', () => {
      const settings: AudioSettings = {
        microphoneId: 'device-123',
        quality: 'high',
        format: 'WebM',
      };
      const options = getMediaRecorderOptions(settings);
      expect(options.mimeType).toBe('audio/webm;codecs=opus');
      expect(options.audioBitsPerSecond).toBe(256000);
    });

    it('returns correct options for medium quality', () => {
      const settings: AudioSettings = {
        microphoneId: 'device-123',
        quality: 'medium',
        format: 'WebM',
      };
      const options = getMediaRecorderOptions(settings);
      expect(options.mimeType).toBe('audio/webm');
      expect(options.audioBitsPerSecond).toBe(128000);
    });

    it('returns correct options for low quality', () => {
      const settings: AudioSettings = {
        microphoneId: 'device-123',
        quality: 'low',
        format: 'WebM',
      };
      const options = getMediaRecorderOptions(settings);
      expect(options.audioBitsPerSecond).toBe(64000);
    });
  });
});
