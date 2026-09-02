import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  tone = "light",
  className,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  tone?: "light" | "dark";
  className?: string;
}) {
  const isDark = tone === "dark";

  return (
    <div
      className={cn(
        "mb-12 max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      <div className={cn("flex items-center gap-3", align === "center" && "justify-center")}>
        <span className="h-px w-8 bg-brand-signal" aria-hidden />
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-primary dark:text-brand-signal">{eyebrow}</p>
      </div>
      <h2
        className={cn(
          "mt-4 text-3xl font-bold tracking-[-0.03em] sm:text-4xl lg:text-[2.65rem]",
          isDark ? "text-white" : "text-foreground",
        )}
      >
        {title}
      </h2>
      {subtitle ? (
        <p className={cn("mt-4 text-base leading-7 sm:text-lg", isDark ? "text-white/75" : "text-muted-foreground")}>
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
