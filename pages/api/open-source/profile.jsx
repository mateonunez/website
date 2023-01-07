import config from 'lib/config';
import { getProfile } from 'lib/github';
import { normalizeGithubProfile } from 'lib/utils/normalizers/normalizeGithub';

export default async function handler(req, res) {
  const profile = await getProfile().catch(err => {
    return res.status(200).json({ message: 'Something went wrong with GitHub.', extra: err });
  });

  if (!profile) {
    return res.status(500).json({ error: 'Github not available' });
  }

  const profileNormalized = normalizeGithubProfile(profile);

  return res.status(200).json({
    profile: profileNormalized
  });
}

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
