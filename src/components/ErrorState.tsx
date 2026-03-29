import { Link } from 'react-router-dom';
import './ErrorState.css';

interface ErrorStateProps {
  type: 'permission_denied' | 'not_supported';
  onRetry?: () => void;
  onReadGuide?: () => void;
}

function ErrorState({ type, onRetry, onReadGuide }: ErrorStateProps) {
  const isPermissionDenied = type === 'permission_denied';

  return (
    <div className="error-state">
      <header className="top-app-bar">
        <div className="app-bar-left">
          <span className="app-title">Sonic Lab</span>
        </div>
        <div className="app-bar-right">
          <button className="icon-button" aria-label="Yardım">
            <span className="material-symbols-outlined">help</span>
          </button>
          <button className="icon-button" aria-label="Ayarlar">
            <span className="material-symbols-outlined">settings</span>
          </button>
        </div>
      </header>

      <main className="error-content">
        <div className="error-container">
          <div className="hero-icon-section">
            <div className="ambient-glow" />
            <div className="icon-container">
              <span className="material-symbols-outlined error-icon">warning</span>
              <div className="corner-accent top-left" />
              <div className="corner-accent bottom-right" />
            </div>
            {isPermissionDenied && (
              <div className="error-code-label">
                <span className="label-text">Error Code</span>
                <span className="code-value">PERM_DENIED_01</span>
              </div>
            )}
          </div>

          <h1 className="error-title">
            {isPermissionDenied ? 'Mikrofon Erişimi Reddedildi' : 'Tarayıcı Desteklenmiyor'}
          </h1>
          <p className="error-description">
            {isPermissionDenied
              ? 'Kayda başlamak için mikrofonunuza erişmemiz gerekiyor. Lütfen tarayıcı ayarlarından mikrofon izni verin veya farklı bir tarayıcı deneyin.'
              : 'Bu tarayıcı ses kaydı özelliğini desteklemiyor. Lütfen Chrome, Firefox veya Edge tarayıcısını kullanın.'}
          </p>

          <div className="action-cluster">
            <button className="primary-action" onClick={onRetry}>
              <span>Yeniden Dene</span>
              <span className="material-symbols-outlined">refresh</span>
            </button>
            <button className="secondary-action" onClick={onReadGuide}>
              Kılavuzu Oku
            </button>
          </div>

          <div className="technical-info">
            <div className="info-item">
              <span className="info-label">Platform</span>
              <span className="info-value">Web Audio API</span>
            </div>
            <div className="info-item">
              <span className="info-label">Status</span>
              <span className="info-value error-value">Locked</span>
            </div>
            <div className="info-item">
              <span className="info-label">Input</span>
              <span className="info-value">None Detected</span>
            </div>
            <div className="info-item">
              <span className="info-label">Session</span>
              <span className="info-value">#SL-4820</span>
            </div>
          </div>
        </div>
      </main>

      <nav className="bottom-nav">
        <Link to="/recordings" className="nav-item">
          <span className="material-symbols-outlined">mic_none</span>
          <span className="nav-label">Kayitlar</span>
        </Link>
        <Link to="/studio" className="nav-item active">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>add_circle</span>
          <span className="nav-label">Yeni Ses</span>
        </Link>
        <Link to="/" className="nav-item">
          <span className="material-symbols-outlined">science</span>
          <span className="nav-label">Laboratuvar</span>
        </Link>
        <Link to="/settings" className="nav-item">
          <span className="material-symbols-outlined">person</span>
          <span className="nav-label">Profil</span>
        </Link>
      </nav>
    </div>
  );
}

export default ErrorState;
