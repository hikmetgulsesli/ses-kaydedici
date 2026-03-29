import { Link } from 'react-router-dom';
import type { AppSettings } from '../types';

interface SettingsProps {
  settings: AppSettings;
  onSave: (settings: AppSettings) => void;
}

export function Settings({ settings, onSave }: SettingsProps) {
  return (
    <>
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 bg-[#1C1B1B] flex items-center justify-between w-full px-6 h-16">
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="active:opacity-70 scale-95 transition-all text-[var(--color-on-surface-variant)] hover:text-[var(--color-primary)] transition-colors duration-300"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <h1 className="font-headline tracking-tight text-[#fafafa] uppercase text-sm font-bold">
            Ayarlar
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <button className="active:opacity-70 scale-95 transition-all text-[var(--color-on-surface-variant)] hover:text-[var(--color-primary)] transition-colors duration-300">
            <span className="material-symbols-outlined">help</span>
          </button>
          <button className="active:opacity-70 scale-95 transition-all text-[var(--color-on-surface-variant)] hover:text-[var(--color-primary)] transition-colors duration-300">
            <span className="material-symbols-outlined">more_vert</span>
          </button>
        </div>
      </header>

      <main className="pt-24 px-6 max-w-2xl mx-auto space-y-12 pb-32">
        {/* Section: Ses Ayarları */}
        <section className="space-y-8">
          <header className="flex items-baseline justify-between border-b border-[var(--color-outline-variant)]/15 pb-4">
            <h2 className="font-headline text-2xl font-bold tracking-tight text-[var(--color-on-surface)]">
              Ses Ayarları
            </h2>
            <span className="font-label text-[10px] uppercase tracking-[0.2em] text-[var(--color-on-surface-variant)]">
              Audio Engine v2.4
            </span>
          </header>

          <div className="grid gap-8">
            {/* Mikrofon Seçimi */}
            <div className="group">
              <label className="font-label text-xs uppercase tracking-widest text-[var(--color-on-surface-variant)] mb-3 block">
                Mikrofon Seçimi
              </label>
              <div className="relative">
                <select
                  className="w-full bg-[var(--color-surface-container-low)] border-none rounded-none py-4 px-5 appearance-none font-body text-[var(--color-on-surface)] focus:ring-1 focus:ring-[var(--color-primary-container)]/30 cursor-pointer transition-all"
                  value={settings.selectedMicrophone}
                  onChange={() => {}}
                >
                  <option>Dahili Mikrofon</option>
                  <option selected>Studio Mic Pro-X</option>
                  <option>Virtual Audio Cable</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--color-on-surface-variant)]">
                  <span className="material-symbols-outlined">expand_more</span>
                </div>
              </div>
            </div>

            {/* Bento Style Quality & Format */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Ses Kalitesi */}
              <div className="bg-[var(--color-surface-container-low)] p-6 rounded-none space-y-4">
                <label className="font-label text-xs uppercase tracking-widest text-[var(--color-on-surface-variant)] block">
                  Ses Kalitesi
                </label>
                <div className="flex flex-col gap-2">
                  <button
                    className={`flex items-center justify-between p-3 transition-colors text-[var(--color-on-surface-variant)] ${
                      settings.audioQuality === 'low' ? 'bg-[var(--color-surface)]' : 'bg-[var(--color-surface-container-high)] hover:bg-[var(--color-surface-container-highest)]'
                    }`}
                    onClick={() => onSave({ ...settings, audioQuality: 'low' })}
                  >
                    <span className="text-sm">Düşük</span>
                    <span className="font-label text-[9px]">128 KB/S</span>
                  </button>
                  <button
                    className={`flex items-center justify-between p-3 transition-colors text-[var(--color-on-surface-variant)] ${
                      settings.audioQuality === 'medium' ? 'bg-[var(--color-surface)]' : 'bg-[var(--color-surface-container-high)] hover:bg-[var(--color-surface-container-highest)]'
                    }`}
                    onClick={() => onSave({ ...settings, audioQuality: 'medium' })}
                  >
                    <span className="text-sm">Orta</span>
                    <span className="font-label text-[9px]">256 KB/S</span>
                  </button>
                  <button
                    className={`flex items-center justify-between p-3 transition-colors ${
                      settings.audioQuality === 'high'
                        ? 'bg-[var(--color-surface-container-highest)] border-l-2 border-[var(--color-primary)] text-[var(--color-primary)]'
                        : 'bg-[var(--color-surface-container-high)] hover:bg-[var(--color-surface-container-highest)] text-[var(--color-on-surface-variant)]'
                    }`}
                    onClick={() => onSave({ ...settings, audioQuality: 'high' })}
                  >
                    <span className="text-sm font-medium">Yüksek</span>
                    <span className="font-label text-[9px]">FLAC / 24-BIT</span>
                  </button>
                </div>
              </div>

              {/* Kayıt Formatı */}
              <div className="bg-[var(--color-surface-container-low)] p-6 rounded-none flex flex-col justify-between">
                <div className="space-y-4">
                  <label className="font-label text-xs uppercase tracking-widest text-[var(--color-on-surface-variant)] block">
                    Kayıt Formatı
                  </label>
                  <div className="flex flex-wrap gap-2">
                    <button
                      className={`px-4 py-2 font-label text-[11px] uppercase tracking-wider transition-colors ${
                        settings.recordingFormat === 'mp3'
                          ? 'bg-[var(--color-primary-container)] text-[var(--color-on-primary-container)]'
                          : 'bg-[var(--color-surface)] text-[var(--color-on-surface-variant)]'
                      }`}
                      onClick={() => onSave({ ...settings, recordingFormat: 'mp3' })}
                    >
                      MP3
                    </button>
                    <button
                      className={`px-4 py-2 font-label text-[11px] uppercase tracking-wider transition-colors ${
                        settings.recordingFormat === 'wav'
                          ? 'bg-[var(--color-primary-container)] text-[var(--color-on-primary-container)]'
                          : 'bg-[var(--color-surface)] text-[var(--color-on-surface-variant)]'
                      }`}
                      onClick={() => onSave({ ...settings, recordingFormat: 'wav' })}
                    >
                      WAV
                    </button>
                    <button
                      className={`px-4 py-2 font-label text-[11px] uppercase tracking-wider transition-colors ${
                        settings.recordingFormat === 'webm'
                          ? 'bg-[var(--color-primary-container)] text-[var(--color-on-primary-container)]'
                          : 'bg-[var(--color-surface)] text-[var(--color-on-surface-variant)]'
                      }`}
                      onClick={() => onSave({ ...settings, recordingFormat: 'webm' })}
                    >
                      WebM
                    </button>
                  </div>
                </div>
                <p className="text-[11px] text-[var(--color-on-surface-variant)] leading-relaxed mt-4">
                  WebM formatı, yüksek kaliteli ses verilerini düşük dosya boyutlarında saklamak için optimize edilmiştir.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Görünüm */}
        <section className="space-y-8">
          <header className="flex items-baseline justify-between border-b border-[var(--color-outline-variant)]/15 pb-4">
            <h2 className="font-headline text-2xl font-bold tracking-tight text-[var(--color-on-surface)]">
              Görünüm
            </h2>
            <span className="font-label text-[10px] uppercase tracking-[0.2em] text-[var(--color-on-surface-variant)]">
              Arayüz Özelleştirme
            </span>
          </header>

          <div className="grid grid-cols-2 gap-4">
            {/* Theme Option: Dark */}
            <div className="relative group cursor-pointer border-2 border-[var(--color-primary)] p-1 bg-[var(--color-surface-container-low)]">
              <div className="h-24 bg-[var(--color-surface-container-lowest)] mb-3 relative overflow-hidden">
                <div className="absolute top-2 left-2 w-8 h-1 bg-[var(--color-primary)]/40 rounded-full" />
                <div className="absolute bottom-2 right-2 w-4 h-4 rounded-full bg-[var(--color-primary)] opacity-50" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[var(--color-primary)]/20 text-4xl">dark_mode</span>
                </div>
              </div>
              <div className="px-2 pb-2 flex justify-between items-center">
                <span className="font-body text-sm font-medium text-[var(--color-on-surface)]">Koyu Tema</span>
                <span className="material-symbols-outlined text-[var(--color-primary)] text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                  check_circle
                </span>
              </div>
            </div>

            {/* Theme Option: Light */}
            <div className="relative group cursor-pointer border-2 border-transparent hover:border-[var(--color-surface-container-highest)] p-1 bg-[var(--color-surface-container-low)] transition-all">
              <div className="h-24 bg-[#fafafa] mb-3 relative overflow-hidden">
                <div className="absolute top-2 left-2 w-8 h-1 bg-neutral-300 rounded-full" />
                <div className="absolute bottom-2 right-2 w-4 h-4 rounded-full bg-neutral-400 opacity-50" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="material-symbols-outlined text-neutral-300 text-4xl">light_mode</span>
                </div>
              </div>
              <div className="px-2 pb-2 flex justify-between items-center">
                <span className="font-body text-sm font-medium text-[var(--color-on-surface-variant)]">Açık Tema</span>
              </div>
            </div>
          </div>
        </section>

        {/* Visual Asset: Waveform Decorative */}
        <div className="h-32 bg-[var(--color-surface-container-lowest)] flex items-center justify-center gap-1 px-4 opacity-30">
          {[4, 8, 16, 12, 20, 24, 14, 18, 10, 6, 14, 22, 12, 16, 4].map((h, i) => (
            <div
              key={i}
              className="w-1 rounded-full bg-[var(--color-primary)]"
              style={{ height: `${h * 4}px` }}
            />
          ))}
        </div>
      </main>

      {/* Fixed Footer Actions */}
      <div className="fixed bottom-20 left-0 w-full glass-panel z-40 border-t border-[var(--color-outline-variant)]/10">
        <div className="max-w-2xl mx-auto px-6 h-24 flex items-center justify-between gap-6">
          <Link
            to="/"
            className="flex-1 font-headline uppercase text-xs tracking-widest py-4 bg-transparent border border-[var(--color-outline-variant)]/30 text-[var(--color-on-surface-variant)] hover:bg-[var(--color-surface-container-high)] transition-all text-center"
          >
            İptal
          </Link>
          <button
            className="flex-[2] font-headline uppercase text-xs font-bold tracking-[0.2em] py-4 bg-[var(--color-primary-container)] text-[var(--color-on-primary-container)] hover:shadow-[0_0_20px_rgba(34,197,94,0.3)] transition-all active:scale-95 duration-200"
            onClick={() => onSave(settings)}
          >
            Kaydet
          </button>
        </div>
      </div>
    </>
  );
}
