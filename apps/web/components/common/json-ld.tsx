export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe here — no user input reaches this component.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
