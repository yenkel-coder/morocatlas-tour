import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { to: "/qui-sommes-nous", label: "Qui sommes-nous" },
  { to: "/configurer", label: "Devis sur mesure" },
  { to: "/inspirations", label: "Inspirations" },
  { to: "/galerie", label: "Galerie" },
] as const;

const CONTACT_EMAIL = "info@marocatlastour.com";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-sand/95 backdrop-blur-md border-b border-night/10">
      <div className="max-w-7xl mx-auto px-6 md:px-8 h-16 md:h-20 flex items-center justify-between">
        <Link to="/" onClick={() => setOpen(false)} className="font-logo text-xl md:text-2xl uppercase text-night">
          marocatlastour
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-10 text-[12px] uppercase tracking-[0.2em] font-medium text-night">
          {NAV_ITEMS.map((item) => (
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
            Contact
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/configurer"
            className="btn-brand hidden sm:inline-flex"
          >
            Votre devis
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
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
              {NAV_ITEMS.map((item) => (
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
                Contact
              </a>
            </div>

            <div className="flex flex-col gap-3 border-t border-night/10 pt-4">
              <Link
                to="/configurer"
                onClick={() => setOpen(false)}
                className="btn-brand w-fit self-start text-[10px]"
              >
                Votre devis
              </Link>
              <div className="text-xs text-night/75 leading-relaxed">
                <p>
                  <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-clay transition-colors">
                    {CONTACT_EMAIL}
                  </a>
                </p>
                <p>+212 5 24 00 00 00</p>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
