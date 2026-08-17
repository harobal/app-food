import { TheDealLoader } from "@/brand/BrandLoaders";
import { BrandInlineLockup } from "@/brand/BrandComponents";

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-background px-6 py-12 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute w-72 h-72 rounded-full bg-[#D4A03C]/10 blur-3xl pointer-events-none" />
      
      <TheDealLoader size="xl" speed={1.8} showLabel={false} />
      
      <div className="flex flex-col items-center gap-2 text-center z-10">
        <BrandInlineLockup showDescriptor className="justify-center" />
        <p className="max-w-sm text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground animate-pulse mt-2">
          Initializing Global Trade Session...
        </p>
      </div>
    </div>
  );
}

