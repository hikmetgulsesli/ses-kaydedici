import { Link } from 'react-router-dom';

export default function MicrophoneError() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="bg-surface flex justify-between items-center w-full px-6 py-4 z-50">
        <div className="flex items-center gap-4">
          <span className="text-xl font-bold tracking-widest text-on-surface uppercase font-headline">Sonic Lab</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 text-on-surface-variant hover:bg-surface-container-high transition-colors rounded-full">
            <span className="material-symbols-outlined">help</span>
          </button>
          <button className="p-2 text-on-surface-variant hover:bg-surface-container-high transition-colors rounded-full">
            <span className="material-symbols-outlined">settings</span>
          </button>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center px-6 py-12">
        <div className="max-w-xl w-full flex flex-col items-center text-center">
          <div className="relative mb-12">
            <div className="absolute inset-0 bg-error/10 blur-[80px] rounded-full"></div>
            <div className="relative w-32 h-32 md:w-40 md:h-40 bg-surface-container-low flex items-center justify-center border border-outline-variant/15">
              <span className="material-symbols-outlined text-6xl md:text-7xl text-error" style={{ fontVariationSettings: "'wght' 200" }}>warning</span>
              <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-primary/40"></div>
              <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-primary/40"></div>
            </div>
            <div className="absolute -right-12 top-4 hidden md:block">
              <span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant opacity-50 block mb-1">Error Code</span>
              <span className="font-headline text-xs font-bold text-primary">PERM_DENIED_01</span>
            </div>
          </div>

          <h1 className="font-headline text-3xl md:text-4xl font-bold tracking-tight text-on-surface mb-6 max-w-md">
            Mikrofon Erişimi Reddedildi
          </h1>
          <p className="font-body text-on-surface-variant text-base md:text-lg leading-relaxed mb-10 max-w-lg">
            Kayda başlamak için mikrofonunuza erişmemiz gerekiyor. Lütfen tarayıcı ayarlarından mikrofon izni verin veya farklı bir tarayıcı deneyin.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <button
              onClick={() => window.location.reload()}
              className="px-10 py-4 bg-primary-container text-on-primary-container font-headline font-bold uppercase tracking-widest text-sm hover:bg-primary transition-all active:scale-95 flex items-center justify-center gap-2 group shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
            >
              <span>Yeniden Dene</span>
              <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">refresh</span>
            </button>
            <button className="px-10 py-4 bg-surface-container-high text-on-surface font-headline font-bold uppercase tracking-widest text-sm hover:bg-surface-variant transition-all active:scale-95 border border-outline-variant/20">
              Kılavuzu Oku
            </button>
          </div>

          <div className="mt-20 pt-12 border-t border-outline-variant/10 w-full grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-left">
              <span className="font-label text-[10px] uppercase text-on-surface-variant block mb-2">Platform</span>
              <span className="font-headline text-sm text-on-surface">Web Audio API</span>
            </div>
            <div className="text-left">
              <span className="font-label text-[10px] uppercase text-on-surface-variant block mb-2">Status</span>
              <span className="font-headline text-sm text-error">Locked</span>
            </div>
            <div className="text-left">
              <span className="font-label text-[10px] uppercase text-on-surface-variant block mb-2">Input</span>
              <span className="font-headline text-sm text-on-surface">None Detected</span>
            </div>
            <div className="text-left">
              <span className="font-label text-[10px] uppercase text-on-surface-variant block mb-2">Session</span>
              <span className="font-headline text-sm text-on-surface">#SL-4820</span>
            </div>
          </div>
        </div>
      </main>

      <nav className="bg-surface/90 backdrop-blur-xl fixed bottom-0 w-full z-50 flex justify-around items-center px-4 py-3 pb-safe">
        <Link to="/recordings" className="flex flex-col items-center justify-center text-on-surface-variant opacity-60 hover:text-on-surface transition-all">
          <span className="material-symbols-outlined">mic_none</span>
          <span className="font-label text-[10px] uppercase tracking-tighter mt-1">Kayıtlar</span>
        </Link>
        <Link to="/studio" className="flex flex-col items-center justify-center text-primary scale-110 transition-transform hover:text-primary-fixed">
          <span className="material-symbols-outlined">add_circle</span>
          <span className="font-label text-[10px] uppercase tracking-tighter mt-1">Yeni Ses</span>
        </Link>
        <Link to="/" className="flex flex-col items-center justify-center text-on-surface-variant opacity-60 hover:text-on-surface transition-all">
          <span className="material-symbols-outlined">science</span>
          <span className="font-label text-[10px] uppercase tracking-tighter mt-1">Laboratuvar</span>
        </Link>
        <Link to="/settings" className="flex flex-col items-center justify-center text-on-surface-variant opacity-60 hover:text-on-surface transition-all">
          <span className="material-symbols-outlined">person</span>
          <span className="font-label text-[10px] uppercase tracking-tighter mt-1">Profil</span>
        </Link>
      </nav>
    </div>
  );
}
