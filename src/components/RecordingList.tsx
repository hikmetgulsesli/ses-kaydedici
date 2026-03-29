import { Link } from 'react-router-dom';
import type { Recording } from '../types';

interface RecordingListProps {
  recordings: Recording[];
  onDelete: (id: string) => void;
  onPlay: (id: string) => void;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('tr-TR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(date);
}

export function RecordingList({ recordings, onDelete, onPlay }: RecordingListProps) {
  return (
    <main className="pt-24 pb-32 px-6 max-w-5xl mx-auto">
      {/* Header & Search */}
      <section className="mb-10">
        <h1 className="font-headline text-4xl font-bold tracking-tight mb-6 text-[#fafafa]">
          Tüm Kayıtlar
        </h1>
        <div className="relative group">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <span className="material-symbols-outlined text-[var(--color-on-surface-variant)]">search</span>
          </div>
          <input
            className="w-full bg-[var(--color-surface-container-low)] border-none rounded-xl py-4 pl-12 pr-4 text-[var(--color-on-surface)] placeholder:text-[var(--color-on-surface-variant)] focus:ring-1 focus:ring-[var(--color-primary)]/50 transition-all font-body"
            placeholder="Kayıtlarda ara..."
            type="text"
          />
        </div>
      </section>

      {/* Filters */}
      <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
        <button className="px-5 py-2 rounded-full bg-[var(--color-primary-container)] text-[var(--color-on-primary-container)] font-headline text-sm font-bold flex items-center gap-2 transition-transform active:scale-95">
          <span className="material-symbols-outlined text-sm">calendar_today</span>
          Tarihe Göre
        </button>
        <button className="px-5 py-2 rounded-full bg-[var(--color-surface-container-high)] text-[var(--color-on-surface-variant)] font-headline text-sm font-bold flex items-center gap-2 hover:text-[var(--color-on-surface)] transition-all active:scale-95">
          <span className="material-symbols-outlined text-sm">schedule</span>
          Süreye Göre
        </button>
        <button className="px-5 py-2 rounded-full bg-[var(--color-surface-container-high)] text-[var(--color-on-surface-variant)] font-headline text-sm font-bold flex items-center gap-2 hover:text-[var(--color-on-surface)] transition-all active:scale-95">
          <span className="material-symbols-outlined text-sm">star</span>
          Favoriler
        </button>
      </div>

      {/* Recording List */}
      {recordings.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-48 h-48 rounded-full bg-[var(--color-surface-container-low)] flex items-center justify-center mb-12 border border-[var(--color-outline-variant)]/10">
            <span className="material-symbols-outlined text-8xl text-[var(--color-on-surface-variant)] opacity-40" style={{ fontVariationSettings: "'wght' 100" }}>
              mic
            </span>
          </div>
          <h2 className="font-headline text-3xl font-bold text-[#fafafa] mb-4">
            Henüz Kayıt Yok
          </h2>
          <p className="text-[var(--color-on-surface-variant)] mb-8">
            İlk ses kaydınızı yapmak için kayıt butonuna tıklayın
          </p>
          <Link
            to="/"
            className="px-8 py-4 bg-[var(--color-primary-container)] hover:bg-[var(--color-primary)] transition-all rounded-xl flex items-center gap-3"
          >
            <span className="material-symbols-outlined text-[var(--color-on-primary-container)]">fiber_manual_record</span>
            <span className="font-headline font-bold uppercase tracking-widest text-sm text-[var(--color-on-primary-container)]">
              Kayıt Yap
            </span>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {recordings.map((recording) => (
            <div
              key={recording.id}
              className="group relative flex flex-col md:flex-row items-center gap-6 p-5 rounded-xl bg-[var(--color-surface-container-low)] hover:bg-[var(--color-surface-container-high)] transition-all duration-300 border-l-2 border-transparent hover:border-[var(--color-primary)]"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[var(--color-surface-container-highest)] flex items-center justify-center text-[var(--color-primary)]">
                <span className="material-symbols-outlined">mic_external_on</span>
              </div>
              <div className="flex-grow min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <Link to={`/recording/${recording.id}`} className="font-headline font-bold text-lg truncate pr-4 text-[#fafafa] hover:text-[var(--color-primary)] transition-colors">
                    {recording.name}
                  </Link>
                  <span className="font-headline text-[10px] uppercase font-bold text-[var(--color-on-surface-variant)] tracking-widest">
                    {formatFileSize(recording.size)}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-[var(--color-on-surface-variant)]">
                  <span className="flex items-center gap-1 font-body">
                    <span className="material-symbols-outlined text-xs">event</span>
                    {formatDate(recording.date)}
                  </span>
                  <span className="flex items-center gap-1 font-body">
                    <span className="material-symbols-outlined text-xs">timer</span>
                    {formatDuration(recording.duration)}
                  </span>
                </div>
              </div>

              {/* Waveform Preview */}
              <div className="hidden lg:flex items-end gap-[2px] h-8 w-32 px-4">
                {[3, 5, 4, 7, 6, 4, 5, 2, 4, 6, 3, 5].map((h, i) => (
                  <div
                    key={i}
                    className="w-[3px] rounded-full"
                    style={{
                      height: `${(h / 7) * 100}%`,
                      backgroundColor: i < 4 ? 'var(--color-primary)' : 'var(--color-surface-variant)'
                    }}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2 ml-auto">
                <button
                  onClick={() => onPlay(recording.id)}
                  className="p-2 rounded-full hover:bg-[var(--color-secondary-container)]/20 text-[var(--color-secondary)] transition-colors"
                  title="Oynat"
                >
                  <span className="material-symbols-outlined">play_arrow</span>
                </button>
                <button
                  onClick={() => onDelete(recording.id)}
                  className="p-2 rounded-full hover:bg-[var(--color-error-container)]/20 text-[var(--color-on-surface-variant)] hover:text-[var(--color-error)] transition-colors"
                  title="Sil"
                >
                  <span className="material-symbols-outlined">delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Load More */}
      {recordings.length > 0 && (
        <div className="mt-12 flex justify-center">
          <button className="group flex flex-col items-center gap-2 text-[var(--color-on-surface-variant)] hover:text-[var(--color-primary)] transition-all duration-300">
            <span className="font-headline text-[10px] font-bold tracking-[0.2em] uppercase">Daha Fazla Göster</span>
            <span className="material-symbols-outlined group-hover:translate-y-1 transition-transform">keyboard_arrow_down</span>
          </button>
        </div>
      )}
    </main>
  );
}
