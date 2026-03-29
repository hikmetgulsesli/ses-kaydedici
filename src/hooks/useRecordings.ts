import { useState, useEffect, useCallback } from 'react';
import type { Recording, RecordingMetadata } from '../types/Recording';
import {
  getRecordings,
  addRecording,
  deleteRecording,
  getRecording,
} from '../db/storage';

export interface UseRecordingsReturn {
  recordings: RecordingMetadata[];
  isLoading: boolean;
  error: Error | null;
  add: (blob: Blob, duration: number, waveformData?: number[]) => Promise<number>;
  remove: (id: number) => Promise<void>;
  refresh: () => Promise<void>;
  getById: (id: number) => Promise<Recording | undefined>;
}

function toMetadata(recording: Recording): RecordingMetadata {
  return {
    id: recording.id,
    name: recording.name,
    duration: recording.duration,
    createdAt: recording.createdAt,
    waveformData: recording.waveformData,
    size: recording.blob.size,
  };
}

export function useRecordings(): UseRecordingsReturn {
  const [recordings, setRecordings] = useState<RecordingMetadata[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const refresh = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getRecordings();
      setRecordings(data.map(toMetadata));
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Kayıtlar yüklenemedi'));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const add = useCallback(async (blob: Blob, duration: number, waveformData: number[] = []): Promise<number> => {
    const id = await addRecording(blob, duration, waveformData);
    await refresh();
    return id;
  }, [refresh]);

  const remove = useCallback(async (id: number): Promise<void> => {
    await deleteRecording(id);
    await refresh();
  }, [refresh]);

  const getById = useCallback(async (id: number): Promise<Recording | undefined> => {
    return await getRecording(id);
  }, []);

  return {
    recordings,
    isLoading,
    error,
    add,
    remove,
    refresh,
    getById,
  };
}
