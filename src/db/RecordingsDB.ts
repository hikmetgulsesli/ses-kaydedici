import Dexie, { type Table } from 'dexie';
import type { Recording } from '../types/Recording';

export class RecordingsDB extends Dexie {
  recordings!: Table<Recording>;

  constructor() {
    super('RecordingsDB');
    this.version(1).stores({
      recordings: '++id, name, duration, createdAt',
    });
  }
}

export const db = new RecordingsDB();
