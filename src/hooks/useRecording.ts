import { useState, useRef, useCallback, useEffect } from 'react';

export type RecordingState = 'idle' | 'recording' | 'paused' | 'stopped';

export interface RecordingResult {
  blob: Blob;
  url: string;
  duration: number;
}

export function useRecording() {
  const [state, setState] = useState<RecordingState>('idle');
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [micPermission, setMicPermission] = useState<'granted' | 'denied' | 'prompt'>('prompt');
  const [signalStrength, setSignalStrength] = useState(0);
  const [isRecordingActive, setIsRecordingActive] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);
  const animationRef = useRef<number | null>(null);
  const getAnalyserDataRef = useRef<() => Uint8Array>(() => new Uint8Array(0));

  const cleanup = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    analyserRef.current = null;
    mediaRecorderRef.current = null;
    setIsRecordingActive(false);
  }, []);

  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  const startRecording = useCallback(async () => {
    try {
      setError(null);
      chunksRef.current = [];

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const audioContext = new AudioContext();
      audioContextRef.current = audioContext;
      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.8;
      source.connect(analyser);
      analyserRef.current = analyser;

      getAnalyserDataRef.current = () => {
        if (!analyserRef.current) return new Uint8Array(0);
        const data = new Uint8Array(analyserRef.current.frequencyBinCount);
        analyserRef.current.getByteFrequencyData(data);
        return data;
      };

      const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        setAudioBlob(blob);
        setAudioUrl(url);
        setState('stopped');
        cleanup();
      };

      mediaRecorder.start(100);
      setState('recording');
      setElapsedSeconds(0);
      setMicPermission('granted');
      setIsRecordingActive(true);

      timerRef.current = window.setInterval(() => {
        setElapsedSeconds(prev => prev + 1);
      }, 1000);

      const updateSignal = () => {
        if (!isRecordingActive) return;
        const data = getAnalyserDataRef.current();
        if (data.length === 0) {
          animationRef.current = requestAnimationFrame(updateSignal);
          return;
        }
        const avg = data.reduce((a, b) => a + b, 0) / data.length;
        const strength = Math.min(4, Math.floor(avg / 40));
        setSignalStrength(strength);
        animationRef.current = requestAnimationFrame(updateSignal);
      };
      animationRef.current = requestAnimationFrame(updateSignal);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Mikrofon erişimi reddedildi';
      setError(msg);
      if (msg.includes('denied') || msg.includes('Permission')) {
        setMicPermission('denied');
      }
      setState('idle');
    }
  }, [cleanup, isRecordingActive]);

  const pauseRecording = useCallback(() => {
    if (mediaRecorderRef.current && state === 'recording') {
      mediaRecorderRef.current.pause();
      setState('paused');
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    }
  }, [state]);

  const resumeRecording = useCallback(() => {
    if (mediaRecorderRef.current && state === 'paused') {
      mediaRecorderRef.current.resume();
      setState('recording');
      timerRef.current = window.setInterval(() => {
        setElapsedSeconds(prev => prev + 1);
      }, 1000);
      setIsRecordingActive(true);
      const updateSignal = () => {
        if (!isRecordingActive) return;
        const data = getAnalyserDataRef.current();
        if (data.length === 0) {
          animationRef.current = requestAnimationFrame(updateSignal);
          return;
        }
        const avg = data.reduce((a, b) => a + b, 0) / data.length;
        const strength = Math.min(4, Math.floor(avg / 40));
        setSignalStrength(strength);
        animationRef.current = requestAnimationFrame(updateSignal);
      };
      animationRef.current = requestAnimationFrame(updateSignal);
    }
  }, [state, isRecordingActive]);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && (state === 'recording' || state === 'paused')) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      setIsRecordingActive(false);
      mediaRecorderRef.current.stop();
    }
  }, [state]);

  const reset = useCallback(() => {
    cleanup();
    setState('idle');
    setElapsedSeconds(0);
    setAudioBlob(null);
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
      setAudioUrl('');
    }
    setError(null);
    setSignalStrength(0);
  }, [cleanup, audioUrl]);

  const formatTime = useCallback((totalSeconds: number) => {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }, []);

  return {
    state,
    elapsedSeconds,
    formattedTime: formatTime(elapsedSeconds),
    audioBlob,
    audioUrl,
    error,
    micPermission,
    signalStrength,
    isRecordingActive,
    analyser: analyserRef,
    startRecording,
    pauseRecording,
    resumeRecording,
    stopRecording,
    reset,
  };
}
