import { Link, useNavigate } from 'react-router-dom';
import type { Recording } from '../types';

interface RecordingDetailProps {
  recording: Recording | null;
  isPlaying: boolean;
  currentTime: number;
  onPlay: () => void;
  onPause: () => void;
  onDelete: () => void;
  onDownload: () => void;
  onSeek: (time: number) => void;
}

function formatDuration(seconds: number): string {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  if (hrs > 0) {
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('tr-TR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(date).toUpperCase();
}

export function RecordingDetail({
  recording,
  isPlaying,
  currentTime,
  onPlay,
  onPause,
  onDelete,
  onDownload,
  onSeek,
}: RecordingDetailProps) {
  const navigate = useNavigate();

  if (!recording) {
    return (
      <main className="min-h-screen pb-32 pt-6 px-6 max-w-4xl mx-auto flex flex-col items-center justify-center">
        <h1 className="font-headline text-3xl font-bold text-[#fafafa]">Kayıt bulunamadı</h1>
        <Link to="/list" className="mt-4 text-[var(--color-primary)] hover:underline">
          Kayıt listesine dön
        </Link>
      </main>
    );
  }

  const progress = recording.duration > 0 ? (currentTime / recording.duration) * 100 : 0;

  return (
    <>
      {/* TopAppBar */}
      <header className="bg-[#1C1B1B] sticky top-0 z-50 flex justify-between items-center w-full px-6 py-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/list')}
            className="text-[var(--color-primary)] hover:text-[var(--color-primary)]/80 transition-all scale-95 active:opacity-80"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="font-headline font-bold uppercase tracking-wider text-xs text-[var(--color-on-surface)]">
            {recording.name}
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/settings" className="text-[var(--color-on-surface-variant)] hover:text-[var(--color-primary)] transition-all scale-95 active:opacity-80">
            <span className="material-symbols-outlined">settings</span>
          </Link>
        </div>
      </header>

      <main className="min-h-screen pb-32 pt-6 px-6 max-w-4xl mx-auto flex flex-col gap-10">
        {/* Metadata Header */}
        <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-1">
            <span className="font-label text-[10px] text-[var(--color-on-surface-variant)] uppercase tracking-widest">
              Kayıt Detayları
            </span>
            <h2 className="font-headline text-3xl font-bold text-[#fafafa] tracking-tighter">
              {recording.name}.{recording.format}
            </h2>
          </div>
          <div className="flex gap-8">
            <div className="flex flex-col">
              <span className="font-label text-[10px] text-[var(--color-on-surface-variant)] uppercase">Dosya Boyutu</span>
              <span className="font-headline text-sm font-semibold text-[var(--color-secondary)]">{formatFileSize(recording.size)}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-label text-[10px] text-[var(--color-on-surface-variant)] uppercase">Tarih</span>
              <span className="font-headline text-sm font-semibold text-[var(--color-secondary)]">{formatDate(recording.date)}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-label text-[10px] text-[var(--color-on-surface-variant)] uppercase">Örnekleme</span>
              <span className="font-headline text-sm font-semibold text-[var(--color-secondary)]">48 KHZ</span>
            </div>
          </div>
        </section>

        {/* Waveform Section */}
        <section className="bg-[var(--color-surface-container-low)] rounded-xl p-8 min-h-[300px] flex flex-col items-center justify-center relative overflow-hidden group">
          {/* Background texture */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, var(--color-outline-variant) 1px, transparent 0)', backgroundSize: '24px 24px' }}
          />

          {/* Waveform */}
          <div className="w-full flex items-end justify-center gap-[2px] h-48 mb-8">
            {[20, 40, 35, 60, 85, 55, 70, 95, 80, 60, 45, 30, 50, 75, 90, 40, 25, 35, 15, 25, 55, 40, 20, 45, 65, 50, 30].map((height, i) => (
              <div
                key={i}
                className="w-1.5 rounded-full"
                style={{
                  height: `${height}%`,
                  backgroundColor: i < Math.floor(progress / 100 * 27)
                    ? 'var(--color-secondary)'
                    : 'var(--color-secondary)/30'
                }}
              />
            ))}
          </div>

          {/* Timecode */}
          <div className="flex flex-col items-center">
            <div className="font-headline text-6xl font-medium tracking-tighter text-[#fafafa]">
              {formatDuration(currentTime)}
              <span className="text-[var(--color-secondary)]/50"> / {formatDuration(recording.duration)}</span>
            </div>
          </div>
        </section>

        {/* Playback Controls */}
        <section className="space-y-8">
          {/* Seek Bar */}
          <div className="relative w-full h-1.5 bg-[var(--color-surface-container-highest)] rounded-full overflow-hidden cursor-pointer"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const percent = x / rect.width;
              onSeek(percent * recording.duration);
            }}
          >
            <div
              className="absolute top-0 left-0 h-full bg-[var(--color-secondary-container)]"
              style={{ width: `${progress}%` }}
            />
            <div
              className="absolute top-1/2 left-[--progress] -translate-y-1/2 w-4 h-4 bg-[var(--color-secondary)] rounded-full shadow-lg border-2 border-[var(--color-background)]"
              style={{ left: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-center gap-12">
            <button className="text-[var(--color-on-surface-variant)] hover:text-[var(--color-secondary)] transition-colors">
              <span className="material-symbols-outlined text-3xl">fast_rewind</span>
            </button>
            <button
              onClick={isPlaying ? onPause : onPlay}
              className="w-20 h-20 rounded-full bg-[var(--color-secondary-container)] flex items-center justify-center text-[var(--color-on-surface)] hover:scale-105 transition-all shadow-2xl"
            >
              <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                {isPlaying ? 'pause' : 'play_arrow'}
              </span>
            </button>
            <button className="text-[var(--color-on-surface-variant)] hover:text-[var(--color-secondary)] transition-colors">
              <span className="material-symbols-outlined text-3xl">fast_forward</span>
            </button>
          </div>
        </section>

        {/* Action Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={onDownload}
            className="flex items-center justify-center gap-3 bg-[var(--color-surface-container-high)] hover:bg-[var(--color-surface-container-highest)] p-4 rounded-xl transition-all group"
          >
            <span className="material-symbols-outlined text-[var(--color-secondary)] group-hover:scale-110 transition-transform">download</span>
            <span className="font-headline text-sm font-medium uppercase tracking-wider text-[var(--color-on-surface)]">İndir</span>
          </button>
          <button className="flex items-center justify-center gap-3 bg-[var(--color-surface-container-high)] hover:bg-[var(--color-surface-container-highest)] p-4 rounded-xl transition-all group">
            <span className="material-symbols-outlined text-[var(--color-secondary)] group-hover:scale-110 transition-transform">share</span>
            <span className="font-headline text-sm font-medium uppercase tracking-wider text-[var(--color-on-surface)]">Paylaş</span>
          </button>
          <button
            onClick={onDelete}
            className="flex items-center justify-center gap-3 bg-[var(--color-surface-container-high)] hover:bg-[var(--color-error-container)] p-4 rounded-xl transition-all group"
          >
            <span className="material-symbols-outlined text-[var(--color-on-surface-variant)] group-hover:text-[var(--color-error)] group-hover:scale-110 transition-all">delete</span>
            <span className="font-headline text-sm font-medium uppercase tracking-wider text-[var(--color-on-surface)] group-hover:text-[var(--color-error)]">Sil</span>
          </button>
        </section>
      </main>
    </>
  );
}
