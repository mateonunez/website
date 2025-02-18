import config from '@/lib/config';
import type { GitHubUser, GitHubReadmeResponse, GitHubRepository, NormalizedGitHubUser } from '@/types/github';
import { getProfile } from '@/lib/github';
import { normalizeGitHubUser } from '@/lib/utils/normalizers/normalizeGithub';

export async function profileFetcher(): Promise<GitHubUser> {
  const response = await fetch(`${config.baseUrl}/api/open-source/profile`, {
    next: { revalidate: 60 * 60 * 4 }, // 4 hours
  });

  if (!response.ok) {
    throw new Error('Failed to fetch GitHub profile');
  }

  const { profile } = (await response.json()) as { profile: GitHubUser };
  return profile;
}

export async function readmeFetcher(): Promise<GitHubReadmeResponse['repository']['readme']> {
  const response = await fetch(`${config.baseUrl}/api/open-source/readme`);

  if (!response.ok) {
    throw new Error('Failed to fetch GitHub readme');
  }

  const { readme } = (await response.json()) as { readme: GitHubReadmeResponse };
  return readme.repository.readme;
}

export async function repositoryFetcher(repository: string): Promise<GitHubRepository | null> {
  const response = await fetch(`${config.baseUrl}/api/open-source/repositories/${repository}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch GitHub repository: ${repository}`);
  }

  const { repository: repo } = (await response.json()) as { repository: GitHubRepository | null };
  return repo;
}

export async function fetchGitHubProfile(): Promise<NormalizedGitHubUser> {
  const user = await getProfile();
  return normalizeGitHubUser(user);
}
