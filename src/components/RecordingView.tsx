interface RecordingViewProps {
  isRecording: boolean;
  duration: string;
  waveformHeights: number[];
  microphoneStatus: 'active' | 'inactive' | 'error';
  format: { sampleRate: string; bitDepth: string; channel: string };
  deviceName: string;
  onStartRecording: () => void;
  onStopRecording: () => void;
}

export function RecordingView({
  isRecording,
  duration,
  waveformHeights,
  microphoneStatus,
  format,
  deviceName,
  onStartRecording,
  onStopRecording,
}: RecordingViewProps) {
  return (
    <div className="flex-1 mt-16 pb-20 flex flex-col items-center justify-between p-8 relative">
      {/* Status Indicator */}
      <div className="w-full max-w-4xl flex justify-between items-start pt-10">
        <div className="flex flex-col gap-1">
          <span className="font-label text-[10px] text-[var(--color-on-surface-variant)] uppercase tracking-widest">
            Mikrofon Durumu
          </span>
          <div className="flex items-center gap-2">
            <div
              className={`w-2 h-2 rounded-full ${
                microphoneStatus === 'active'
                  ? 'bg-[var(--color-primary)] shadow-[0_0_10px_rgba(75,226,119,0.5)]'
                  : microphoneStatus === 'error'
                  ? 'bg-[var(--color-error)]'
                  : 'bg-[var(--color-on-surface-variant)]'
              }`}
            />
            <span className="text-[var(--color-on-surface)] font-medium">
              {microphoneStatus === 'active' ? 'AKTİF' : microphoneStatus === 'error' ? 'HATA' : 'İNAKTİF'}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1 text-right">
          <span className="font-label text-[10px] text-[var(--color-on-surface-variant)] uppercase tracking-widest">
            Sinyal Gücü
          </span>
          <div className="flex gap-0.5 h-4 items-end">
            <div className="w-1 h-1 bg-[var(--color-primary)] rounded-full" />
            <div className="w-1 h-2 bg-[var(--color-primary)] rounded-full" />
            <div className="w-1 h-3 bg-[var(--color-primary)] rounded-full" />
            <div className="w-1 h-4 bg-[var(--color-primary)] rounded-full" />
            <div className="w-1 h-2 bg-[var(--color-surface-variant)] rounded-full" />
          </div>
        </div>
      </div>

      {/* Timer Display */}
      <div className="flex flex-col items-center justify-center space-y-2">
        <span className="font-label text-[var(--color-on-surface-variant)] uppercase tracking-[0.3em] text-xs">
          Kayıt Süresi
        </span>
        <h2 className="font-headline text-8xl md:text-[9rem] font-bold tracking-tighter text-[#fafafa] tabular-nums">
          {duration}
        </h2>
      </div>

      {/* Waveform Visualizer */}
      <div className="w-full max-w-5xl h-48 bg-[var(--color-surface-container-lowest)] rounded-none flex items-center justify-center gap-1.5 px-8 relative overflow-hidden group">
        {waveformHeights.map((height, index) => (
          <div
            key={index}
            className="waveform-bar w-1.5 rounded-full"
            style={{
              height: `${height}%`,
              backgroundColor: isRecording
                ? 'var(--color-primary)'
                : 'var(--color-surface-variant)',
            }}
          />
        ))}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[var(--color-primary)]/30 z-10" />
      </div>

      {/* Controls */}
      <div className="flex flex-col items-center gap-12 w-full pb-10">
        {/* Playback Controls */}
        <div className="flex items-center gap-8 bg-[var(--color-surface-container-highest)]/60 backdrop-blur-xl px-10 py-5 rounded-full shadow-2xl border border-[var(--color-outline-variant)]/10">
          <button className="text-[var(--color-on-surface-variant)] hover:text-[var(--color-secondary)] transition-all active:scale-90">
            <span className="material-symbols-outlined text-3xl">skip_previous</span>
          </button>
          <button className="bg-[var(--color-secondary)] text-[var(--color-on-secondary)] w-14 h-14 rounded-full flex items-center justify-center hover:bg-[var(--color-secondary-fixed)] transition-all active:scale-95 shadow-lg">
            <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              play_arrow
            </span>
          </button>
          <button className="text-[var(--color-on-surface-variant)] hover:text-[var(--color-secondary)] transition-all active:scale-90">
            <span className="material-symbols-outlined text-3xl">skip_next</span>
          </button>
        </div>

        {/* Primary Action: Record/Stop Button */}
        <div className="relative group cursor-pointer">
          <div className="absolute inset-0 bg-[var(--color-primary)]/20 rounded-full blur-2xl group-hover:bg-[var(--color-primary)]/30 transition-all" />
          <button
            onClick={isRecording ? onStopRecording : onStartRecording}
            className={`relative w-28 h-28 rounded-full flex flex-col items-center justify-center gap-1 border-4 border-[var(--color-background)] shadow-2xl transition-all ${
              isRecording
                ? 'bg-[var(--color-error-container)] hover:bg-[var(--color-error)] recording-pulse'
                : 'bg-[var(--color-primary-container)] hover:bg-[var(--color-primary)]'
            }`}
          >
            <span className="material-symbols-outlined text-white text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              {isRecording ? 'stop' : 'fiber_manual_record'}
            </span>
            <span className="font-label text-[10px] text-white font-bold tracking-widest">
              {isRecording ? 'DURDUR' : 'KAYIT'}
            </span>
          </button>
        </div>
      </div>

      {/* Asymmetric Detail View */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-4 w-64">
        <div className="bg-[var(--color-surface-container-low)] p-5 rounded-xl border-l-2 border-[var(--color-primary)]">
          <h4 className="font-label text-[10px] text-[var(--color-on-surface-variant)] uppercase tracking-widest mb-3">
            Format Bilgisi
          </h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-xs text-[var(--color-on-surface-variant)]">Örnekleme</span>
              <span className="text-xs font-headline">{format.sampleRate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-[var(--color-on-surface-variant)]">Bit Hızı</span>
              <span className="text-xs font-headline">{format.bitDepth}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-[var(--color-on-surface-variant)]">Kanal</span>
              <span className="text-xs font-headline">{format.channel}</span>
            </div>
          </div>
        </div>
        <div className="bg-[var(--color-surface-container-low)] p-5 rounded-xl">
          <h4 className="font-label text-[10px] text-[var(--color-on-surface-variant)] uppercase tracking-widest mb-3">
            Cihaz
          </h4>
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[var(--color-on-surface-variant)]">
              settings_input_component
            </span>
            <span className="text-xs text-[var(--color-on-surface)] font-medium truncate">
              {deviceName}
            </span>
          </div>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[var(--color-primary)]/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[var(--color-secondary)]/5 blur-[120px] rounded-full" />
      </div>
    </div>
  );
}
