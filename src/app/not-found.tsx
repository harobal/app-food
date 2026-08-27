import { ArrowRight, Compass, Search } from "lucide-react";
import { FoodsLink } from "@/components/pages/foods-link";
import { Button } from "@/components/ui/button";

export const metadata = { title: { absolute: "Page Not Found | Harobal Foods" }, description: "The requested Harobal Foods page could not be located.", robots: { index: false, follow: false } };

export default function GlobalNotFound() {
  return <main className="relative isolate flex min-h-[calc(100vh-7rem)] items-center overflow-hidden bg-brand-ink text-white">
    <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,25,20,.97),rgba(7,25,20,.76),rgba(7,25,20,.28)),url('/media/harvest-meridian/foods-export-hero.webp')] bg-cover bg-center" aria-hidden />
    <div className="container-shell relative py-16 sm:py-24">
      <div className="max-w-2xl">
        <p className="text-xs font-bold uppercase tracking-[.22em] text-brand-gold">404 · Route unavailable</p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-6xl">This sourcing route could not be found.</h1>
        <p className="mt-5 max-w-xl text-base leading-7 text-white/72">The page may have moved, or the product link may no longer be current. Continue through the catalogue or send the sourcing desk a custom requirement.</p>
        <div className="mt-8 flex flex-wrap gap-3"><Button asChild className="bg-accent text-accent-foreground hover:bg-[#d9a748]"><FoodsLink href="/catalog"><Search className="size-4" /> Browse catalogue</FoodsLink></Button><Button asChild variant="outline" className="border-white/25 bg-white/5 text-white hover:bg-white/12 hover:text-white"><FoodsLink href="/rfq"><Compass className="size-4" /> Open RFQ</FoodsLink></Button></div>
        <FoodsLink href="/contact" className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-white/75 hover:text-brand-gold">Ask the sourcing desk <ArrowRight className="size-4" /></FoodsLink>
      </div>
    </div>
  </main>;
}
