import { getBreadcrumbSchema } from '@/lib/seo/json-ld';
import { JsonLdScript } from './json-ld-script';

interface BreadcrumbSchemaProps {
  items: Array<{ name: string; href: string }>;
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const breadcrumbItems = items[0]?.name === 'Home' ? items : [{ name: 'Home', href: '/' }, ...items];

  const schema = getBreadcrumbSchema(breadcrumbItems);

  return <JsonLdScript data={schema} />;
}
