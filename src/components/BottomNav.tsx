import { Link, useLocation } from 'react-router-dom';

export function BottomNav() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-[var(--color-background)]/60 backdrop-blur-xl flex justify-around items-center h-20 px-4 pb-4 fixed bottom-0 w-full z-50 shadow-[0_-10px_30px_rgba(0,0,0,0.4)]">
      <Link
        to="/"
        className={`flex flex-col items-center justify-center px-4 py-1 transition-all active:scale-90 ${
          isActive('/')
            ? 'text-[var(--color-primary)]'
            : 'text-[var(--color-on-surface-variant)] hover:text-[var(--color-on-surface)]'
        }`}
      >
        <span className="material-symbols-outlined">mic</span>
        <span className="font-label text-[10px] font-medium uppercase tracking-widest">Kayıtlar</span>
      </Link>
      <Link
        to="/list"
        className={`flex flex-col items-center justify-center px-4 py-1 transition-all active:scale-90 ${
          isActive('/list')
            ? 'text-[var(--color-primary)]'
            : 'text-[var(--color-on-surface-variant)] hover:text-[var(--color-on-surface)]'
        }`}
      >
        <span className="material-symbols-outlined">library_music</span>
        <span className="font-label text-[10px] font-medium uppercase tracking-widest">Kitaplık</span>
      </Link>
      <Link
        to="/settings"
        className={`flex flex-col items-center justify-center px-4 py-1 transition-all active:scale-90 ${
          isActive('/settings')
            ? 'text-[var(--color-primary)]'
            : 'text-[var(--color-on-surface-variant)] hover:text-[var(--color-on-surface)]'
        }`}
      >
        <span className="material-symbols-outlined">settings</span>
        <span className="font-label text-[10px] font-medium uppercase tracking-widest">Ayarlar</span>
      </Link>
    </nav>
  );
}
