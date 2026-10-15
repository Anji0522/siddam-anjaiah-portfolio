// GitHub API integration for Siddam Anjaiah (Anji0522)
const GITHUB_USERNAME = 'Anji0522';
const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=30`;

export const fetchGithubRepos = async () => {
  try {
    const response = await fetch(GITHUB_API_URL, {
      headers: {
        Accept: 'application/vnd.github.v3+json'
      }
    });

    if (!response.ok) {
      if (response.status === 403) {
        throw new Error('GitHub API rate limit exceeded. Please try again in a few minutes.');
      }
      throw new Error(`GitHub API request failed with status ${response.status}`);
    }

    const data = await response.json();

    // Map and sanitize repository data
    const repos = data
      .filter((repo) => !repo.fork) // Filter out simple forks to focus on own repositories
      .map((repo) => ({
        id: repo.id,
        name: repo.name,
        fullName: repo.full_name,
        description: repo.description || 'Public GitHub repository by Siddam Anjaiah',
        language: repo.language || 'JavaScript',
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        updatedAt: repo.updated_at,
        htmlUrl: repo.html_url,
        homepage: repo.homepage,
        topics: repo.topics || []
      }));

    return {
      success: true,
      data: repos.length > 0 ? repos : data.map((repo) => ({
        id: repo.id,
        name: repo.name,
        description: repo.description || 'Public GitHub repository',
        language: repo.language || 'JavaScript',
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        updatedAt: repo.updated_at,
        htmlUrl: repo.html_url,
        homepage: repo.homepage
      }))
    };
  } catch (err) {
    console.error('GitHub API fetch error:', err.message);
    return {
      success: false,
      error: err.message
    };
  }
};
