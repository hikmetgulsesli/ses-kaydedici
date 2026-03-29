import { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../db/RecordingsDB';
import type { Recording } from '../types/Recording';
import BottomNavBar from '../components/BottomNavBar';

interface RecordingStudioProps {
  onRecordingComplete?: () => void;
}

export default function RecordingStudio({ onRecordingComplete }: RecordingStudioProps) {
  const navigate = useNavigate();
  const [isRecording, setIsRecording] = useState(false);
  const [duration, setDuration] = useState(0);
  const [microphoneStatus, setMicrophoneStatus] = useState<'active' | 'inactive'>('inactive');
  const [signalStrength, setSignalStrength] = useState(4);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationRef = useRef<number | null>(null);

  const formatDuration = (seconds: number): string => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const generateWaveformData = useCallback((length: number = 50): number[] => {
    return Array.from({ length }, () => Math.random() * 0.7 + 0.3);
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const audioContext = new AudioContext();
      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);
      analyserRef.current = analyser;

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const waveformData = generateWaveformData();

        const recording: Omit<Recording, 'id'> = {
          name: `Kayıt ${new Date().toLocaleDateString('tr-TR')}`,
          blob: audioBlob,
          duration: duration,
          createdAt: new Date(),
          waveformData: waveformData,
        };

        try {
          await db.recordings.add(recording);
          onRecordingComplete?.();
          navigate('/recordings');
        } catch (error) {
          console.error('Error saving recording:', error);
        }

        stream.getTracks().forEach(track => track.stop());
        audioContext.close();
      };

      mediaRecorder.start(1000);
      setIsRecording(true);
      setMicrophoneStatus('active');

      timerRef.current = window.setInterval(() => {
        setDuration(prev => prev + 1);
      }, 1000);

      drawWaveform();
    } catch (error) {
      console.error('Error starting recording:', error);
      navigate('/microphone-error');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setMicrophoneStatus('inactive');

      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    }
  };

  const drawWaveform = useCallback(() => {
    const canvas = canvasRef.current;
    const analyser = analyserRef.current;
    if (!canvas || !analyser) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      if (!isRecording) return;
      animationRef.current = requestAnimationFrame(draw);
      analyser.getByteFrequencyData(dataArray);

      ctx.fillStyle = '#131313';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const barWidth = (canvas.width / bufferLength) * 2.5;
      let x = 0;
      for (let i = 0; i < bufferLength; i++) {
        const barHeight = (dataArray[i] / 255) * canvas.height;
        ctx.fillStyle = i % 3 === 0 ? '#4be277' : '#353534';
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
        x += barWidth + 1;
      }

      setSignalStrength(Math.floor(Math.random() * 3) + 3);
    };

    draw();
  }, [isRecording]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  const getWaveformBars = () => {
    const heights = [12, 24, 16, 32, 40, 28, 36, 44, 20, 12, 18, 8, 32, 24, 40, 16];
    return heights.map((h, i) => ({
      height: h,
      bg: i >= 3 && i <= 8 ? 'bg-primary' : 'bg-surface-variant',
    }));
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="bg-surface-container-low flex justify-between items-center w-full px-6 h-16 fixed top-0 z-50">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-primary">mic_external_on</span>
          <h1 className="font-headline text-surface uppercase tracking-widest text-xl font-bold">SES LABORATUVARI</h1>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-on-surface-variant hover:text-primary transition-colors">
            <span className="material-symbols-outlined">settings</span>
          </button>
          <button className="text-on-surface-variant hover:text-primary transition-colors">
            <span className="material-symbols-outlined">mic_external_on</span>
          </button>
        </div>
      </header>

      <main className="flex-1 mt-16 pb-20 flex flex-col items-center justify-between p-8 relative">
        <div className="w-full max-w-4xl flex justify-between items-start pt-10">
          <div className="flex flex-col gap-1">
            <span className="font-label text-[10px] text-on-surface-variant uppercase tracking-widest">Mikrofon Durumu</span>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${microphoneStatus === 'active' ? 'bg-primary shadow-[0_0_10px_rgba(75,226,119,0.5)]' : 'bg-surface-variant'}`}></div>
              <span className="text-on-surface font-medium uppercase">{microphoneStatus === 'active' ? 'AKTİF' : 'İNAKTİF'}</span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1 text-right">
            <span className="font-label text-[10px] text-on-surface-variant uppercase tracking-widest">Sinyal Gücü</span>
            <div className="flex gap-0.5 h-4 items-end">
              {[1, 2, 3, 4, 5].map((level) => (
                <div
                  key={level}
                  className={`w-1 rounded-full ${level <= signalStrength ? 'bg-primary' : 'bg-surface-variant'}`}
                  style={{ height: `${level * 4}px` }}
                ></div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center space-y-2">
          <span className="font-label text-on-surface-variant uppercase tracking-[0.3em] text-xs">Kayıt Süresi</span>
          <h2 className="font-headline text-8xl md:text-[9rem] font-bold tracking-tighter text-surface-container-lowest tabular-nums">
            {formatDuration(duration)}
          </h2>
        </div>

        <div className="w-full max-w-5xl h-48 bg-surface-container-lowest rounded-none flex items-center justify-center gap-1.5 px-8 relative overflow-hidden">
          <canvas ref={canvasRef} width={800} height={192} className="absolute inset-0 w-full h-full" />
          {getWaveformBars().map((bar, i) => (
            <div
              key={i}
              className={`waveform-bar w-1.5 rounded-full ${bar.bg}`}
              style={{ height: `${bar.height}%` }}
            />
          ))}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-primary/30 z-10"></div>
        </div>

        <div className="flex flex-col items-center gap-12 w-full pb-10">
          <div className="flex items-center gap-8 bg-surface-container-high/60 backdrop-blur-xl px-10 py-5 rounded-full shadow-2xl border border-outline-variant/10">
            <button className="text-on-surface-variant hover:text-secondary transition-all active:scale-90">
              <span className="material-symbols-outlined text-3xl">skip_previous</span>
            </button>
            <button className="bg-secondary text-on-secondary w-14 h-14 rounded-full flex items-center justify-center hover:bg-secondary-fixed transition-all active:scale-95 shadow-lg shadow-secondary/20">
              <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
            </button>
            <button className="text-on-surface-variant hover:text-secondary transition-all active:scale-90">
              <span className="material-symbols-outlined text-3xl">skip_next</span>
            </button>
          </div>

          <div className="relative group cursor-pointer">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl group-hover:bg-primary/30 transition-all"></div>
            <button
              onClick={isRecording ? stopRecording : startRecording}
              className={`relative w-28 h-28 rounded-full flex flex-col items-center justify-center gap-1 border-4 border-background transition-all ${
                isRecording ? 'bg-error-container hover:bg-error recording-pulse' : 'bg-primary-container hover:bg-primary'
              }`}
            >
              <span className="material-symbols-outlined text-white text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                {isRecording ? 'stop' : 'fiber_manual_record'}
              </span>
              <span className="font-label text-[10px] text-white font-bold tracking-widest">
                {isRecording ? 'DURDUR' : 'KAYIT'}
              </span>
            </button>
          </div>
        </div>

        <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-4 w-64">
          <div className="bg-surface-container-low p-5 rounded-xl border-l-2 border-primary">
            <h4 className="font-label text-[10px] text-on-surface-variant uppercase tracking-widest mb-3">Format Bilgisi</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-xs text-on-surface-variant">Örnekleme</span>
                <span className="text-xs font-headline">48 KHZ</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-on-surface-variant">Bit Hızı</span>
                <span className="text-xs font-headline">24 BIT</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-on-surface-variant">Kanal</span>
                <span className="text-xs font-headline">STEREO</span>
              </div>
            </div>
          </div>
          <div className="bg-surface-container-low p-5 rounded-xl">
            <h4 className="font-label text-[10px] text-on-surface-variant uppercase tracking-widest mb-3">Cihaz</h4>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-on-surface-variant">settings_input_component</span>
              <span className="text-xs text-on-surface font-medium truncate">Studio Mic Pro-X</span>
            </div>
          </div>
        </div>
      </main>

      <BottomNavBar />

      <style>{`
        @keyframes pulse {
          0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(75, 226, 119, 0.7); }
          70% { transform: scale(1); box-shadow: 0 0 0 20px rgba(75, 226, 119, 0); }
          100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(75, 226, 119, 0); }
        }
        .recording-pulse {
          animation: pulse 2s infinite;
        }
        .waveform-bar {
          transition: height 0.1s ease;
        }
      `}</style>
    </div>
  );
}
