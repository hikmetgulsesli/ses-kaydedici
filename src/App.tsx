import { useMemo } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, Link } from 'react-router-dom';
import './App.css';
import ErrorState from './components/ErrorState';
import EmptyState from './components/EmptyState';
import NotFound from './components/NotFound';
import { useMediaPermission } from './hooks/useMediaPermission';
import RecordingStudio from './screens/RecordingStudio';
import RecordingList from './screens/RecordingList';
import RecordingDetail from './screens/RecordingDetail';
import Settings from './screens/Settings';

function HomePage() {
  const navigate = useNavigate();
  const { permissionState, isSupported, requestPermission } = useMediaPermission();
  
  const hasRecordings = useMemo(() => {
    try {
      const recordings = localStorage.getItem('recordings');
      return recordings ? JSON.parse(recordings).length > 0 : false;
    } catch {
      return false;
    }
  }, []);

  const handleStartRecording = async () => {
    if (permissionState === 'granted') {
      navigate('/record');
    } else if (permissionState === 'prompt') {
      const granted = await requestPermission();
      if (granted) {
        navigate('/record');
      }
    } else if (permissionState === 'denied' || !isSupported) {
      navigate('/error');
    }
  };

  if (!isSupported) {
    return <ErrorState type="not_supported" onRetry={() => window.location.reload()} />;
  }

  if (permissionState === 'denied') {
    return <ErrorState type="permission_denied" onRetry={handleStartRecording} />;
  }

  if (!hasRecordings) {
    return <EmptyState />;
  }

  return (
    <div className="app-container">
      <header className="top-app-bar">
        <div className="app-title">Sonic Lab</div>
        <div className="app-bar-right">
          <Link to="/settings" className="icon-button" aria-label="Ayarlar">
            <span className="material-symbols-outlined">settings</span>
          </Link>
        </div>
      </header>

      <main className="main-content">
        <div className="recordings-header">
          <h1 className="page-title">Tüm Kayıtlar</h1>
        </div>
        
        <div className="recordings-list">
          <p className="empty-message">Henüz kayıt yok</p>
        </div>
      </main>

      <nav className="bottom-nav">
        <Link to="/" className="nav-item active">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>library_music</span>
          <span className="nav-label">Kitaplık</span>
        </Link>
        <button className="nav-item" onClick={handleStartRecording}>
          <span className="material-symbols-outlined">mic</span>
          <span className="nav-label">Kaydet</span>
        </button>
        <Link to="/settings" className="nav-item">
          <span className="material-symbols-outlined">settings</span>
          <span className="nav-label">Ayarlar</span>
        </Link>
      </nav>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="/recordings" element={<RecordingList />} />
        <Route path="/recordings/:id" element={<RecordingDetail />} />
        <Route path="/studio" element={<RecordingStudio />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

function ErrorPage() {
  const navigate = useNavigate();
  const { permissionState, isSupported, requestPermission } = useMediaPermission();

  const handleRetry = async () => {
    if (permissionState === 'prompt') {
      const granted = await requestPermission();
      if (granted) {
        navigate('/');
      }
    } else {
      window.location.reload();
    }
  };

  if (!isSupported) {
    return <ErrorState type="not_supported" onRetry={handleRetry} />;
  }

  return <ErrorState type="permission_denied" onRetry={handleRetry} />;
}

function NotFoundPage() {
  const navigate = useNavigate();

  const handleNavigateHome = () => {
    navigate('/');
  };

  return <NotFound onNavigateHome={handleNavigateHome} />;
}

export default App;
