import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col overflow-hidden">
      <header className="bg-surface flex justify-between items-center w-full px-6 py-4 fixed top-0 z-50">
        <div className="font-headline tracking-tighter uppercase text-xl font-bold text-on-surface">Sonic Lab</div>
        <div className="flex gap-4 items-center">
          <Link to="/settings" className="text-on-surface-variant hover:text-primary transition-all duration-300">
            <span className="material-symbols-outlined">settings</span>
          </Link>
          <Link to="/settings" className="text-on-surface-variant hover:text-primary transition-all duration-300">
            <span className="material-symbols-outlined">account_circle</span>
          </Link>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center p-6 relative">
        <div className="absolute inset-0 opacity-5 pointer-events-none overflow-hidden flex items-center justify-center">
          <span className="font-headline text-[40rem] font-bold tracking-tighter leading-none select-none">404</span>
        </div>

        <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
          <div className="md:col-span-7 flex flex-col items-center md:items-start text-center md:text-left space-y-6">
            <div className="space-y-2">
              <span className="font-label text-primary tracking-[0.3em] uppercase text-xs font-bold bg-primary/10 px-3 py-1 rounded-sm">Hata Kodu 404</span>
              <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tighter text-on-surface glitch-text leading-tight">
                Sayfa Bulunamadı
              </h1>
            </div>
            <p className="font-body text-lg text-on-surface-variant max-w-md leading-relaxed">
              Aradığınız sayfa mevcut değil veya taşınmış olabilir. Sonic Laboratory koridorlarında kaybolmuş olabilirsiniz.
            </p>
            <div className="pt-4">
              <Link
                to="/"
                className="sonic-gradient text-on-primary-container font-headline font-bold uppercase tracking-widest px-8 py-4 rounded-full flex items-center gap-3 shadow-[0_20_40px_rgba(0,0,0,0.4)] hover:shadow-primary/20 transition-all duration-300 transform hover:-translate-y-1 active:scale-95"
              >
                <span className="material-symbols-outlined">home</span>
                Ana Sayfaya Dön
              </Link>
            </div>
          </div>

          <div className="md:col-span-5 hidden md:flex flex-col items-center justify-center">
            <div className="bg-surface-container-low p-10 rounded-xl relative group">
              <div className="absolute -inset-1 sonic-gradient opacity-10 blur-xl group-hover:opacity-20 transition duration-1000"></div>
              <div className="relative bg-surface-container-lowest p-8 rounded-lg space-y-8 min-w-[300px]">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-error/40"></div>
                  <div className="w-3 h-3 rounded-full bg-primary/40"></div>
                  <div className="w-3 h-3 rounded-full bg-secondary/40"></div>
                </div>
                <div className="h-32 flex items-end justify-between gap-1 overflow-hidden">
                  {[
                    { h: 20, color: '' },
                    { h: 45, color: '' },
                    { h: 30, color: '' },
                    { h: 80, color: 'bg-primary/30' },
                    { h: 60, color: '' },
                    { h: 90, color: 'bg-primary' },
                    { h: 40, color: '' },
                    { h: 75, color: 'bg-primary/50' },
                    { h: 25, color: '' },
                    { h: 55, color: '' },
                    { h: 10, color: '' },
                    { h: 65, color: '' },
                    { h: 35, color: '' },
                  ].map((bar, i) => (
                    <div
                      key={i}
                      className={`waveform-bar h-[${bar.h}%] ${bar.color || 'bg-surface-variant'}`}
                      style={{ height: `${bar.h}%` }}
                    ></div>
                  ))}
                </div>
                <div className="space-y-2">
                  <div className="h-2 w-3/4 bg-surface-variant rounded-full"></div>
                  <div className="h-2 w-1/2 bg-surface-variant/50 rounded-full"></div>
                </div>
                <div className="flex justify-center">
                  <span className="material-symbols-outlined text-surface-variant text-5xl">search_off</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center px-4 pb-6 pt-3 bg-surface/90 backdrop-blur-xl border-t border-outline-variant/15 shadow-[0_-10px_30px_rgba(0,0,0,0.5)] z-50">
        <Link to="/" className="flex flex-col items-center justify-center text-on-surface-variant hover:text-on-surface transition-all">
          <span className="material-symbols-outlined">library_music</span>
          <span className="font-label text-[10px] uppercase font-bold tracking-widest mt-1">Kitaplık</span>
        </Link>
        <Link to="/studio" className="flex flex-col items-center justify-center text-on-surface-variant hover:text-on-surface transition-all">
          <span className="material-symbols-outlined">mic</span>
          <span className="font-label text-[10px] uppercase font-bold tracking-widest mt-1">Kaydet</span>
        </Link>
        <Link to="/" className="flex flex-col items-center justify-center text-on-surface-variant hover:text-on-surface transition-all">
          <span className="material-symbols-outlined">graphic_eq</span>
          <span className="font-label text-[10px] uppercase font-bold tracking-widest mt-1">Düzenle</span>
        </Link>
        <Link to="/settings" className="flex flex-col items-center justify-center text-on-surface-variant hover:text-on-surface transition-all">
          <span className="material-symbols-outlined">person</span>
          <span className="font-label text-[10px] uppercase font-bold tracking-widest mt-1">Profil</span>
        </Link>
      </footer>

      <div className="fixed top-0 left-0 w-full h-1 bg-surface-container-low overflow-hidden pointer-events-none z-[60]">
        <div className="h-full sonic-gradient w-1/3 absolute -left-1/3 animate-[loading_2s_linear_infinite]"></div>
      </div>

      <style>{`
        @keyframes loading {
          0% { transform: translateX(0); }
          100% { transform: translateX(400%); }
        }
        .sonic-gradient {
          background: linear-gradient(135deg, #4BE277 0%, #22C55E 100%);
        }
        .glitch-text {
          text-shadow: 2px 0 #3131C0, -2px 0 #4BE277;
        }
        .waveform-bar {
          width: 4px;
          background-color: #353534;
          border-radius: 2px;
        }
      `}</style>
    </div>
  );
}
