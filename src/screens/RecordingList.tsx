import { Link } from 'react-router-dom';
import BottomNavBar from '../components/BottomNavBar';

interface Recording {
  id: number;
  name: string;
  duration: number;
  createdAt: Date;
  size?: number;
}

interface RecordingListProps {
  recordings: Recording[];
  onDelete?: (id: number) => void;
}

export default function RecordingList({ recordings, onDelete }: RecordingListProps) {
  const formatDuration = (seconds: number): string => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('tr-TR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-background pb-32">
      <header className="fixed top-0 left-0 w-full flex justify-between items-center px-6 h-16 bg-surface z-40">
        <h1 className="font-headline text-xl font-bold tracking-tight text-on-surface">Tüm Kayıtlar</h1>
        <button className="text-on-surface-variant hover:text-primary transition-colors">
          <span className="material-symbols-outlined">search</span>
        </button>
      </header>

      <main className="pt-24 px-6 max-w-5xl mx-auto">
        <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
          <button className="px-5 py-2 rounded-full flex items-center gap-2 bg-surface-container-high text-on-surface-variant font-label text-sm">
            <span className="material-symbols-outlined text-sm">calendar_today</span>
            Tarihe Göre
          </button>
          <button className="px-5 py-2 rounded-full flex items-center gap-2 bg-surface-container-high text-on-surface-variant font-label text-sm">
            <span className="material-symbols-outlined text-sm">schedule</span>
            Süreye Göre
          </button>
          <button className="px-5 py-2 rounded-full flex items-center gap-2 bg-surface-container-high text-on-surface-variant font-label text-sm">
            <span className="material-symbols-outlined text-sm">star</span>
            Favoriler
          </button>
        </div>

        {recordings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <span className="material-symbols-outlined text-6xl text-primary/30 mb-4">library_music</span>
            <p className="text-on-surface-variant">Henüz kayıt bulunmuyor</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {recordings.map((recording) => (
              <div
                key={recording.id}
                className="flex items-center gap-4 p-5 rounded-xl bg-surface-container-low border-l-2 border-primary hover:bg-surface-container-high transition-colors cursor-pointer group"
              >
                <div className="flex-1 min-w-0">
                  <h3 className="font-headline font-bold text-on-surface truncate pr-4">{recording.name}</h3>
                  <div className="flex items-center gap-4 text-sm text-on-surface-variant mt-1">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">event</span>
                      {formatDate(recording.createdAt)}
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">timer</span>
                      {formatDuration(recording.duration)}
                    </span>
                  </div>
                </div>

                <div className="hidden lg:flex items-end gap-[2px] h-8 w-32 px-4">
                  {Array.from({ length: 32 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-[3px] rounded-full bg-surface-variant"
                      style={{ height: `${Math.random() * 24 + 8}px` }}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-2 ml-auto">
                  <Link
                    to={`/recordings/${recording.id}`}
                    className="p-2 rounded-full hover:bg-secondary-container/20 transition-colors"
                  >
                    <span className="material-symbols-outlined text-on-surface-variant">play_arrow</span>
                  </Link>
                  <button className="p-2 rounded-full hover:bg-surface-container-highest transition-colors">
                    <span className="material-symbols-outlined text-on-surface-variant">edit</span>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete?.(recording.id);
                    }}
                    className="p-2 rounded-full hover:bg-error-container/20 transition-colors"
                  >
                    <span className="material-symbols-outlined text-error">delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-center mt-12">
          <button className="group flex flex-col items-center gap-2 text-on-surface-variant hover:text-primary transition-colors">
            <span className="material-symbols-outlined">keyboard_arrow_down</span>
            <span className="font-label text-xs uppercase tracking-widest">Daha Fazla Göster</span>
          </button>
        </div>
      </main>

      <BottomNavBar variant="sonic-lab-alt" />
    </div>
  );
}
