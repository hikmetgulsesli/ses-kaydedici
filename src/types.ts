export interface Recording {
  id: string;
  name: string;
  duration: number;
  date: Date;
  size: number;
  format: string;
  audioUrl?: string;
}

export interface AppSettings {
  selectedMicrophone: string;
  audioQuality: 'low' | 'medium' | 'high';
  recordingFormat: 'mp3' | 'wav' | 'webm';
}
