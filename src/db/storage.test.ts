import { describe, it, expect, beforeEach } from 'vitest';
import { db } from './RecordingsDB';
import {
  generateRecordingName,
  addRecording,
  getRecordings,
  getRecording,
  deleteRecording,
  updateRecording,
} from './storage';

describe('storage', () => {
  beforeEach(async () => {
    await db.recordings.clear();
  });

  describe('generateRecordingName', () => {
    it('should generate name in kayit_YYYY-MM-DD_HH-mm-ss format', () => {
      const name = generateRecordingName();
      expect(name).toMatch(/^kayit_\d{4}-\d{2}-\d{2}_\d{2}-\d{2}-\d{2}$/);
    });

    it('should generate unique names for different times', async () => {
      const name1 = generateRecordingName();
      await new Promise(resolve => setTimeout(resolve, 1100));
      const name2 = generateRecordingName();
      expect(name1).not.toBe(name2);
    });
  });

  describe('addRecording', () => {
    it('should persist Recording object to IndexedDB', async () => {
      const blob = new Blob(['test audio'], { type: 'audio/webm' });
      const id = await addRecording(blob, 30, [0.5, 0.8, 0.3]);

      expect(typeof id).toBe('number');
      const recording = await db.recordings.get(id);
      expect(recording).toBeDefined();
      expect(recording?.duration).toBe(30);
    });

    it('should store blob as Blob type', async () => {
      const blob = new Blob(['test audio data'], { type: 'audio/webm' });
      const id = await addRecording(blob, 60);

      const recording = await db.recordings.get(id);
      expect(recording?.blob).toBeInstanceOf(Blob);
      expect(recording?.blob.size).toBe('test audio data'.length);
    });

    it('should auto-generate recording name', async () => {
      const blob = new Blob(['audio'], { type: 'audio/webm' });
      const id = await addRecording(blob, 10);

      const recording = await db.recordings.get(id);
      expect(recording?.name).toMatch(/^kayit_\d{4}-\d{2}-\d{2}_\d{2}-\d{2}-\d{2}$/);
    });
  });

  describe('getRecordings', () => {
    it('should return all recordings ordered by createdAt desc', async () => {
      const blob = new Blob(['audio'], { type: 'audio/webm' });

      await addRecording(blob, 10);
      await new Promise(resolve => setTimeout(resolve, 50));
      await addRecording(blob, 20);
      await new Promise(resolve => setTimeout(resolve, 50));
      await addRecording(blob, 30);

      const recordings = await getRecordings();
      expect(recordings.length).toBe(3);
      expect(recordings[0].duration).toBe(30);
      expect(recordings[1].duration).toBe(20);
      expect(recordings[2].duration).toBe(10);
    });

    it('should return empty array when no recordings', async () => {
      const recordings = await getRecordings();
      expect(recordings).toEqual([]);
    });
  });

  describe('getRecording', () => {
    it('should return recording by id', async () => {
      const blob = new Blob(['audio'], { type: 'audio/webm' });
      const id = await addRecording(blob, 45);

      const recording = await getRecording(id);
      expect(recording?.duration).toBe(45);
    });

    it('should return undefined for non-existent id', async () => {
      const recording = await getRecording(99999);
      expect(recording).toBeUndefined();
    });
  });

  describe('deleteRecording', () => {
    it('should remove recording from IndexedDB', async () => {
      const blob = new Blob(['audio'], { type: 'audio/webm' });
      const id = await addRecording(blob, 25);

      await deleteRecording(id);

      const recording = await getRecording(id);
      expect(recording).toBeUndefined();
    });
  });

  describe('updateRecording', () => {
    it('should update recording fields', async () => {
      const blob = new Blob(['audio'], { type: 'audio/webm' });
      const id = await addRecording(blob, 15);

      await updateRecording(id, { name: 'updated_name' });

      const recording = await getRecording(id);
      expect(recording?.name).toBe('updated_name');
      expect(recording?.duration).toBe(15);
    });
  });
});
