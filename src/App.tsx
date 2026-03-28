import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { db } from './db/RecordingsDB';
import type { RecordingMetadata } from './types/Recording';

// Screens
import RecordingStudio from './screens/RecordingStudio';
import RecordingList from './screens/RecordingList';
import RecordingDetail from './screens/RecordingDetail';
import Settings from './screens/Settings';
import MicrophoneError from './screens/MicrophoneError';
import EmptyState from './screens/EmptyState';
import NotFound from './screens/NotFound';

function App() {
  const [recordings, setRecordings] = useState<RecordingMetadata[]>([]);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRecordings();
    checkMicrophonePermission();
  }, []);

  const loadRecordings = async () => {
    try {
      const allRecordings = await db.recordings.toArray();
      const metadata: RecordingMetadata[] = allRecordings.map(r => ({
        id: r.id,
        name: r.name,
        duration: r.duration,
        createdAt: r.createdAt,
        waveformData: r.waveformData,
        size: r.blob.size,
      }));
      setRecordings(metadata);
    } catch (error) {
      console.error('Error loading recordings:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkMicrophonePermission = async () => {
    try {
      const result = await navigator.permissions.query({ name: 'microphone' as PermissionName });
      setHasPermission(result.state === 'granted');
      result.onchange = () => {
        setHasPermission(result.state === 'granted');
      };
    } catch {
      setHasPermission(true);
    }
  };

  const deleteRecording = async (id: number) => {
    try {
      await db.recordings.delete(id);
      setRecordings(prev => prev.filter(r => r.id !== id));
    } catch (error) {
      console.error('Error deleting recording:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <span className="material-symbols-outlined text-primary text-6xl animate-spin">progress_activity</span>
      </div>
    );
  }

  if (hasPermission === false) {
    return <MicrophoneError />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          recordings.length === 0 ? <EmptyState /> : <Navigate to="/recordings" replace />
        } />
        <Route path="/studio" element={<RecordingStudio onRecordingComplete={loadRecordings} />} />
        <Route path="/recordings" element={
          recordings.length === 0 ? <EmptyState /> : <RecordingList recordings={recordings} onDelete={deleteRecording} />
        } />
        <Route path="/recordings/:id" element={<RecordingDetail recordings={recordings} onDelete={deleteRecording} />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
