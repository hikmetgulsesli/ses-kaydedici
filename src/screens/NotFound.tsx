import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="material-symbols-outlined text-[200px] text-primary">library_music</span>
        </div>
      </div>
      
      <div className="relative z-10 max-w-4xl w-full grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
        <div className="md:col-span-3 flex flex-col items-center md:items-start text-center md:text-left">
          <h1 className="font-headline text-5xl mb-6 text-on-surface">Sayfa Bulunamadı</h1>
          <p className="text-on-surface-variant mb-8 text-lg leading-relaxed">
            Aradığınız sayfa mevcut değil veya taşınmış olabilir. Ana sayfaya dönerek aradığınızı bulabilirsiniz.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center md:justify-start">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-primary-container text-on-primary-container font-headline hover:shadow-[0_0_20px_rgba(34,197,94,0.3)] transition-all"
            >
              <span className="material-symbols-outlined">home</span>
              Ana Sayfaya Dön
            </Link>
            <Link
              to="/settings"
              className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-surface-container-high border border-outline-variant/20 font-headline text-on-surface hover:bg-surface-container-highest transition-all"
            >
              <span className="material-symbols-outlined">settings</span>
              Ayarlar
            </Link>
          </div>
        </div>
        
        <div className="md:col-span-2 hidden md:flex flex-col items-center justify-center">
          <div className="bg-surface-container-lowest rounded-lg p-8 space-y-8 min-w-[300px]">
            <div className="flex justify-center gap-3">
              <div className="w-3 h-3 rounded-full bg-primary/40"></div>
              <div className="w-3 h-3 rounded-full bg-secondary/40"></div>
            </div>
            
            <div className="h-32 flex items-end justify-between gap-1 overflow-hidden">
              {[45, 60, 80, 90, 75, 85, 70, 55, 65, 50].map((h, i) => (
                <div
                  key={i}
                  className="w-4 rounded-sm bg-surface-variant"
                  style={{ height: `${h}px` }}
                />
              ))}
            </div>
            
            <div className="h-2 w-1/2 rounded-full bg-surface-variant/50"></div>
            
            <div className="flex justify-center">
              <span className="material-symbols-outlined text-4xl text-primary/30">graphic_eq</span>
            </div>
          </div>
        </div>
      </div>
      
      <footer className="fixed bottom-0 left-0 w-full flex justify-around items-center px-4 pb-6 pt-3 h-20 bg-surface/50 backdrop-blur-xl border-t border-outline-variant/15">
        <Link to="/" className="flex flex-col items-center text-on-surface-variant hover:text-primary transition-colors">
          <span className="material-symbols-outlined">home</span>
          <span className="text-[10px] uppercase tracking-widest mt-1">Ana Sayfa</span>
        </Link>
        <Link to="/recordings" className="flex flex-col items-center text-on-surface-variant hover:text-primary transition-colors">
          <span className="material-symbols-outlined">library_music</span>
          <span className="text-[10px] uppercase tracking-widest mt-1">Kayıtlar</span>
        </Link>
        <Link to="/studio" className="flex flex-col items-center text-on-surface-variant hover:text-primary transition-colors">
          <span className="material-symbols-outlined">mic</span>
          <span className="text-[10px] uppercase tracking-widest mt-1">Kaydet</span>
        </Link>
        <Link to="/settings" className="flex flex-col items-center text-on-surface-variant hover:text-primary transition-colors">
          <span className="material-symbols-outlined">graphic_eq</span>
          <span className="text-[10px] uppercase tracking-widest mt-1">Ayarlar</span>
        </Link>
        <Link to="/profile" className="flex flex-col items-center text-on-surface-variant hover:text-primary transition-colors">
          <span className="material-symbols-outlined">person</span>
          <span className="text-[10px] uppercase tracking-widest mt-1">Profil</span>
        </Link>
      </footer>
      
      <div className="fixed top-0 left-0 w-full h-1 overflow-hidden">
        <div className="h-full bg-gradient-to-r from-primary via-secondary to-primary animate-pulse"></div>
      </div>
    </div>
  );
}
