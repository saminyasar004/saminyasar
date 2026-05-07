export function SectionHeading({ tag, title, subtitle }: { tag: string; title: string; subtitle?: string }) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl md:text-3xl font-medium tracking-tight">
        <span className="text-syntax-comment">&lt;</span>
        <span className="text-brand">{tag}</span>
        <span className="text-syntax-comment"> /&gt;</span>
        <span className="ml-3 text-muted-foreground font-normal">{title}</span>
      </h2>
      {subtitle && <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>}
    </div>
  );
}
