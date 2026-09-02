import { ExternalLink, Globe } from "lucide-react";
import { TRADE_PORTALS } from "@/content/site";

export function TradePortals() {
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        {TRADE_PORTALS.map((portal) => (
          <a
            key={portal.title}
            href={portal.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col justify-between rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/50 hover:bg-accent/40"
          >
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="rounded-md bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
                  {portal.badge}
                </span>
                <ExternalLink className="size-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
              </div>
              <h4 className="mt-2.5 text-sm font-semibold text-foreground group-hover:text-primary">
                {portal.title}
              </h4>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                {portal.description}
              </p>
            </div>
            <div className="mt-3 flex items-center gap-1.5 text-[11px] font-medium text-primary">
              <Globe className="size-3" />
              <span className="truncate">{new URL(portal.url).hostname}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
