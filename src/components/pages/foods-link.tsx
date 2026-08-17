"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { buildFoodsHref, getFoodsBasePathFromPathname } from "@/lib/routing";

type FoodsLinkProps = Omit<React.ComponentProps<typeof Link>, "href"> & {
  href: string;
};

function isSpecialHref(href: string) {
  return (
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    href.startsWith("#")
  );
}

export function FoodsLink({ href, ...props }: FoodsLinkProps) {
  const pathname = usePathname();
  const base = getFoodsBasePathFromPathname(pathname ?? "");

  const resolvedHref = isSpecialHref(href) ? href : buildFoodsHref(base, href);

  return <Link href={resolvedHref} {...props} />;
}
