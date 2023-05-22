import config from 'lib/config';

export async function profileFetcher() {
  let response;
  try {
    response = await fetch(`${config.baseUrl}/api/open-source/profile`);
  } catch (err) {
    console.warn(err);
  }

  const { profile } = await response.json();
  return profile;
}

export async function readmeFetcher() {
  let readmeResponse;
  try {
    readmeResponse = await fetch(`${config.baseUrl}/api/open-source/readme`);
  } catch (err) {
    console.warn(err);
  }

  const { readme } = await readmeResponse.json();
  return readme;
}

export async function repositoryFetcher(repository) {
  let repositoryResponse;
  try {
    console.log('url', `${config.baseUrl}/api/open-source/repositories/${repository}`);
    repositoryResponse = await fetch(
      `${config.baseUrl}/api/open-source/repositories/${repository}`
    );
  } catch (err) {
    console.warn(err);
  }

  const res = await repositoryResponse.json();
  return res;
}
