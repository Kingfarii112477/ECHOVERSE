'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/stores/authStore';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const initialize = useAuthStore((s) => s.initialize);
  const setLoading = useAuthStore((s) => s.setLoading);

  useEffect(() => {
    let unsub: (() => void) | undefined;
    initialize()
      .then((fn) => { unsub = fn; })
      .catch((err) => {
        console.error('Auth init failed:', err);
        setLoading(false); // unblocks UI instead of infinite spinner
      });
    return () => { unsub?.(); };
  }, [initialize, setLoading]);

  return <>{children}</>;
}
