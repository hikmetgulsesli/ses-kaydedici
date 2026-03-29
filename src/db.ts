import Dexie, { type Table } from 'dexie';

export interface RecordingRecord {
  id?: number;
  name: string;
  duration: number;
  date: Date;
  size: number;
  format: string;
  audioBlob?: Blob;
}

export class AudioRecorderDB extends Dexie {
  recordings!: Table<RecordingRecord, number>;

  constructor() {
    super('AudioRecorderDB');
    this.version(1).stores({
      recordings: '++id, name, duration, date, size, format'
    });
  }
}

export const db = new AudioRecorderDB();

export async function getAllRecordings(): Promise<RecordingRecord[]> {
  return db.recordings.orderBy('date').reverse().toArray();
}

export async function getRecording(id: number): Promise<RecordingRecord | undefined> {
  return db.recordings.get(id);
}

export async function addRecording(recording: Omit<RecordingRecord, 'id'>): Promise<number> {
  return db.recordings.add(recording as RecordingRecord);
}

export async function deleteRecording(id: number): Promise<void> {
  return db.recordings.delete(id);
}
