type ReleaseType = 'patch' | 'minor' | 'major';

const RELEASE_TYPES = new Set<ReleaseType>(['patch', 'minor', 'major']);

function bumpVersion(current: string, type: ReleaseType): string {
  const parts = current.split('.').map(Number);

  if (parts.length !== 3 || parts.some(Number.isNaN)) {
    throw new Error(`Invalid semver: "${current}"`);
  }

  const [major, minor, patch] = parts;

  switch (type) {
    case 'major':
      return `${major + 1}.0.0`;
    case 'minor':
      return `${major}.${minor + 1}.0`;
    case 'patch':
      return `${major}.${minor}.${patch + 1}`;
  }
}

const [, , currentVersion, releaseType] = process.argv;

if (!currentVersion || !releaseType) {
  console.error('Usage: tsx scripts/bump-version.ts <current-version> <patch|minor|major>');
  process.exit(1);
}

if (!RELEASE_TYPES.has(releaseType as ReleaseType)) {
  console.error(`Invalid release type "${releaseType}". Must be one of: patch, minor, major`);
  process.exit(1);
}

process.stdout.write(bumpVersion(currentVersion, releaseType as ReleaseType));
