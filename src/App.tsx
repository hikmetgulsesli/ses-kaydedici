import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import NotFound from './screens/NotFound';
import Settings from './screens/Settings';

export default function App() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    let mounted = true;

    async function checkPermission() {
      try {
        const result = await navigator.permissions.query({ name: 'microphone' as PermissionName });
        if (mounted) {
          setHasPermission(result.state === 'granted');
        }
        result.onchange = () => {
          if (mounted) {
            setHasPermission(result.state === 'granted');
          }
        };
      } catch {
        if (mounted) {
          setHasPermission(true);
        }
      }
    }

    checkPermission();
    return () => { mounted = false; };
  }, []);

  if (hasPermission === null) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <span className="material-symbols-outlined text-primary text-6xl animate-spin">progress_activity</span>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/settings" replace />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
