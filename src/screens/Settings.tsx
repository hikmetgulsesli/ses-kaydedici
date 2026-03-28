import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import BottomNavBar from '../components/BottomNavBar';
import { getAudioSettings, saveAudioSettings, type AudioSettings } from '../utils/audioSettings';

const qualities = [
  { id: 'low' as const, label: 'Düşük', bitrate: '128 KB/S' },
  { id: 'medium' as const, label: 'Orta', bitrate: '256 KB/S' },
  { id: 'high' as const, label: 'Yüksek', bitrate: 'FLAC / 24-BIT' },
];

const formats = ['MP3', 'WAV', 'WebM'];

interface DeviceInfo {
  deviceId: string;
  label: string;
}

export default function Settings() {
  const [settings, setSettings] = useState<AudioSettings>(getAudioSettings);
  const [devices, setDevices] = useState<DeviceInfo[]>([]);
  const [permissionGranted, setPermissionGranted] = useState(false);

  const enumerateDevices = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(t => t.stop());
      setPermissionGranted(true);
    } catch {
      setPermissionGranted(false);
    }

    try {
      const allDevices = await navigator.mediaDevices.enumerateDevices();
      const audioInputs = allDevices
        .filter(d => d.kind === 'audioinput')
        .map(d => ({
          deviceId: d.deviceId,
          label: d.label || `Mikrofon ${d.deviceId.slice(0, 8)}`,
        }));
      setDevices(audioInputs);
    } catch {
      setDevices([]);
    }
  }, []);

  useEffect(() => {
    enumerateDevices();
  }, [enumerateDevices]);

  const handleSave = () => {
    saveAudioSettings(settings);
  };

  const handleCancel = () => {
    setSettings(getAudioSettings());
  };

  return (
    <div className="min-h-screen bg-background pb-32">
      <header className="fixed top-0 w-full z-50 bg-surface flex items-center justify-between px-6 h-16">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-on-surface-variant hover:text-primary transition-colors">
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <h1 className="font-headline tracking-tight text-on-surface uppercase text-sm font-bold">Ayarlar</h1>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-on-surface-variant hover:text-primary transition-colors">
            <span className="material-symbols-outlined">help</span>
          </button>
          <button className="text-on-surface-variant hover:text-primary transition-colors">
            <span className="material-symbols-outlined">more_vert</span>
          </button>
        </div>
      </header>

      <main className="pt-24 px-6 max-w-2xl mx-auto space-y-12">
        <section className="space-y-8">
          <header className="flex items-baseline justify-between border-b border-outline-variant/15 pb-4">
            <h2 className="font-headline text-2xl font-bold tracking-tight text-on-surface">Ses Ayarları</h2>
            <span className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant">Audio Engine v2.4</span>
          </header>

          <div className="grid gap-8">
            <div className="group">
              <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant mb-3 block">Mikrofon Seçimi</label>
              <div className="relative">
                <select
                  value={settings.microphoneId}
                  onChange={(e) => setSettings(s => ({ ...s, microphoneId: e.target.value }))}
                  className="w-full bg-surface-container-low border-none rounded-none py-4 px-5 appearance-none font-body text-on-surface focus:ring-1 focus:ring-primary-container/30 cursor-pointer transition-all"
                >
                  {devices.length === 0 && !permissionGranted && <option>Mikrofon izni gerekli</option>}
                  {devices.length === 0 && permissionGranted && <option>Cihaz bulunamadı</option>}
                  {devices.map(d => (
                    <option key={d.deviceId} value={d.deviceId}>{d.label}</option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant">
                  <span className="material-symbols-outlined">expand_more</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-surface-container-low p-6 rounded-none space-y-4">
                <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant block">Ses Kalitesi</label>
                <div className="flex flex-col gap-2">
                  {qualities.map((q) => (
                    <button
                      key={q.id}
                      onClick={() => setSettings(s => ({ ...s, quality: q.id }))}
                      className={`flex items-center justify-between p-3 transition-colors ${
                        settings.quality === q.id
                          ? 'bg-surface-container-highest border-l-2 border-primary text-primary'
                          : 'bg-surface hover:bg-surface-container-high text-on-surface-variant'
                      }`}
                    >
                      <span className="text-sm">{q.label}</span>
                      <span className="font-label text-[9px]">{q.bitrate}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-surface-container-low p-6 rounded-none flex flex-col justify-between">
                <div className="space-y-4">
                  <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant block">Kayıt Formatı</label>
                  <div className="flex flex-wrap gap-2">
                    {formats.map((f) => (
                      <button
                        key={f}
                        onClick={() => setSettings(s => ({ ...s, format: f }))}
                        className={`px-4 py-2 font-label text-[11px] uppercase tracking-wider transition-colors ${
                          settings.format === f
                            ? 'bg-primary-container text-on-primary-container font-bold'
                            : 'bg-surface text-on-surface-variant'
                        }`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>
                <p className="text-[11px] text-on-surface-variant leading-relaxed mt-4">
                  WebM formatı, yüksek kaliteli ses verilerini düşük dosya boyutlarında saklamak için optimize edilmiştir.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-8">
          <header className="flex items-baseline justify-between border-b border-outline-variant/15 pb-4">
            <h2 className="font-headline text-2xl font-bold tracking-tight text-on-surface">Görünüm</h2>
            <span className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant">Arayüz Özelleştirme</span>
          </header>

          <div className="grid grid-cols-2 gap-4">
            <div className="relative group cursor-pointer border-2 border-primary p-1 bg-surface-container-low">
              <div className="h-24 bg-surface-container-lowest mb-3 relative overflow-hidden">
                <div className="absolute top-2 left-2 w-8 h-1 bg-primary/40 rounded-full"></div>
                <div className="absolute bottom-2 right-2 w-4 h-4 rounded-full bg-primary shadow-[0_0_10px_rgba(75,226,119,0.3)]"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary/20 text-4xl">dark_mode</span>
                </div>
              </div>
              <div className="px-2 pb-2 flex justify-between items-center">
                <span className="font-body text-sm font-medium text-on-surface">Koyu Tema</span>
                <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              </div>
            </div>

            <div className="relative group cursor-pointer border-2 border-transparent hover:border-surface-container-highest p-1 bg-surface-container-low transition-all">
              <div className="h-24 bg-[#fafafa] mb-3 relative overflow-hidden">
                <div className="absolute top-2 left-2 w-8 h-1 bg-neutral-300 rounded-full"></div>
                <div className="absolute bottom-2 right-2 w-4 h-4 rounded-full bg-neutral-400 opacity-50"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="material-symbols-outlined text-neutral-300 text-4xl">light_mode</span>
                </div>
              </div>
              <div className="px-2 pb-2 flex justify-between items-center">
                <span className="font-body text-sm font-medium text-on-surface-variant">Açık Tema</span>
              </div>
            </div>
          </div>
        </section>

        <div className="h-32 bg-surface-container-lowest flex items-center justify-center gap-1 px-4 opacity-30">
          {[4, 8, 16, 12, 20, 24, 14, 18, 10, 6, 14, 22, 12, 16, 4].map((h, i) => (
            <div key={i} className="w-1 bg-primary rounded-full" style={{ height: `${h}px` }}></div>
          ))}
        </div>
      </main>

      <div className="fixed bottom-20 left-0 w-full glass-panel z-40 border-t border-outline-variant/10">
        <div className="max-w-2xl mx-auto px-6 h-24 flex items-center justify-between gap-6">
          <button
            onClick={handleCancel}
            className="flex-1 font-headline uppercase text-xs tracking-widest py-4 bg-transparent border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container-high transition-all"
          >
            İptal
          </button>
          <button
            onClick={handleSave}
            className="flex-[2] font-headline uppercase text-xs font-bold tracking-[0.2em] py-4 bg-primary-container text-on-primary-container hover:shadow-[0_0_20px_rgba(34,197,94,0.3)] transition-all"
          >
            Kaydet
          </button>
        </div>
      </div>

      <BottomNavBar />

      <style>{`
        .glass-panel {
          background: rgba(53, 53, 52, 0.6);
          backdrop-filter: blur(24px);
        }
      `}</style>
    </div>
  );
}
