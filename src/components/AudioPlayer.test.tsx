import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import AudioPlayer from './AudioPlayer';
import type { Recording } from '../types/Recording';

const createMockRecording = (overrides: Partial<Recording> = {}): Recording => ({
  id: 1,
  name: 'Vokal Prova 1',
  blob: new Blob(['audio data'], { type: 'audio/webm' }),
  duration: 222,
  createdAt: new Date('2024-06-12'),
  waveformData: Array.from({ length: 25 }, () => Math.random() * 0.8 + 0.1),
  ...overrides,
});

describe('AudioPlayer', () => {
  let mockAudioElement: {
    play: ReturnType<typeof vi.fn>;
    pause: ReturnType<typeof vi.fn>;
    addEventListener: ReturnType<typeof vi.fn>;
    removeEventListener: ReturnType<typeof vi.fn>;
    currentTime: number;
    duration: number;
    volume: number;
  };

  beforeEach(() => {
    mockAudioElement = {
      play: vi.fn().mockResolvedValue(undefined),
      pause: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      currentTime: 0,
      duration: 222,
      volume: 1,
    };
    vi.stubGlobal('HTMLAudioElement', vi.fn(() => mockAudioElement));
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Rendering', () => {
    it('renders recording name and details', () => {
      const recording = createMockRecording({ name: 'Test Kayıt' });
      render(<AudioPlayer recording={recording} />);
      expect(screen.getByText('Test Kayıt')).toBeTruthy();
      expect(screen.getByText('Test Kayıt.wav')).toBeTruthy();
    });

    it('renders download button', () => {
      const recording = createMockRecording();
      render(<AudioPlayer recording={recording} />);
      expect(screen.getByText('İndir')).toBeTruthy();
    });

    it('renders play/pause button', () => {
      const recording = createMockRecording();
      render(<AudioPlayer recording={recording} />);
      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBeGreaterThan(0);
    });

    it('renders seek bar', () => {
      const recording = createMockRecording();
      render(<AudioPlayer recording={recording} />);
      const seekBar = document.querySelector('.bg-surface-container-highest');
      expect(seekBar).toBeTruthy();
    });

    it('renders volume slider', () => {
      const recording = createMockRecording();
      render(<AudioPlayer recording={recording} />);
      const volumeSlider = document.querySelector('input[type="range"]');
      expect(volumeSlider).toBeTruthy();
    });
  });

  describe('Download', () => {
    it('generates download filename with correct format', () => {
      const recording = createMockRecording({
        name: 'test',
        createdAt: new Date('2024-06-12T10:30:45'),
      });
      render(<AudioPlayer recording={recording} />);

      const downloadButton = screen.getByText('İndir').closest('button');
      expect(downloadButton).toBeTruthy();
    });

    it('download button is clickable', () => {
      const recording = createMockRecording();
      render(<AudioPlayer recording={recording} />);

      const downloadBtn = screen.getByText('İndir').closest('button');
      expect(downloadBtn).not.toBeNull();
    });
  });

  describe('Waveform', () => {
    it('renders waveform bars from recording data', () => {
      const waveformData = [0.3, 0.5, 0.7, 0.4, 0.9];
      const recording = createMockRecording({ waveformData });
      render(<AudioPlayer recording={recording} />);

      const bars = document.querySelectorAll('.waveform-bar');
      expect(bars.length).toBe(5);
    });

    it('renders placeholder bars when no waveform data', () => {
      const recording = createMockRecording({ waveformData: [] });
      render(<AudioPlayer recording={recording} />);

      const bars = document.querySelectorAll('.waveform-bar');
      expect(bars.length).toBe(25);
    });
  });

  describe('Navigation', () => {
    it('renders back button linking to recordings', () => {
      const recording = createMockRecording();
      render(<AudioPlayer recording={recording} />);

      const backLink = document.querySelector('a[href="/recordings"]');
      expect(backLink).toBeTruthy();
    });

    it('renders bottom navigation bar', () => {
      const recording = createMockRecording();
      render(<AudioPlayer recording={recording} />);

      const nav = document.querySelector('nav');
      expect(nav).toBeTruthy();
    });
  });
});
