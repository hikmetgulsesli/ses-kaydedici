import { Link } from 'react-router-dom';

export default function EmptyState() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <nav className="fixed top-0 w-full z-50 bg-surface flex justify-between items-center px-6 h-16">
        <div className="text-xl font-bold text-on-surface tracking-tighter font-headline">Sonic Lab</div>
        <div className="flex items-center gap-4">
          <Link to="/settings" className="text-on-surface-variant hover:text-primary transition-colors">
            <span className="material-symbols-outlined">settings</span>
          </Link>
        </div>
      </nav>

      <main className="flex-grow flex flex-col items-center justify-center px-6 pt-16 pb-24 relative overflow-hidden">
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-primary/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 -left-20 w-64 h-64 bg-secondary/5 rounded-full blur-[100px]"></div>

        <div className="relative z-10 flex flex-col items-center max-w-md text-center">
          <div className="mb-12 relative">
            <div className="w-48 h-48 rounded-full bg-surface-container-low flex items-center justify-center mic-shadow border border-outline-variant/10">
              <span className="material-symbols-outlined text-8xl text-on-surface-variant opacity-40" style={{ fontVariationSettings: "'wght' 100" }}>mic</span>
            </div>
            <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-primary-container/10 rounded-full flex items-center justify-center border border-primary/20">
              <span className="material-symbols-outlined text-primary text-xl">add</span>
            </div>
          </div>

          <div className="space-y-4 mb-10">
            <h1 className="font-headline text-3xl md:text-4xl font-bold tracking-tight text-on-surface">
              Henüz Kayıt Yok
            </h1>
            <p className="font-body text-on-surface-variant text-base leading-relaxed max-w-[280px] mx-auto">
              İlk ses kaydınızı yapmak için aşağıdaki butona tıklayın
            </p>
          </div>

          <Link
            to="/studio"
            className="group relative px-8 py-4 bg-primary-container hover:bg-primary transition-all duration-300 rounded-xl shadow-[0_20px_40px_rgba(34,197,94,0.2)] active:scale-95 flex items-center gap-3"
          >
            <span className="material-symbols-outlined text-on-primary-container font-bold">fiber_manual_record</span>
            <span className="font-headline font-bold uppercase tracking-widest text-sm text-on-primary-container">Kayıt Yapmaya Başla</span>
          </Link>

          <div className="mt-16 flex items-center gap-8 opacity-30">
            <div className="flex flex-col items-center">
              <span className="font-label text-[10px] uppercase tracking-tighter text-on-surface-variant">SİNYAL</span>
              <span className="font-headline text-xs font-medium">0.0 DB</span>
            </div>
            <div className="w-[1px] h-4 bg-outline-variant"></div>
            <div className="flex flex-col items-center">
              <span className="font-label text-[10px] uppercase tracking-tighter text-on-surface-variant">FORMAT</span>
              <span className="font-headline text-xs font-medium">WAV 48KHZ</span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-32 left-0 w-full px-12 flex justify-between items-end h-12 gap-1 opacity-10">
          {[2, 4, 3, 6, 8, 5, 3, 7, 4, 2, 5, 3].map((h, i) => (
            <div key={i} className="flex-1 bg-surface-variant h-2 rounded-full" style={{ height: `${h * 2}px` }}></div>
          ))}
        </div>
      </main>

      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-3 bg-surface/60 backdrop-blur-xl shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
        <Link to="/recordings" className="flex flex-col items-center justify-center text-primary bg-primary/10 rounded-xl px-4 py-1">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>library_music</span>
          <span className="font-label text-[10px] uppercase tracking-widest mt-1">Kitaplık</span>
        </Link>
        <Link to="/studio" className="flex flex-col items-center justify-center text-on-surface-variant opacity-60 hover:opacity-100 transition-all">
          <span className="material-symbols-outlined">mic</span>
          <span className="font-label text-[10px] uppercase tracking-widest mt-1">Kaydet</span>
        </Link>
        <Link to="/settings" className="flex flex-col items-center justify-center text-on-surface-variant opacity-60 hover:opacity-100 transition-all">
          <span className="material-symbols-outlined">settings</span>
          <span className="font-label text-[10px] uppercase tracking-widest mt-1">Ayarlar</span>
        </Link>
      </nav>

      <style>{`
        .mic-shadow {
          box-shadow: 0 0 80px 0 rgba(34, 197, 94, 0.05);
        }
      `}</style>
    </div>
  );
}
