import { db } from './RecordingsDB';
import type { Recording } from '../types/Recording';

export function generateRecordingName(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  return `kayit_${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;
}

export async function addRecording(
  blob: Blob,
  duration: number,
  waveformData: number[] = []
): Promise<number> {
  const recording: Omit<Recording, 'id'> = {
    name: generateRecordingName(),
    blob,
    duration,
    createdAt: new Date(),
    waveformData,
  };
  return await db.recordings.add(recording);
}

export async function getRecordings(): Promise<Recording[]> {
  return await db.recordings.orderBy('createdAt').reverse().toArray();
}

export async function getRecording(id: number): Promise<Recording | undefined> {
  return await db.recordings.get(id);
}

export async function deleteRecording(id: number): Promise<void> {
  await db.recordings.delete(id);
}

export async function updateRecording(
  id: number,
  updates: Partial<Omit<Recording, 'id'>>
): Promise<number> {
  return await db.recordings.update(id, updates);
}
