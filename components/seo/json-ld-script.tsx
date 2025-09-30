import type { Thing, WithContext } from 'schema-dts';

interface JsonLdScriptProps<T extends Thing> {
  data: WithContext<T>;
}

export function JsonLdScript<T extends Thing>({ data }: JsonLdScriptProps<T>) {
  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: Required for JSON-LD structured data, content is server-generated and type-safe
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
