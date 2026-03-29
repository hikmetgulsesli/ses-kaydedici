import './EmptyState.css';

interface EmptyStateProps {
  onStartRecording?: () => void;
}

function EmptyState({ onStartRecording }: EmptyStateProps) {
  return (
    <div className="empty-state">
      <header className="top-app-bar">
        <div className="app-title">Sonic Lab</div>
        <div className="app-bar-right">
          <button className="icon-button" aria-label="Ayarlar">
            <span className="material-symbols-outlined">settings</span>
          </button>
        </div>
      </header>

      <main className="empty-content">
        <div className="background-aesthetic">
          <div className="glow-right" />
          <div className="glow-left" />
        </div>

        <div className="empty-container">
          <div className="mic-icon-section">
            <div className="mic-circle">
              <span className="material-symbols-outlined mic-icon">mic</span>
            </div>
            <div className="add-badge">
              <span className="material-symbols-outlined add-icon">add</span>
            </div>
          </div>

          <div className="text-content">
            <h1 className="empty-title">Henüz Kayıt Yok</h1>
            <p className="empty-description">
              İlk ses kaydınızı yapmak için aşağıdaki butona tıklayın
            </p>
          </div>

          <button className="cta-button" onClick={onStartRecording}>
            <span className="material-symbols-outlined">fiber_manual_record</span>
            <span>Kayıt Yapmaya Başla</span>
          </button>

          <div className="metadata-label">
            <div className="meta-item">
              <span className="meta-label">SİNYAL</span>
              <span className="meta-value">0.0 DB</span>
            </div>
            <div className="meta-divider" />
            <div className="meta-item">
              <span className="meta-label">FORMAT</span>
              <span className="meta-value">WAV 48KHZ</span>
            </div>
          </div>
        </div>

        <div className="decorative-waveform">
          <div className="wave-bar" style={{ height: '8%' }} />
          <div className="wave-bar" style={{ height: '16%' }} />
          <div className="wave-bar" style={{ height: '12%' }} />
          <div className="wave-bar" style={{ height: '24%' }} />
          <div className="wave-bar" style={{ height: '32%' }} />
          <div className="wave-bar" style={{ height: '20%' }} />
          <div className="wave-bar" style={{ height: '12%' }} />
          <div className="wave-bar" style={{ height: '28%' }} />
          <div className="wave-bar" style={{ height: '16%' }} />
          <div className="wave-bar" style={{ height: '8%' }} />
          <div className="wave-bar" style={{ height: '20%' }} />
          <div className="wave-bar" style={{ height: '12%' }} />
        </div>
      </main>

      <nav className="bottom-nav">
        <a href="#" className="nav-item active">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>library_music</span>
          <span className="nav-label">Kitaplık</span>
        </a>
        <a href="#" className="nav-item">
          <span className="material-symbols-outlined">mic</span>
          <span className="nav-label">Kaydet</span>
        </a>
        <a href="#" className="nav-item">
          <span className="material-symbols-outlined">settings</span>
          <span className="nav-label">Ayarlar</span>
        </a>
      </nav>
    </div>
  );
}

export default EmptyState;
