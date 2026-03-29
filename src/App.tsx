import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import NotFound from './screens/NotFound';
import EmptyState from './screens/EmptyState';
import MicrophoneError from './screens/MicrophoneError';
import BottomNavBar from './components/BottomNavBar';
import { useRecordings } from './hooks/useRecordings';
import RecordingStudio from './screens/RecordingStudio';
import RecordingList from './screens/RecordingList';
import RecordingDetail from './screens/RecordingDetail';
import Settings from './screens/Settings';

function App() {
  const { recordings, remove } = useRecordings();

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background flex flex-col">
        <Routes>
          <Route path="/" element={<RecordingStudio />} />
          <Route path="/recordings" element={<RecordingList recordings={recordings} onDelete={remove} />} />
          <Route path="/recordings/:id" element={<RecordingDetail recordings={recordings} onDelete={remove} />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/empty" element={<EmptyState />} />
          <Route path="/microphone-error" element={<MicrophoneError />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <BottomNavBar />
      </div>
    </BrowserRouter>
  );
}

export default App;
