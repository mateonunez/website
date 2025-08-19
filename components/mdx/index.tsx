import type { MDXComponents } from 'mdx/types';
import type { ComponentProps } from 'react';
import { Code } from './elements/code';
import { Collapsible } from './elements/collapsible';
import { Column } from './elements/column';
import { Grid, GridItem } from './elements/grid';
import { Heading } from './elements/heading';
import { Image } from './elements/image';
import { Link } from './elements/link';
import { Row } from './elements/row';
import { MDXLayout } from './layout';

const components: MDXComponents = {
  wrapper: MDXLayout,

  h1: (props: ComponentProps<typeof Heading>) => <Heading {...props} />,
  h2: (props: ComponentProps<typeof Heading>) => <Heading as="h2" {...props} />,
  h3: (props: ComponentProps<typeof Heading>) => <Heading as="h3" {...props} />,
  h4: (props: ComponentProps<typeof Heading>) => <Heading as="h4" {...props} />,
  h5: (props: ComponentProps<typeof Heading>) => <Heading as="h5" {...props} />,
  h6: (props: ComponentProps<typeof Heading>) => <Heading as="h6" {...props} />,
  a: Link,
  img: Image,
  Image: Image,
  pre: Code,
  code: Code,
  Column,
  Row,
  Grid,
  GridItem,
  Collapsible,
} satisfies MDXComponents;

export default components;
