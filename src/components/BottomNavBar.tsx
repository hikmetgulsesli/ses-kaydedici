import { Link, useLocation } from 'react-router-dom';

interface NavItem {
  path: string;
  label: string;
  icon: string;
  activeIcon?: string;
}

const navItems: NavItem[] = [
  { path: '/recordings', label: 'Kayıtlar', icon: 'mic', activeIcon: 'mic_external_on' },
  { path: '/studio', label: 'Yeni Kayıt', icon: 'add_circle', activeIcon: 'add_circle' },
  { path: '/settings', label: 'Ayarlar', icon: 'settings' },
];

interface BottomNavBarProps {
  variant?: 'sonic-lab' | 'sonic-lab-alt';
}

export default function BottomNavBar({ variant = 'sonic-lab' }: BottomNavBarProps) {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/recordings') {
      return location.pathname === '/' || location.pathname.startsWith('/recordings');
    }
    return location.pathname === path;
  };

  if (variant === 'sonic-lab-alt') {
    return (
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-3 h-20 bg-[#353534]/60 backdrop-blur-xl shadow-[0_-20px_40px_rgba(0,0,0,0.4)]">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center justify-center transition-all duration-300 ${
              isActive(item.path)
                ? 'text-primary scale-110'
                : 'text-[#BCCBB9] opacity-70 hover:opacity-100'
            }`}
          >
            <span className="material-symbols-outlined mb-1">
              {isActive(item.path) && item.activeIcon ? item.activeIcon : item.icon}
            </span>
            <span className="font-label text-[10px] uppercase tracking-widest">{item.label}</span>
          </Link>
        ))}
      </nav>
    );
  }

  return (
    <nav className="bg-[#131313]/60 backdrop-blur-xl flex justify-around items-center h-20 px-4 pb-4 fixed bottom-0 w-full z-50 shadow-[0_-10px_30px_rgba(0,0,0,0.4)]">
      <Link
        to="/recordings"
        className={`flex flex-col items-center justify-center px-4 py-1 transition-all active:scale-90 ${
          isActive('/recordings') ? 'text-primary' : 'text-[#BCCBB9]'
        }`}
      >
        <span className="material-symbols-outlined">
          {isActive('/recordings') ? 'mic_external_on' : 'mic'}
        </span>
        <span className="font-label text-[10px] uppercase tracking-widest mt-1">Kayıtlar</span>
      </Link>
      <Link
        to="/studio"
        className={`flex flex-col items-center justify-center px-4 py-1 transition-all active:scale-90 ${
          isActive('/studio') ? 'text-primary bg-primary/10 rounded-xl' : 'text-[#BCCBB9]'
        }`}
      >
        <span className="material-symbols-outlined">add_circle</span>
        <span className="font-label text-[10px] uppercase tracking-widest mt-1">Yeni Kayıt</span>
      </Link>
      <Link
        to="/settings"
        className={`flex flex-col items-center justify-center px-4 py-1 transition-all active:scale-90 ${
          isActive('/settings') ? 'text-primary' : 'text-[#BCCBB9]'
        }`}
      >
        <span className="material-symbols-outlined">library_music</span>
        <span className="font-label text-[10px] uppercase tracking-widest mt-1">Kitaplık</span>
      </Link>
      <Link
        to="/settings"
        className={`flex flex-col items-center justify-center px-4 py-1 transition-all active:scale-90 ${
          isActive('/settings') ? 'text-primary' : 'text-[#BCCBB9]'
        }`}
      >
        <span className="material-symbols-outlined">person</span>
        <span className="font-label text-[10px] uppercase tracking-widest mt-1">Profil</span>
      </Link>
    </nav>
  );
}
