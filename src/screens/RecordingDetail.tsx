import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import type { RecordingMetadata } from '../types/Recording';
import BottomNavBar from '../components/BottomNavBar';

interface RecordingDetailProps {
  recordings: RecordingMetadata[];
  onDelete: (id: number) => void;
}

export default function RecordingDetail({ recordings, onDelete }: RecordingDetailProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const currentTime = 134;

  const recording = recordings.find(r => r.id === Number(id));

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
    }).toUpperCase();
  };

  const handleDownload = () => {
    if (!recording) return;
    const blob = new Blob(['demo'], { type: 'audio/webm' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${recording.name}.webm`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDelete = () => {
    if (!recording?.id) return;
    if (confirm('Bu kaydı silmek istediğinize emin misiniz?')) {
      onDelete(recording.id);
      navigate('/recordings');
    }
  };

  if (!recording) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-headline text-2xl text-on-surface mb-4">Kayıt bulunamadı</h1>
          <Link to="/recordings" className="text-primary hover:underline">Kayıt listesine dön</Link>
        </div>
      </div>
    );
  }

  const progress = (currentTime / recording.duration) * 100;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="bg-surface-container-low sticky top-0 z-50 flex justify-between items-center w-full px-6 py-4">
        <div className="flex items-center gap-4">
          <Link to="/recordings" className="text-primary hover:text-primary-fixed transition-all">
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <h1 className="font-headline font-bold uppercase tracking-wider text-xs text-on-surface">{recording.name}</h1>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/settings" className="text-on-surface-variant hover:text-primary transition-all">
            <span className="material-symbols-outlined">settings</span>
          </Link>
        </div>
      </header>

      <main className="min-h-screen pb-32 pt-6 px-6 max-w-4xl mx-auto flex flex-col gap-10">
        <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-1">
            <span className="font-label text-label-sm text-on-surface-variant uppercase tracking-widest">Kayıt Detayları</span>
            <h2 className="font-headline text-3xl font-bold text-on-surface tracking-tighter">{recording.name}.wav</h2>
          </div>
          <div className="flex gap-8">
            <div className="flex flex-col">
              <span className="font-label text-[10px] text-on-surface-variant uppercase">Dosya Boyutu</span>
              <span className="font-headline text-sm font-semibold text-secondary">{(recording.size / (1024 * 1024)).toFixed(1)} MB</span>
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
            {recording.waveformData.map((height, i) => (
              <div
                key={i}
                className={`waveform-bar w-1.5 rounded-full ${i >= (progress / 100) * recording.waveformData.length ? 'bg-secondary' : 'bg-secondary/30'}`}
                style={{ height: `${Math.max(10, height * 100)}%` }}
              />
            ))}
          </div>

          <div className="flex flex-col items-center">
            <div className="font-headline text-6xl font-medium tracking-tighter text-on-surface">
              {formatDuration(currentTime)}<span className="text-secondary/50"> / {formatDuration(recording.duration)}</span>
            </div>
          </div>
        </section>

        <section className="space-y-8">
          <div className="relative w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
            <div className="absolute top-0 left-0 h-full bg-secondary-container" style={{ width: `${progress}%` }}></div>
            <div className="absolute top-1/2 left-[60%] -translate-y-1/2 w-4 h-4 bg-secondary rounded-full shadow-lg border-2 border-background"></div>
          </div>

          <div className="flex items-center justify-center gap-12">
            <button className="text-on-surface-variant hover:text-secondary transition-colors">
              <span className="material-symbols-outlined text-3xl">fast_rewind</span>
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
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
          <button
            onClick={handleDelete}
            className="flex items-center justify-center gap-3 bg-surface-container-high hover:bg-error-container p-4 rounded-xl transition-all group"
          >
            <span className="material-symbols-outlined text-on-surface-variant group-hover:text-error group-hover:scale-110 transition-all">delete</span>
            <span className="font-headline text-sm font-medium uppercase tracking-wider">Sil</span>
          </button>
        </section>
      </main>

      <BottomNavBar />

      <style>{`
        .waveform-bar {
          transition: height 0.2s ease-in-out;
        }
      `}</style>
    </div>
  );
}
