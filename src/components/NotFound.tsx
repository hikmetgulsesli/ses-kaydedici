import './NotFound.css';

interface NotFoundProps {
  onNavigateHome?: () => void;
}

function NotFound({ onNavigateHome }: NotFoundProps) {
  return (
    <div className="not-found">
      <header className="top-app-bar">
        <div className="app-title">Sonic Lab</div>
        <div className="app-bar-right">
          <button className="icon-button" aria-label="Ayarlar">
            <span className="material-symbols-outlined">settings</span>
          </button>
          <button className="icon-button" aria-label="Profil">
            <span className="material-symbols-outlined">account_circle</span>
          </button>
        </div>
      </header>

      <main className="not-found-content">
        <div className="bg-number">404</div>

        <div className="content-grid">
          <div className="text-section">
            <div className="badge">
              <span>Hata Kodu 404</span>
            </div>
            <h1 className="not-found-title">Sayfa Bulunamadı</h1>
            <p className="not-found-description">
              Aradığınız sayfa mevcut değil veya taşınmış olabilir. Sonic Laboratory koridorlarında kaybolmuş olabilirsiniz.
            </p>
            <div className="cta-container">
              <a href="/" className="home-button" onClick={(e) => { e.preventDefault(); onNavigateHome?.(); }}>
                <span className="material-symbols-outlined">home</span>
                Ana Sayfaya Dön
              </a>
            </div>
          </div>

          <div className="visual-section">
            <div className="code-window">
              <div className="window-header">
                <div className="dot dot-red" />
                <div className="dot dot-yellow" />
                <div className="dot dot-green" />
              </div>
              <div className="window-content">
                <div className="waveform-container">
                  <div className="wave-bar" style={{ height: '20%' }} />
                  <div className="wave-bar" style={{ height: '45%' }} />
                  <div className="wave-bar" style={{ height: '30%' }} />
                  <div className="wave-bar highlight" style={{ height: '80%' }} />
                  <div className="wave-bar" style={{ height: '60%' }} />
                  <div className="wave-bar highlight-strong" style={{ height: '90%' }} />
                  <div className="wave-bar" style={{ height: '40%' }} />
                  <div className="wave-bar highlight-medium" style={{ height: '75%' }} />
                  <div className="wave-bar" style={{ height: '25%' }} />
                  <div className="wave-bar" style={{ height: '55%' }} />
                  <div className="wave-bar" style={{ height: '10%' }} />
                  <div className="wave-bar" style={{ height: '65%' }} />
                  <div className="wave-bar" style={{ height: '35%' }} />
                </div>
                <div className="progress-lines">
                  <div className="progress-line long" />
                  <div className="progress-line short" />
                </div>
                <div className="search-icon-container">
                  <span className="material-symbols-outlined search-icon">search_off</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="mobile-footer">
        <a href="#" className="footer-nav-item">
          <span className="material-symbols-outlined">library_music</span>
          <span>Kitaplık</span>
        </a>
        <a href="#" className="footer-nav-item">
          <span className="material-symbols-outlined">mic</span>
          <span>Kaydet</span>
        </a>
        <a href="#" className="footer-nav-item">
          <span className="material-symbols-outlined">graphic_eq</span>
          <span>Düzenle</span>
        </a>
        <a href="#" className="footer-nav-item">
          <span className="material-symbols-outlined">person</span>
          <span>Profil</span>
        </a>
      </footer>

      <div className="loading-bar">
        <div className="loading-progress" />
      </div>
    </div>
  );
}

export default NotFound;
