"use client";

import { brand } from "@/content/site";
import HarobalLogo from "@/brand/Logo";
import { FoodsLink } from "@/components/pages/foods-link";
import { siteConfig } from "@/config/site";
import { buildTelHref, buildWhatsAppHref } from "@/lib/contact-links";

export function FoodsFooter() {
  const currentYear = new Date().getFullYear();
  const telHref = buildTelHref(brand.phone);
  const whatsappHref = buildWhatsAppHref(brand.whatsapp);

  return (
    <footer className="border-t border-white/10 bg-botanical-gradient text-white">
      <div className="container-shell grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <div className="w-fit rounded-md border border-white/15 bg-white/5 px-4 py-3">
            <HarobalLogo variant="dark-horizontal" size="sm" showDescriptor />
          </div>
          <p className="text-sm text-white/85">
            Export-ready foods and agri supply for importers, distributors, and retail procurement teams — structured around traceability, compliance discipline, and shipment-ready execution.
          </p>
          <p className="rounded-md border border-white/20 bg-white/10 px-3 py-2 text-xs text-white/80">
            Quote-led catalogue. Share destination market, incoterms, packaging format, and certification requirements for accurate quoting.
          </p>
          <a
            href={siteConfig.primarySiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm font-semibold text-white/85 hover:text-brand-gold"
          >
            Visit Harobal (Main site)
          </a>
        </div>

        <div className="space-y-3">
          <h4 className="font-semibold text-white">Explore</h4>
          <ul className="space-y-2 text-sm text-white/82">
            <li><FoodsLink href="/catalog" className="hover:text-secondary">Catalogue</FoodsLink></li>
            <li><FoodsLink href="/knowledge" className="hover:text-secondary">Product knowledge</FoodsLink></li>
            <li><FoodsLink href="/quality" className="hover:text-secondary">Quality</FoodsLink></li>
            <li><FoodsLink href="/logistics" className="hover:text-secondary">Logistics</FoodsLink></li>
            <li><FoodsLink href="/services" className="hover:text-secondary">Services</FoodsLink></li>
            <li><FoodsLink href="/downloads" className="hover:text-secondary">Downloads</FoodsLink></li>
            <li><FoodsLink href="/suppliers" className="hover:text-secondary">Suppliers</FoodsLink></li>
            <li><FoodsLink href="/contact" className="hover:text-secondary">Contact</FoodsLink></li>
            <li><FoodsLink href="/rfq" className="hover:text-secondary">Send RFQ</FoodsLink></li>
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="font-semibold text-white">What We Supply</h4>
          <ul className="space-y-2 text-sm text-white/82">
            <li className="rounded-md border border-white/15 bg-white/10 px-3 py-2 text-xs">
              Fresh: fruits and vegetables aligned to seasonality calendars, grading, and cold-chain handling.
            </li>
            <li className="rounded-md border border-white/15 bg-white/10 px-3 py-2 text-xs">
              Shelf-stable: spices, herbs, grains, pulses, oilseeds, nuts, and value-added processed formats.
            </li>
            <li className="rounded-md border border-white/15 bg-white/10 px-3 py-2 text-xs">
              Programs: batch-level QC options, documentation discipline, and buyer-aligned packaging formats.
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="font-semibold text-white">Contact Desk</h4>
          <ul className="space-y-2 text-sm text-white/82">
            <li><a href={`mailto:${brand.salesEmail}`} className="hover:text-secondary">{brand.salesEmail}</a></li>
            <li><a href={`mailto:${brand.email}`} className="hover:text-secondary">{brand.email}</a></li>
            {telHref ? (
              <li><a href={telHref} className="hover:text-secondary">{brand.phone}</a></li>
            ) : null}
            {whatsappHref ? (
              <li><a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="hover:text-secondary">WhatsApp RFQ Desk</a></li>
            ) : null}
            <li className="text-xs text-white/70">Global Food Commodity Export Desk</li>
          </ul>

          <div className="rounded-md border border-white/20 bg-white/10 px-3 py-2 text-xs text-white/75">
            For accurate quoting, include destination port, incoterms, packaging, and required certifications.
          </div>
        </div>
      </div>

      <div className="border-t border-white/15 bg-black/10">
        <div className="container-shell flex flex-col gap-2 py-4 text-xs text-white/70 sm:flex-row sm:justify-between">
          <p>© {currentYear} {brand.legalName}. All rights reserved.</p>
          <p className="flex flex-wrap items-center gap-2"><a href={`${siteConfig.primarySiteUrl}/privacy-policy`} className="hover:text-secondary">Privacy</a><span aria-hidden>·</span><a href={`${siteConfig.primarySiteUrl}/terms`} className="hover:text-secondary">Terms</a><span className="hidden sm:inline" aria-hidden>·</span><span>Quote-led supply with compliance and documentation alignment.</span></p>
        </div>
      </div>
    </footer>
  );
}
