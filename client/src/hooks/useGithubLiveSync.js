import { useState, useEffect, useCallback } from 'react';
import { fetchGithubRepos } from '../services/github';

export const useGithubLiveSync = (pollInterval = 60000) => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [error, setError] = useState(null);
  const [lastSync, setLastSync] = useState(null);
  const [diff, setDiff] = useState({
    hasChanges: false,
    added: [],
    removed: [],
    updated: []
  });

  const sync = useCallback(async (isManual = false) => {
    if (isManual) setIsSyncing(true);
    const result = await fetchGithubRepos(isManual);

    if (result.success) {
      setRepos(result.data);
      setLastSync(result.lastSync);
      setDiff(result.diff);
      setError(null);
    } else {
      if (result.data && result.data.length > 0) {
        setRepos(result.data);
      }
      setError(result.error);
    }

    setLoading(false);
    if (isManual) setIsSyncing(false);
  }, []);

  // Initial load
  useEffect(() => {
    sync(false);
  }, [sync]);

  // Sync automatically when window / tab gains focus (e.g. user returns from GitHub)
  useEffect(() => {
    const handleFocus = () => {
      sync(false);
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [sync]);

  // Periodic background polling (every 60s)
  useEffect(() => {
    if (pollInterval <= 0) return;
    const interval = setInterval(() => {
      sync(false);
    }, pollInterval);

    return () => clearInterval(interval);
  }, [sync, pollInterval]);

  return {
    repos,
    loading,
    isSyncing,
    error,
    lastSync,
    diff,
    syncNow: () => sync(true)
  };
};

export default useGithubLiveSync;
