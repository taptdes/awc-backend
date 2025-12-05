export default {
  branches: ['main'],
  tagFormat: 'backend-v${version}',
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/changelog',
    [
      '@semantic-release/npm',
      {
        pkgRoot: 'apps/backend',
        tarballDir: 'dist',
        npmPublish: false
      },
    ],
    [
      '@semantic-release/git',
      {
        assets: ['apps/backend/package.json', 'apps/backend/CHANGELOG.md'],
        message:
          'chore(release): backend v${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
      },
    ],
    '@semantic-release/github',
  ],
};
