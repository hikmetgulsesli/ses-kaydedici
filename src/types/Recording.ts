export interface Recording {
  id?: number;
  name: string;
  blob: Blob;
  duration: number;
  createdAt: Date;
  waveformData: number[];
}

export interface RecordingMetadata {
  id?: number;
  name: string;
  duration: number;
  createdAt: Date;
  waveformData: number[];
  size: number;
}
