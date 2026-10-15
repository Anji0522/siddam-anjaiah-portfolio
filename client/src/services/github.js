// GitHub API Dynamic Synchronization Service for Siddam Anjaiah (Anji0522)
const GITHUB_USERNAME = 'Anji0522';
const SNAPSHOT_KEY = 'portfolio_github_snapshot_v1';
const LAST_SYNC_KEY = 'portfolio_github_last_sync_v1';

export const fetchGithubRepos = async (forceRefresh = false) => {
  try {
    // Cache-busting query parameter and headers to always bypass HTTP and browser caching
    const cacheBuster = Date.now();
    const url = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&direction=desc&per_page=100&_t=${cacheBuster}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/vnd.github.v3+json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        Pragma: 'no-cache'
      }
    });

    if (!response.ok) {
      if (response.status === 403) {
        throw new Error('GitHub API rate limit exceeded. Please try again in a few moments.');
      }
      throw new Error(`GitHub API request failed with status ${response.status}`);
    }

    const rawData = await response.json();

    // Map and sanitize active repositories
    const currentRepos = rawData.map((repo) => ({
      id: repo.id,
      name: repo.name,
      fullName: repo.full_name,
      description: repo.description || 'Public GitHub repository by Siddam Anjaiah',
      language: repo.language || 'JavaScript',
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      createdAt: repo.created_at,
      updatedAt: repo.updated_at,
      pushedAt: repo.pushed_at,
      htmlUrl: repo.html_url,
      homepage: repo.homepage,
      isFork: repo.fork,
      size: repo.size,
      topics: repo.topics || []
    }));

    // Diff Detection against previously stored snapshot
    let previousSnapshot = [];
    try {
      const stored = localStorage.getItem(SNAPSHOT_KEY);
      if (stored) {
        previousSnapshot = JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Could not parse previous GitHub snapshot:', e);
    }

    const currentRepoNames = new Set(currentRepos.map((r) => r.name.toLowerCase()));
    const previousRepoNames = new Set(previousSnapshot.map((r) => r.name.toLowerCase()));

    // 1. Newly Added Repositories
    const addedRepos = currentRepos.filter((r) => !previousRepoNames.has(r.name.toLowerCase()));

    // 2. Deleted / Removed Repositories
    const removedRepos = previousSnapshot.filter((r) => !currentRepoNames.has(r.name.toLowerCase()));

    // 3. Updated Repositories (pushed code or metadata changes)
    const updatedRepos = currentRepos.filter((curr) => {
      const prev = previousSnapshot.find((p) => p.name.toLowerCase() === curr.name.toLowerCase());
      return prev && (prev.pushedAt !== curr.pushedAt || prev.stars !== curr.stars);
    });

    // Update snapshot in localStorage
    localStorage.setItem(SNAPSHOT_KEY, JSON.stringify(currentRepos));
    localStorage.setItem(LAST_SYNC_KEY, new Date().toISOString());

    const hasChanges =
      previousSnapshot.length > 0 &&
      (addedRepos.length > 0 || removedRepos.length > 0 || updatedRepos.length > 0);

    return {
      success: true,
      data: currentRepos,
      totalCount: currentRepos.length,
      lastSync: new Date(),
      diff: {
        hasChanges,
        added: addedRepos,
        removed: removedRepos,
        updated: updatedRepos,
        previousCount: previousSnapshot.length,
        currentCount: currentRepos.length
      }
    };
  } catch (err) {
    console.error('GitHub API live sync error:', err.message);

    // If network fails, attempt to retrieve previous snapshot from localStorage
    let fallbackData = [];
    try {
      const stored = localStorage.getItem(SNAPSHOT_KEY);
      if (stored) {
        fallbackData = JSON.parse(stored);
      }
    } catch (e) {}

    return {
      success: false,
      data: fallbackData,
      error: err.message,
      lastSync: null,
      diff: { hasChanges: false, added: [], removed: [], updated: [] }
    };
  }
};

// Relative time helper (e.g. "2 hours ago", "yesterday", "5 days ago")
export const formatRelativeTime = (isoString) => {
  if (!isoString) return '';
  const date = new Date(isoString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;

  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
};
