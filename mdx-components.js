import * as mdxComponents from 'components/articles/mdx';

export function useMDXComponents(components) {
  return {
    mdxComponents,
    ...components,
  };
}
