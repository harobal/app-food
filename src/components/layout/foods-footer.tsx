"use client";

import Image from "next/image";
import { brand } from "@/content/site";
import { FoodsLink } from "@/components/pages/foods-link";
import { siteConfig } from "@/config/site";
import { buildTelHref, buildWhatsAppHref } from "@/lib/contact-links";

export function FoodsFooter() {
  const currentYear = new Date().getFullYear();
  const telHref = buildTelHref(brand.phone);
  const whatsappHref = buildWhatsAppHref(brand.whatsapp);

  return (
    <footer
      className="border-t border-white/10 text-white"
      style={{
        backgroundImage:
          "radial-gradient(circle at top left, color-mix(in srgb, var(--food) 28%, transparent), transparent 55%), radial-gradient(circle at bottom right, color-mix(in srgb, var(--accent) 16%, transparent), transparent 60%), linear-gradient(130deg, color-mix(in srgb, var(--primary) 80%, black), var(--primary) 55%, var(--accent) 100%)",
      }}
    >
      <div className="container-shell grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <div className="w-fit rounded-md border border-white/15 bg-white/5 px-3 py-2">
            <Image
              src="/brand/logo-wordmark-light.png"
              alt={brand.name}
              width={260}
              height={72}
              sizes="(max-width: 640px) 200px, 240px"
              className="h-10 w-auto sm:h-11"
            />
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
            className="inline-flex items-center text-sm font-semibold text-white/85 hover:text-secondary"
          >
            Visit Harobal Ventures (Main site)
          </a>
        </div>

        <div className="space-y-3">
          <h4 className="font-semibold text-white">Explore</h4>
          <ul className="space-y-2 text-sm text-white/82">
            <li><FoodsLink href="/catalog" className="hover:text-secondary">Catalogue</FoodsLink></li>
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
            <li className="text-xs text-white/70">{brand.businessHours}</li>
          </ul>

          <div className="rounded-md border border-white/20 bg-white/10 px-3 py-2 text-xs text-white/75">
            For accurate quoting, include destination port, incoterms, packaging, and required certifications.
          </div>
        </div>
      </div>

      <div className="border-t border-white/15 bg-black/10">
        <div className="container-shell flex flex-col gap-2 py-4 text-xs text-white/70 sm:flex-row sm:justify-between">
          <p>© {currentYear} {brand.legalName}. All rights reserved.</p>
          <p>Quote-led supply with compliance and documentation alignment.</p>
        </div>
      </div>
    </footer>
  );
}

