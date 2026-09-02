import { MessageCircle } from "lucide-react";
import { brand } from "@/content/site";
import { buildWhatsAppHref } from "@/lib/contact-links";

export function FloatingWhatsApp() {
  const whatsappHref = buildWhatsAppHref(brand.whatsapp);

  if (!whatsappHref) return null;

  return (
    <a
      href={whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-(--food) px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:brightness-105"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="size-4" />
      WhatsApp
    </a>
  );
}
