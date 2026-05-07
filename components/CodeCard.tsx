import type { ReactNode } from "react";

export function CodeCard({
  title,
  children,
  badge,
}: {
  title?: string;
  badge?: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-lg border border-border bg-surface overflow-hidden">
      {(title || badge) && (
        <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-surface-2">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.65_0.18_25)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.78_0.15_85)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.72_0.15_145)]" />
            {title && (
              <span className="ml-3 text-xs text-muted-foreground">{title}</span>
            )}
          </div>
          {badge && <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{badge}</span>}
        </div>
      )}
      <div className="p-5 text-sm leading-relaxed">{children}</div>
    </div>
  );
}
