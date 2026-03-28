import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AudioPlayer from '../components/AudioPlayer';
import type { Recording } from '../types/Recording';
import { getRecording, deleteRecording } from '../db/storage';

export default function RecordingDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [recording, setRecording] = useState<Recording | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadRecording = async () => {
      if (!id) {
        setError('Kayıt kimliği bulunamadı');
        setIsLoading(false);
        return;
      }
      try {
        const rec = await getRecording(Number(id));
        if (rec) {
          setRecording(rec);
        } else {
          setError('Kayıt bulunamadı');
        }
      } catch (err) {
        console.error('Error loading recording:', err);
        setError('Kayıt yüklenirken hata oluştu');
      } finally {
        setIsLoading(false);
      }
    };
    loadRecording();
  }, [id]);

  const handleDelete = async (recordingId: number) => {
    try {
      await deleteRecording(recordingId);
      navigate('/recordings');
    } catch (err) {
      console.error('Error deleting recording:', err);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-primary text-4xl mb-4">
            <span className="material-symbols-outlined animate-spin">progress_activity</span>
          </div>
          <p className="font-headline text-on-surface-variant">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (error || !recording) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-headline text-2xl text-on-surface mb-4">{error || 'Kayıt bulunamadı'}</h1>
          <Link to="/recordings" className="text-primary hover:underline font-headline">Kayıt listesine dön</Link>
        </div>
      </div>
    );
  }

  return (
    <AudioPlayer
      recording={recording}
      onDelete={handleDelete}
    />
  );
}
