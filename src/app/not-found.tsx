import { ArrowLeft, ArrowRight, Sprout } from "lucide-react";
import { FoodsLink } from "@/components/pages/foods-link";
import { Button } from "@/components/ui/button";
import HarobalLogo from "@/brand/Logo";

export const metadata = {
  title: { absolute: "Lost in the Harvest | Harobal Foods" },
  description: "The requested page could not be found.",
  robots: { index: false, follow: false },
};

export default function GlobalNotFound() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-[#071915]">
      {/* ──────────────────────────────────────────────
          BACKGROUND AMBIENT BOTANICAL & GOLD GLOW
          ────────────────────────────────────────────── */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-brand-primary/18 blur-[130px] rounded-full pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] bg-brand-gold/12 blur-[100px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      {/* ──────────────────────────────────────────────
          CENTERED CARD & 404 DISPLAY
          ────────────────────────────────────────────── */}
      <div className="container px-4 mx-auto text-center relative z-10 max-w-3xl">
        {/* Brand Header Logo */}
        <div className="mb-6 sm:mb-8 flex justify-center">
          <FoodsLink href="/" className="transition-opacity hover:opacity-85" aria-label="Return to Harobal Foods home">
            <HarobalLogo variant="dark-horizontal" size="sm" showDescriptor />
          </FoodsLink>
        </div>

        {/* 4 [SPROUT] 4 Centerpiece */}
        <div className="flex items-center justify-center text-[120px] sm:text-[160px] md:text-[200px] font-black leading-none font-heading text-white tracking-tighter mb-4 select-none">
          <span className="bg-clip-text text-transparent bg-gradient-to-br from-white via-slate-200 to-slate-500">
            4
          </span>
          <div className="mx-2 md:mx-6 text-brand-signal flex items-center justify-center drop-shadow-[0_0_35px_rgba(110,156,98,0.5)]">
            <Sprout
              className="w-[95px] h-[95px] sm:w-[130px] sm:h-[130px] md:w-[160px] md:h-[160px] animate-[sway_4s_ease-in-out_infinite]"
              strokeWidth={1.5}
            />
          </div>
          <span className="bg-clip-text text-transparent bg-gradient-to-bl from-white via-slate-200 to-slate-500">
            4
          </span>
        </div>

        {/* Witty, Domain-Authentic Copy */}
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4 tracking-tight">
            Lost in the Harvest
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-slate-300/80 mb-8 sm:mb-10 font-light leading-relaxed">
            We couldn&apos;t find the page you&apos;re looking for. It might have been moved, renamed, or perhaps the crop was already harvested.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <Button
              asChild
              size="lg"
              className="bg-brand-primary hover:bg-brand-signal text-white rounded-full px-7 sm:px-8 h-12 sm:h-14 text-base sm:text-lg border-none shadow-lg shadow-brand-primary/30 transition-all hover:scale-105 group cursor-pointer"
            >
              <FoodsLink href="/" className="flex items-center gap-2">
                <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                Return Home
              </FoodsLink>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/20 bg-white/5 hover:bg-white/12 text-white rounded-full px-7 sm:px-8 h-12 sm:h-14 text-base sm:text-lg backdrop-blur-sm transition-all hover:scale-105 group cursor-pointer"
            >
              <FoodsLink href="/catalog" className="flex items-center gap-2">
                Browse Catalogue
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1 text-brand-gold" />
              </FoodsLink>
            </Button>
          </div>
        </div>
      </div>

      {/* ──────────────────────────────────────────────
          DECORATIVE DRIFTING HARVEST BREEZE LINES
          ────────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-25" aria-hidden="true">
        <div
          className="absolute top-1/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-signal/40 to-transparent"
          style={{ animation: "harvestBreeze 4s linear infinite" }}
        />
        <div
          className="absolute top-2/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-gold/35 to-transparent"
          style={{ animation: "harvestBreeze 6s linear infinite 1.5s" }}
        />
        <div
          className="absolute top-3/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-signal/30 to-transparent"
          style={{ animation: "harvestBreeze 5s linear infinite 0.7s" }}
        />
      </div>

      {/* Sway & Breeze Keyframes */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes sway {
          0%, 100% { transform: rotate(-5deg) scale(1); }
          50% { transform: rotate(5deg) scale(1.06); }
        }
        @keyframes harvestBreeze {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `,
        }}
      />
    </div>
  );
}
