import { useLanguage } from "../lib/i18n";

const WHATSAPP_NUMBER = "33780390269";
const WHATSAPP_MESSAGE = {
  fr: "Bonjour, je souhaite en savoir plus sur un voyage sur mesure au Maroc.",
  en: "Hello, I'd like to learn more about a tailor-made trip to Morocco.",
} as const;

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function WhatsAppFloat() {
  const { language } = useLanguage();
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE[language])}`;
  const label = language === "fr" ? "Contactez-nous sur WhatsApp" : "Contact us on WhatsApp";

  const handleClick = () => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "whatsapp_click",
      whatsapp_location: "floating_button",
      page_path: window.location.pathname,
    });
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      onClick={handleClick}
      className="fixed bottom-5 right-5 md:bottom-6 md:right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg transition-transform hover:scale-105"
    >
      <svg
        viewBox="0 0 32 32"
        aria-hidden="true"
        className="h-7 w-7 fill-white"
      >
        <path d="M16.004 3C9.377 3 4 8.373 4 15c0 2.34.665 4.523 1.816 6.377L4 29l7.82-1.775A11.94 11.94 0 0 0 16.004 27C22.63 27 28 21.627 28 15S22.63 3 16.004 3Zm0 21.75c-1.98 0-3.83-.564-5.4-1.539l-.387-.234-4.64 1.053 1.08-4.523-.253-.402A9.72 9.72 0 0 1 5.25 15c0-5.93 4.822-10.75 10.754-10.75S26.758 9.07 26.758 15 21.936 24.75 16.004 24.75Zm5.906-8.062c-.322-.161-1.906-.941-2.202-1.049-.295-.107-.51-.161-.725.161-.215.322-.833 1.049-1.021 1.264-.188.215-.376.242-.698.081-.322-.161-1.36-.502-2.591-1.605-.958-.855-1.605-1.911-1.793-2.233-.188-.322-.02-.496.141-.657.145-.144.322-.376.483-.564.161-.188.215-.322.322-.537.107-.215.054-.403-.027-.564-.081-.161-.725-1.751-.994-2.398-.262-.63-.528-.545-.725-.555-.188-.009-.403-.011-.618-.011-.215 0-.564.081-.859.403-.295.322-1.128 1.103-1.128 2.69 0 1.587 1.155 3.121 1.316 3.336.161.215 2.273 3.472 5.507 4.868.77.332 1.37.531 1.838.679.772.245 1.475.211 2.03.128.619-.092 1.906-.78 2.175-1.533.269-.752.269-1.396.188-1.533-.081-.136-.295-.215-.618-.376Z" />
      </svg>
    </a>
  );
}
