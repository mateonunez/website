import { fetchGitHubProfile } from '@/lib/fetchers/open-source/fetcher';
import { GitHubCommunity } from './github-community';

export async function GitHubCommunityWrapper() {
  const githubProfile = await fetchGitHubProfile();
  return <GitHubCommunity profile={githubProfile} />;
}
