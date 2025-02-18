import config from '@/lib/config';

export async function profileFetcher() {
  const response = await fetch(`${config.baseUrl}/api/open-source/profile`, {
    next: { revalidate: 60 * 60 * 4 },
  });

  const { profile } = await response.json();
  return profile;
}

export async function readmeFetcher() {
  const readmeResponse = await fetch(`${config.baseUrl}/api/open-source/readme`);
  const { readme } = await readmeResponse.json();
  return readme;
}

export async function repositoryFetcher(repository) {
  const repositoryResponse = await fetch(`${config.baseUrl}/api/open-source/repositories/${repository}`);
  const res = await repositoryResponse.json();
  return res;
}
