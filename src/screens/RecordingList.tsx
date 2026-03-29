import { Link } from 'react-router-dom';
import BottomNavBar from '../components/BottomNavBar';
import { useRecordings } from '../hooks/useRecordings';

export default function RecordingList() {
  const { recordings, remove } = useRecordings();

  const formatDuration = (seconds: number): string => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const formatDate = (date: Date): string => {
    return new Date(date).toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="min-h-screen bg-background pb-32">
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-6 h-16 bg-surface">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tighter text-on-surface font-headline">Sonic Lab</span>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/studio" className="text-on-surface-variant hover:text-primary transition-colors">
            <span className="material-symbols-outlined">mic</span>
          </Link>
          <Link to="/settings" className="text-on-surface-variant hover:text-primary transition-colors">
            <span className="material-symbols-outlined">settings</span>
          </Link>
        </div>
      </header>

      <main className="pt-24 px-6 max-w-5xl mx-auto">
        <section className="mb-10">
          <h1 className="font-headline text-4xl font-bold tracking-tight mb-6">Tüm Kayıtlar</h1>
          <div className="relative group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-on-surface-variant">search</span>
            </div>
            <input
              className="w-full bg-surface-container-low border-none rounded-xl py-4 pl-12 pr-4 text-on-surface placeholder:text-on-surface-variant focus:ring-1 focus:ring-primary/50 transition-all font-body"
              placeholder="Kayıtlarda ara..."
              type="text"
            />
          </div>
        </section>

        <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
          <button className="px-5 py-2 rounded-full bg-primary-container text-on-primary-container font-headline text-sm font-bold flex items-center gap-2 transition-transform active:scale-95">
            <span className="material-symbols-outlined text-sm">calendar_today</span>
            Tarihe Göre
          </button>
          <button className="px-5 py-2 rounded-full bg-surface-container-high text-on-surface-variant font-headline text-sm font-bold flex items-center gap-2 hover:text-on-surface transition-all active:scale-95">
            <span className="material-symbols-outlined text-sm">schedule</span>
            Süreye Göre
          </button>
          <button className="px-5 py-2 rounded-full bg-surface-container-high text-on-surface-variant font-headline text-sm font-bold flex items-center gap-2 hover:text-on-surface transition-all active:scale-95">
            <span className="material-symbols-outlined text-sm">star</span>
            Favoriler
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {recordings.map((recording) => (
            <div
              key={recording.id}
              className="group relative flex flex-col md:flex-row items-center gap-6 p-5 rounded-xl bg-surface-container-low hover:bg-surface-container-high transition-all duration-300 border-l-2 border-transparent hover:border-primary"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-surface-container-highest flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">mic_external_on</span>
              </div>

              <div className="flex-grow min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <Link to={`/recordings/${recording.id}`} className="font-headline font-bold text-lg truncate pr-4 text-on-surface hover:text-primary transition-colors">
                    {recording.name}
                  </Link>
                  <span className="font-headline text-[10px] uppercase font-bold text-on-surface-variant tracking-widest">
                    {formatSize(recording.size)}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-on-surface-variant">
                  <span className="flex items-center gap-1 font-body">
                    <span className="material-symbols-outlined text-xs">event</span>
                    {formatDate(recording.createdAt)}
                  </span>
                  <span className="flex items-center gap-1 font-body">
                    <span className="material-symbols-outlined text-xs">timer</span>
                    {formatDuration(recording.duration)}
                  </span>
                </div>
              </div>

              <div className="hidden lg:flex items-end gap-[2px] h-8 w-32 px-4">
                {recording.waveformData.slice(0, 12).map((height, i) => (
                  <div
                    key={i}
                    className={`waveform-bar w-1 rounded-full ${i % 3 === 0 ? 'bg-primary' : 'bg-surface-variant'}`}
                    style={{ height: `${Math.max(4, height * 32)}px` }}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2 ml-auto">
                <Link
                  to={`/recordings/${recording.id}`}
                  className="p-2 rounded-full hover:bg-secondary-container/20 text-secondary transition-colors"
                  title="Oynat"
                >
                  <span className="material-symbols-outlined">play_arrow</span>
                </Link>
                <button
                  onClick={() => recording.id && remove(recording.id)}
                  className="p-2 rounded-full hover:bg-error-container/20 text-on-surface-variant hover:text-error transition-colors"
                  title="Sil"
                >
                  <span className="material-symbols-outlined">delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <button className="group flex flex-col items-center gap-2 text-on-surface-variant hover:text-primary transition-all duration-300">
            <span className="font-headline text-[10px] font-bold tracking-[0.2em] uppercase">Daha Fazla Göster</span>
            <span className="material-symbols-outlined group-hover:translate-y-1 transition-transform">keyboard_arrow_down</span>
          </button>
        </div>
      </main>

      <BottomNavBar variant="sonic-lab-alt" />

      <style>{`
        .waveform-bar {
          width: 3px;
          border-radius: 1px;
          background-color: #353534;
        }
        .waveform-bar.active {
          background-color: #4be277;
        }
      `}</style>
    </div>
  );
}
