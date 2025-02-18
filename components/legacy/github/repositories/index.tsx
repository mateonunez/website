'use client';

import s from './repositories.module.css';
import type { NormalizedGitHubRepository } from '@/types/github';
import { RepositoryPreview } from './preview';
import type { HTMLAttributes, JSX } from 'react';

interface RepositoriesProps extends HTMLAttributes<HTMLDivElement> {
  repositories: NormalizedGitHubRepository[];
}

export default function Repositories({ repositories, className, ...props }: RepositoriesProps): JSX.Element {
  return (
    <div {...props} className={className}>
      <div className={s.repositories}>
        {repositories.map((repository) => (
          <RepositoryPreview key={repository.name} {...repository} />
        ))}
      </div>
    </div>
  );
}
