const express = require('express');
const router = express.Router();
const https = require('https');

let cachedRepos = null;
let lastFetchTime = 0;
const CACHE_TTL = 30 * 1000; // 30 seconds cache

/**
 * Fetch public repos for Anji0522 from GitHub API
 */
const fetchGithubRepos = () => {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.github.com',
      path: '/users/Anji0522/repos?sort=updated&per_page=100',
      method: 'GET',
      headers: {
        'User-Agent': 'Siddam-Anjaiah-Portfolio-Server',
        Accept: 'application/vnd.github.v3+json'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            const parsed = JSON.parse(data);
            resolve(parsed);
          } catch (e) {
            reject(new Error('Invalid JSON response from GitHub'));
          }
        } else {
          reject(new Error(`GitHub API returned status ${res.statusCode}: ${data}`));
        }
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    req.end();
  });
};

// GET /api/github/repos - Returns live repos with diff detection
router.get('/repos', async (req, res) => {
  try {
    const now = Date.now();
    let repos = cachedRepos;

    if (!repos || now - lastFetchTime > CACHE_TTL || req.query.fresh === 'true') {
      const rawRepos = await fetchGithubRepos();
      repos = rawRepos.map((repo) => ({
        id: repo.id,
        name: repo.name,
        fullName: repo.full_name,
        description: repo.description || 'No description provided.',
        htmlUrl: repo.html_url,
        homepage: repo.homepage || null,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        language: repo.language || 'Code',
        topics: repo.topics || [],
        createdAt: repo.created_at,
        updatedAt: repo.updated_at,
        pushedAt: repo.pushed_at,
        isFork: repo.fork,
        archived: repo.archived
      }));

      cachedRepos = repos;
      lastFetchTime = now;
    }

    res.status(200).json({
      success: true,
      count: repos.length,
      user: 'Anji0522',
      data: repos,
      lastSync: new Date(lastFetchTime).toISOString(),
      cached: now - lastFetchTime <= CACHE_TTL
    });
  } catch (error) {
    // If rate-limited or offline, return cached if available or fallback
    if (cachedRepos && cachedRepos.length > 0) {
      return res.status(200).json({
        success: true,
        count: cachedRepos.length,
        user: 'Anji0522',
        data: cachedRepos,
        lastSync: new Date(lastFetchTime).toISOString(),
        warning: 'Serving from stale cache due to upstream error'
      });
    }

    res.status(502).json({
      success: false,
      message: 'Failed to fetch repositories from GitHub API: ' + error.message
    });
  }
});

module.exports = router;
