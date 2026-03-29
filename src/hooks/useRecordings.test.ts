import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useRecordings } from './useRecordings';
import * as storage from '../db/storage';
import type { Recording } from '../types/Recording';

vi.mock('../db/storage');

const createMockRecording = (id: number, duration: number): Recording => ({
  id,
  name: `kayit_2026-03-${String(id).padStart(2, '0')}_10-00-00`,
  blob: new Blob(['test'], { type: 'audio/webm' }),
  duration,
  createdAt: new Date(),
  waveformData: [0.5, 0.8],
});

describe('useRecordings', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(storage.getRecordings).mockResolvedValue([]);
    vi.mocked(storage.addRecording).mockResolvedValue(1);
    vi.mocked(storage.deleteRecording).mockResolvedValue();
  });

  it('should provide add/delete/list operations', async () => {
    const mockRecordings = [createMockRecording(1, 30), createMockRecording(2, 45)];
    vi.mocked(storage.getRecordings).mockResolvedValue(mockRecordings);
    vi.mocked(storage.addRecording).mockResolvedValue(3);
    vi.mocked(storage.deleteRecording).mockResolvedValue();

    const { result } = renderHook(() => useRecordings());

    await waitFor(() => {
      expect(result.current.recordings).toHaveLength(2);
    });

    expect(result.current.add).toBeDefined();
    expect(typeof result.current.add).toBe('function');
    expect(result.current.remove).toBeDefined();
    expect(typeof result.current.remove).toBe('function');
    expect(result.current.refresh).toBeDefined();
    expect(typeof result.current.refresh).toBe('function');
    expect(result.current.getById).toBeDefined();
    expect(typeof result.current.getById).toBe('function');
  });

  it('should load recordings on mount', async () => {
    const mockRecordings = [createMockRecording(1, 30)];
    vi.mocked(storage.getRecordings).mockResolvedValue(mockRecordings);

    const { result } = renderHook(() => useRecordings());

    await waitFor(() => {
      expect(storage.getRecordings).toHaveBeenCalled();
    });

    expect(result.current.recordings).toHaveLength(1);
    expect(result.current.isLoading).toBe(false);
  });

  it('should handle add operation', async () => {
    vi.mocked(storage.getRecordings).mockResolvedValue([]);
    vi.mocked(storage.addRecording).mockResolvedValue(1);

    const { result } = renderHook(() => useRecordings());

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    const blob = new Blob(['test'], { type: 'audio/webm' });
    await result.current.add(blob, 30, [0.5]);

    expect(storage.addRecording).toHaveBeenCalledWith(blob, 30, [0.5]);
    expect(storage.getRecordings).toHaveBeenCalledTimes(2);
  });

  it('should handle delete operation', async () => {
    const mockRecordings = [createMockRecording(1, 30)];
    vi.mocked(storage.getRecordings).mockResolvedValue(mockRecordings);
    vi.mocked(storage.deleteRecording).mockResolvedValue();

    const { result } = renderHook(() => useRecordings());

    await waitFor(() => expect(result.current.recordings).toHaveLength(1));

    await result.current.remove(1);

    expect(storage.deleteRecording).toHaveBeenCalledWith(1);
  });

  it('should handle errors', async () => {
    vi.mocked(storage.getRecordings).mockRejectedValue(new Error('DB error'));

    const { result } = renderHook(() => useRecordings());

    await waitFor(() => {
      expect(result.current.error).toBeDefined();
    });

    expect(result.current.error?.message).toBe('Failed to load recordings');
  });

  it('should return correct recordings structure', async () => {
    const mockRecordings = [
      createMockRecording(1, 30),
      createMockRecording(2, 45),
      createMockRecording(3, 60),
    ];
    vi.mocked(storage.getRecordings).mockResolvedValue(mockRecordings);

    const { result } = renderHook(() => useRecordings());

    await waitFor(() => {
      expect(result.current.recordings).toHaveLength(3);
    });

    expect(result.current.recordings[0].id).toBe(1);
    expect(result.current.recordings[0].name).toMatch(/^kayit_/);
    expect(result.current.recordings[0].size).toBeDefined();
    expect(result.current.recordings[0].duration).toBe(30);
  });
});
