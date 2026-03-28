import { Link } from 'react-router-dom';
import BottomNavBar from '../components/BottomNavBar';

export default function EmptyState() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 pt-16 pb-24 relative overflow-hidden">
      <div className="absolute top-1/4 -right-20 w-96 h-96 rounded-full bg-primary/5 blur-3xl"></div>
      <div className="absolute bottom-1/4 -left-20 w-64 h-64 rounded-full bg-secondary/5 blur-3xl"></div>
      
      <div className="relative z-10 flex flex-col items-center max-w-md text-center">
        <div className="w-32 h-32 rounded-full border-2 border-primary/20 flex items-center justify-center mb-8 relative">
          <div className="absolute -bottom-2 -right-2 w-12 h-12 rounded-full flex items-center justify-center border border-primary/20">
            <span className="material-symbols-outlined text-primary text-xl">mic</span>
          </div>
          <span className="material-symbols-outlined text-primary/20 text-6xl">library_music</span>
        </div>
        
        <h1 className="font-headline text-3xl mb-4 text-on-surface">Henüz Kayıt Yok</h1>
        <p className="text-on-surface-variant mb-10 leading-relaxed">
          Ses kaydetmeye başlamak için aşağıdaki butona tıklayın. İlk kaydınızı oluşturduktan sonra burada görebilirsiniz.
        </p>
        
        <Link
          to="/studio"
          className="group relative px-8 py-4 rounded-xl bg-primary-container text-on-primary-container font-headline text-lg inline-flex items-center gap-2 hover:shadow-[0_0_30px_rgba(34,197,94,0.3)] transition-all"
        >
          <span className="material-symbols-outlined">fiber_manual_record</span>
          Kayıt Yapmaya Başla
        </Link>
        
        <div className="mt-16 flex items-center gap-8">
          <div className="h-4 w-[1px] bg-outline-variant"></div>
          <div className="flex flex-col items-center text-on-surface-variant">
            <span className="material-symbols-outlined text-2xl">mic_external_on</span>
            <span className="text-xs mt-1">HD Ses</span>
          </div>
          <div className="h-4 w-[1px] bg-outline-variant"></div>
          <div className="flex flex-col items-center text-on-surface-variant">
            <span className="material-symbols-outlined text-2xl">cloud_done</span>
            <span className="text-xs mt-1">Yerel Kayıt</span>
          </div>
          <div className="h-4 w-[1px] bg-outline-variant"></div>
        </div>
      </div>
      
      <div className="absolute bottom-32 left-0 w-full px-12 flex justify-between items-end h-12 gap-1">
        <div className="flex gap-[2px]">
          {[20, 35, 50, 40, 60, 75, 55, 45, 30, 25, 45, 65, 50, 40, 30].map((h, i) => (
            <div
              key={i}
              className="w-1.5 rounded-full bg-surface-variant"
              style={{ height: `${h}px` }}
            />
          ))}
        </div>
      </div>
      
      <BottomNavBar />
    </div>
  );
}
