import type { ReactNode, ElementType, MouseEvent, JSX } from 'react';
import { kebapCase } from '@/lib/helpers/string';

interface TitleProps {
  title?: string;
  props?: {
    title: string;
  };
}

const extractTitle = (children: ReactNode): string | undefined => {
  return typeof children === 'object' && (children as TitleProps)?.props?.title
    ? (children as TitleProps).props.title
    : (children as string);
};

const extractName = (title: string | undefined): string | null => {
  return title ? kebapCase(title) : null;
};

interface CopyToClipboardProps {
  id: string;
  title: string;
  children: ReactNode;
}

const CopyToClipboard = ({ id, title, children }: CopyToClipboardProps): JSX.Element => (
  <button
    className="transform text-amber-500 transition-all duration-500 hover:scale-105 hover:text-amber-700 hover:underline"
    title={`Copy "${title}" to clipboard`}
    onClick={(event: MouseEvent<HTMLButtonElement>): void => {
      const fullUrl = `${window.location.origin}${window.location.pathname}#${id}`;
      void navigator.clipboard.writeText(fullUrl);

      const element = document?.getElementById(id);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest',
        });
      }

      window.history.pushState({}, '', `#${id}`);

      event.preventDefault();
    }}
    tabIndex={-1}
    type="button"
  >
    {children}
  </button>
);

interface HeadingProps {
  type: ElementType;
  id?: string;
  children: ReactNode;
  [key: string]: unknown;
}

const Heading = ({ type, id, children, ...rest }: HeadingProps): JSX.Element => {
  const Component = type;
  const title = extractTitle(children);
  const name = extractName(title) || id;

  return (
    <Component title={title} aria-label={title} name={name} id={id} {...rest}>
      <CopyToClipboard id={name!} title={title!}>
        {children}
      </CopyToClipboard>
    </Component>
  );
};

// Specific heading components with proper types
interface HeadingComponentProps extends Omit<HeadingProps, 'type'> {
  children: ReactNode;
}

export const H1 = (props: HeadingComponentProps): JSX.Element => <Heading type="h1">{props.children}</Heading>;
export const H2 = (props: HeadingComponentProps): JSX.Element => <Heading type="h2">{props.children}</Heading>;
export const H3 = (props: HeadingComponentProps): JSX.Element => <Heading type="h3">{props.children}</Heading>;
export const H4 = (props: HeadingComponentProps): JSX.Element => <Heading type="h4">{props.children}</Heading>;
export const H5 = (props: HeadingComponentProps): JSX.Element => <Heading type="h5">{props.children}</Heading>;
