import config from 'lib/config';
import { getReadme } from 'lib/github';

export default async function handler(req, res) {
  const readme = await getReadme().catch(err => {
    return res
      .status(200)
      .json({ recently_played: false, message: 'Something went wrong with GitHub.', extra: err });
  });

  if (!readme) {
    return res.status(500).json({ error: 'Github not available' });
  }

  return res.status(200).json({
    readme
  });
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
