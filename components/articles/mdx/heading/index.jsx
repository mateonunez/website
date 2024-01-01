import { kebapCase } from "lib/helpers/string";

const extractTitle = (children) => {
  return typeof children === 'object' ? children.props?.title : children;
};

const extractName = (title) => {
  return title ? kebapCase(title) : null;
}

const CopyToClipboard = ({ id, title, children }) => (
  <button
    className="hover:text-amber-700 hover:scale-105 transform transition-all duration-500 hover:underline text-amber-500"
    title={`Copy "${title}" to clipboard`}
    onClick={(event) => {
      const fullUrl = `${window.location.origin}${window.location.pathname}#${id}`;
      navigator.clipboard.writeText(fullUrl);

      const element = document.getElementById(id);
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

// Generic Heading Component
const Heading = ({ type, id, children, ...rest }) => {
  const Component = type;
  const title = extractTitle(children);
  const name = extractName(title) || id;

  return (
    <Component title={title} aria-label={title} name={name} id={id} {...rest}>
      <CopyToClipboard id={name} title={title}>
        {children}
      </CopyToClipboard>
    </Component>
  );
};

// Export specific heading components
export const H1 = (props) => <Heading type="h1" {...props} />;
export const H2 = (props) => <Heading type="h2" {...props} />;
export const H3 = (props) => <Heading type="h3" {...props} />;
export const H4 = (props) => <Heading type="h4" {...props} />;
export const H5 = (props) => <Heading type="h5" {...props} />;
