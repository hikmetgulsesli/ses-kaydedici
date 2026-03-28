import { useRef, useState, useEffect, useCallback } from 'react';
import type { Recording } from '../types/Recording';

interface AudioPlayerProps {
  recording: Recording;
  onDelete?: (id: number) => void;
}

export default function AudioPlayer({ recording, onDelete }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(recording.duration);
  const [volume, setVolume] = useState(1);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  useEffect(() => {
    if (recording.blob) {
      const url = URL.createObjectURL(recording.blob);
      setAudioUrl(url);
      return () => URL.revokeObjectURL(url);
    }
    return undefined;
  }, [recording.blob]);

  const formatTime = (seconds: number): string => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    if (h > 0) {
      return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const formatDate = (date: Date): string => {
    return new Date(date).toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).toUpperCase();
  };

  const formatSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  const handleTimeUpdate = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      setCurrentTime(audio.currentTime);
    }
  }, []);

  const handleLoadedMetadata = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      setDuration(audio.duration || recording.duration);
    }
  }, [recording.duration]);

  const handleSeek = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = x / rect.width;
    audio.currentTime = percent * duration;
    setCurrentTime(percent * duration);
  }, [duration]);

  const handleVolumeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setVolume(value);
    if (audioRef.current) {
      audioRef.current.volume = value;
    }
  }, []);

  const handleDownload = useCallback(() => {
    if (!recording.blob) return;
    const date = new Date(recording.createdAt);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const filename = `kayit_${year}-${month}-${day}_${hours}-${minutes}-${seconds}.webm`;
    const url = URL.createObjectURL(recording.blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [recording]);

  const handleDelete = useCallback(() => {
    if (!recording.id || !onDelete) return;
    if (confirm('Bu kaydı silmek istediğinize emin misiniz?')) {
      onDelete(recording.id);
    }
  }, [recording.id, onDelete]);

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  const waveformBarCount = recording.waveformData?.length || 50;
  const activeBarIndex = Math.floor((progress / 100) * waveformBarCount);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {audioUrl ? (
        <audio
          ref={audioRef}
          src={audioUrl}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => setIsPlaying(false)}
        />
      ) : null}

      <header className="bg-surface-container-low sticky top-0 z-50 flex justify-between items-center w-full px-6 py-4">
        <div className="flex items-center gap-4">
          <a href="/recordings" className="text-primary hover:text-primary-fixed transition-all">
            <span className="material-symbols-outlined">arrow_back</span>
          </a>
          <h1 className="font-headline font-bold uppercase tracking-wider text-xs text-on-surface">{recording.name}</h1>
        </div>
        <div className="flex items-center gap-4">
          <a href="/settings" className="text-on-surface-variant hover:text-primary transition-all">
            <span className="material-symbols-outlined">settings</span>
          </a>
        </div>
      </header>

      <main className="min-h-screen pb-32 pt-6 px-6 max-w-4xl mx-auto flex flex-col gap-10">
        <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-1">
            <span className="font-label text-[10px] text-on-surface-variant uppercase tracking-widest">Kayıt Detayları</span>
            <h2 className="font-headline text-3xl font-bold text-[#fafafa] tracking-tighter">{recording.name}.wav</h2>
          </div>
          <div className="flex gap-8">
            <div className="flex flex-col">
              <span className="font-label text-[10px] text-on-surface-variant uppercase">Dosya Boyutu</span>
              <span className="font-headline text-sm font-semibold text-secondary">{formatSize(recording.blob.size)}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-label text-[10px] text-on-surface-variant uppercase">Tarih</span>
              <span className="font-headline text-sm font-semibold text-secondary">{formatDate(recording.createdAt)}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-label text-[10px] text-on-surface-variant uppercase">Örnekleme</span>
              <span className="font-headline text-sm font-semibold text-secondary">48 KHZ</span>
            </div>
          </div>
        </section>

        <section className="bg-surface-container-low rounded-xl p-8 min-h-[300px] flex flex-col items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #3d4a3d 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>

          <div className="w-full flex items-end justify-center gap-[2px] h-48 mb-8">
            {recording.waveformData && recording.waveformData.length > 0 ? (
              recording.waveformData.map((height: number, i: number) => (
                <div
                  key={i}
                  className={`waveform-bar w-1.5 rounded-full ${i <= activeBarIndex ? 'bg-secondary' : 'bg-secondary/30'}`}
                  style={{ height: `${Math.max(10, height * 100)}%` }}
                />
              ))
            ) : (
              Array.from({ length: 25 }).map((_, i: number) => (
                <div
                  key={i}
                  className="waveform-bar w-1.5 bg-secondary/30 rounded-full h-[40%]"
                />
              ))
            )}
          </div>

          <div className="flex flex-col items-center">
            <div className="font-headline text-6xl font-medium tracking-tighter text-[#fafafa]">
              {formatTime(currentTime)}<span className="text-secondary/50"> / {formatTime(duration)}</span>
            </div>
          </div>
        </section>

        <section className="space-y-8">
          <div
            className="relative w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden cursor-pointer"
            onClick={handleSeek}
          >
            <div className="absolute top-0 left-0 h-full bg-secondary-container" style={{ width: `${progress}%` }}></div>
            <div
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-secondary rounded-full shadow-lg border-2 border-background"
              style={{ left: `calc(${progress}% - 8px)` }}
            ></div>
          </div>

          <div className="flex items-center justify-center gap-12">
            <button className="text-on-surface-variant hover:text-secondary transition-colors">
              <span className="material-symbols-outlined text-3xl">fast_rewind</span>
            </button>
            <button
              onClick={togglePlay}
              className="w-20 h-20 rounded-full bg-secondary-container flex items-center justify-center text-on-surface hover:scale-105 transition-all shadow-2xl"
            >
              <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                {isPlaying ? 'pause' : 'play_arrow'}
              </span>
            </button>
            <button className="text-on-surface-variant hover:text-secondary transition-colors">
              <span className="material-symbols-outlined text-3xl">fast_forward</span>
            </button>
          </div>

          <div className="flex items-center justify-center gap-4">
            <span className="material-symbols-outlined text-on-surface-variant text-xl">volume_down</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-32 h-1.5 bg-surface-container-highest rounded-full appearance-none cursor-pointer accent-secondary"
            />
            <span className="material-symbols-outlined text-on-surface-variant text-xl">volume_up</span>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={handleDownload}
            className="flex items-center justify-center gap-3 bg-surface-container-high hover:bg-surface-container-highest p-4 rounded-xl transition-all group"
          >
            <span className="material-symbols-outlined text-secondary group-hover:scale-110 transition-transform">download</span>
            <span className="font-headline text-sm font-medium uppercase tracking-wider">İndir</span>
          </button>
          <button className="flex items-center justify-center gap-3 bg-surface-container-high hover:bg-surface-container-highest p-4 rounded-xl transition-all group">
            <span className="material-symbols-outlined text-secondary group-hover:scale-110 transition-transform">share</span>
            <span className="font-headline text-sm font-medium uppercase tracking-wider">Paylaş</span>
          </button>
          {recording.id && onDelete ? (
            <button
              onClick={handleDelete}
              className="flex items-center justify-center gap-3 bg-surface-container-high hover:bg-error-container p-4 rounded-xl transition-all group"
            >
              <span className="material-symbols-outlined text-on-surface-variant group-hover:text-error group-hover:scale-110 transition-all">delete</span>
              <span className="font-headline text-sm font-medium uppercase tracking-wider">Sil</span>
            </button>
          ) : null}
        </section>
      </main>

      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-3 bg-[#1C1B1B]/60 backdrop-blur-xl shadow-[0_-10px_40px_rgba(0,0,0,0.4)]">
        <a className="flex flex-col items-center justify-center text-primary bg-[#22c55e]/10 rounded-xl px-3 py-1 transition-all duration-300 ease-in-out" href="/recordings">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>mic_external_on</span>
          <span className="font-space-grotesk text-[10px] font-medium uppercase mt-1">Kayitlar</span>
        </a>
        <a className="flex flex-col items-center justify-center text-on-surface-variant opacity-60 hover:opacity-100 hover:text-secondary transition-all duration-300 ease-in-out" href="/">
          <span className="material-symbols-outlined">add_circle</span>
          <span className="font-space-grotesk text-[10px] font-medium uppercase mt-1">Yeni Kayit</span>
        </a>
        <a className="flex flex-col items-center justify-center text-on-surface-variant opacity-60 hover:opacity-100 hover:text-secondary transition-all duration-300 ease-in-out" href="#">
          <span className="material-symbols-outlined">grade</span>
          <span className="font-space-grotesk text-[10px] font-medium uppercase mt-1">Favoriler</span>
        </a>
        <a className="flex flex-col items-center justify-center text-on-surface-variant opacity-60 hover:opacity-100 hover:text-secondary transition-all duration-300 ease-in-out" href="/settings">
          <span className="material-symbols-outlined">settings</span>
          <span className="font-space-grotesk text-[10px] font-medium uppercase mt-1">Ayarlar</span>
        </a>
      </nav>

      <style>{`
        .waveform-bar {
          transition: height 0.2s ease-in-out;
        }
      `}</style>
    </div>
  );
}
