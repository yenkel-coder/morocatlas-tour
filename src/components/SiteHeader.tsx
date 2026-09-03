import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "../assets/logo.svg";
import { useLanguage } from "../lib/i18n";

const NAV_ITEMS = {
  fr: [
    { to: "/qui-sommes-nous", label: "À propos" },
    { to: "/configurer", label: "Devis sur mesure" },
    { to: "/inspirations", label: "Inspirations" },
    { to: "/galerie", label: "Galerie" },
  ],
  en: [
    { to: "/qui-sommes-nous", label: "About us" },
    { to: "/configurer", label: "Tailor-made quote" },
    { to: "/inspirations", label: "Inspirations" },
    { to: "/galerie", label: "Gallery" },
  ],
} as const;

const CONTACT_EMAIL = "contact@marocatlastour.com";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { language, toggleLanguage } = useLanguage();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const t = language === "fr"
    ? { contact: "Contact", cta: "Votre devis", closeMenu: "Fermer le menu", openMenu: "Ouvrir le menu" }
    : { contact: "Contact", cta: "Your quote", closeMenu: "Close menu", openMenu: "Open menu" };

  const navItems = NAV_ITEMS[language];

  const LangToggle = ({ className = "" }: { className?: string }) => (
    <button
      type="button"
      onClick={toggleLanguage}
      aria-label="Switch language"
      className={`text-[11px] tracking-[0.15em] font-medium text-night/60 hover:text-clay transition-colors ${className}`}
    >
      <span className={language === "fr" ? "text-clay" : ""}>FR</span>
      <span className="mx-1 text-night/30">·</span>
      <span className={language === "en" ? "text-clay" : ""}>EN</span>
    </button>
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-sand/95 backdrop-blur-md border-b border-night/10">
      <div className="max-w-7xl mx-auto px-6 md:px-8 h-16 md:h-20 flex items-center justify-between">
        <Link to="/" onClick={() => setOpen(false)} className="flex items-center">
          <img src={logo} alt="marocatlastour" className="h-8 md:h-10 w-auto" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-10 text-[12px] uppercase tracking-[0.2em] font-medium text-night">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeProps={{ className: "text-clay" }}
              className="hover:text-clay transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="hover:text-clay transition-colors"
          >
            {t.contact}
          </a>
          <LangToggle />
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/configurer"
            className="btn-brand hidden sm:inline-flex"
          >
            {t.cta}
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? t.closeMenu : t.openMenu}
            aria-expanded={open}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 -mr-2 text-night hover:text-clay transition-colors"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile fullscreen panel */}
      {open && (
        <div className="lg:hidden fixed inset-x-0 top-16 bottom-0 z-50 bg-sand shadow-2xl">
          <nav className="grid h-[calc(100svh-4rem)] grid-rows-[1fr_auto] overflow-hidden bg-sand px-6 py-4">
            <div className="flex flex-col">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  activeProps={{ className: "text-clay" }}
                  className="font-serif text-lg leading-tight py-2.5 border-b border-night/10 text-night hover:text-clay transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                onClick={() => setOpen(false)}
                className="font-serif text-lg leading-tight py-2.5 border-b border-night/10 text-night hover:text-clay transition-colors"
              >
                {t.contact}
              </a>
            </div>

            <div className="flex flex-col gap-3 border-t border-night/10 pt-4">
              <Link
                to="/configurer"
                onClick={() => setOpen(false)}
                className="btn-brand w-fit self-start text-[10px]"
              >
                {t.cta}
              </Link>
              <div className="text-xs text-night/75 leading-relaxed">
                <p>
                  <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-clay transition-colors">
                    {CONTACT_EMAIL}
                  </a>
                </p>
                <p>
                  <a href="tel:+33780390269" className="hover:text-clay transition-colors">
                    +33 7 80 39 02 69
                  </a>
                </p>
              </div>
              <LangToggle className="pt-2" />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
