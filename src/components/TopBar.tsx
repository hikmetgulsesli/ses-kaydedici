import { Link } from 'react-router-dom';

interface TopBarProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
}

export function TopBar({ title = 'SES LABORATUVARI', showBack = false, onBack }: TopBarProps) {
  return (
    <header className="bg-[#1C1B1B] flex justify-between items-center w-full px-6 h-16 fixed top-0 z-50">
      <div className="flex items-center gap-3">
        {showBack && (
          <button
            onClick={onBack}
            className="text-[var(--color-on-surface-variant)] hover:text-[var(--color-primary)] transition-all scale-95 active:opacity-80"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
        )}
        <span className="material-symbols-outlined text-[var(--color-primary)]">mic_external_on</span>
        <h1 className="font-headline text-[#fafafa] uppercase tracking-widest text-xl font-bold">{title}</h1>
      </div>
      <div className="flex items-center gap-4">
        <Link to="/settings" className="text-[var(--color-on-surface-variant)] hover:text-[var(--color-primary)] transition-colors scale-95 duration-150">
          <span className="material-symbols-outlined">settings</span>
        </Link>
        <Link to="/list" className="text-[var(--color-on-surface-variant)] hover:text-[var(--color-primary)] transition-colors scale-95 duration-150">
          <span className="material-symbols-outlined">mic_external_on</span>
        </Link>
      </div>
    </header>
  );
}
