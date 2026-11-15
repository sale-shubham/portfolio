import { DEFAULT_WHATSAPP_TEXT, whatsappLink } from "@/data/profile";
import { WhatsAppIcon } from "./icons";

export function WhatsAppButton() {
  return (
    <a
      href={whatsappLink(DEFAULT_WHATSAPP_TEXT)}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed right-5 bottom-5 z-[160] flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-8px_rgb(0_0_0/0.6)] transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white md:right-6 md:bottom-6"
    >
      <WhatsAppIcon width={28} height={28} />
    </a>
  );
}
