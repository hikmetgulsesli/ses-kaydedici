import { useState, useEffect, useRef } from 'react';

export type MediaPermissionState = 
  | 'prompt'
  | 'granted'
  | 'denied'
  | 'unsupported';

export function useMediaPermission() {
  const [permissionState, setPermissionState] = useState<MediaPermissionState>('prompt');
  const [isSupported, setIsSupported] = useState(true);
  const initRef = useRef(false);

  useEffect(() => {
    if (initRef.current) return;
    initRef.current = true;

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
       
      setIsSupported(false);
       
      setPermissionState('unsupported');
      return;
    }

    let mounted = true;

    const checkPermission = async () => {
      try {
        const result = await navigator.permissions.query({ name: 'microphone' as PermissionName });
        if (!mounted) return;
        
        const state = result.state as MediaPermissionState;
         
        setPermissionState(state);
        
        result.addEventListener('change', () => {
          if (mounted) {
             
            setPermissionState(result.state as MediaPermissionState);
          }
        });
      } catch {
        if (mounted) {
           
          setPermissionState('prompt');
        }
      }
    };

    checkPermission();

    return () => {
      mounted = false;
    };
  }, []);

  const requestPermission = async (): Promise<boolean> => {
    if (!isSupported) {
      setPermissionState('unsupported');
      return false;
    }

    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setPermissionState('granted');
      return true;
    } catch (error) {
      if (error instanceof DOMException && error.name === 'NotAllowedError') {
        setPermissionState('denied');
      } else if (error instanceof DOMException && error.name === 'NotFoundError') {
        setPermissionState('unsupported');
      } else {
        setPermissionState('denied');
      }
      return false;
    }
  };

  return {
    permissionState,
    isSupported,
    requestPermission,
  };
}

export function isMediaRecorderSupported(): boolean {
  return typeof MediaRecorder !== 'undefined';
}
