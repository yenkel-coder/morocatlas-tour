import { Link } from "@tanstack/react-router";
import logo from "../assets/logo.png";
import { useLanguage } from "../lib/i18n";

const NAV = {
  fr: { qui: "À propos", devis: "Devis sur mesure", inspirations: "Inspirations", galerie: "Galerie", blog: "Blog", contact: "Contact" },
  en: { qui: "About us", devis: "Tailor-made quote", inspirations: "Inspirations", galerie: "Gallery", blog: "Blog", contact: "Contact" },
} as const;

export function SiteFooter() {
  const { language } = useLanguage();
  const nav = NAV[language];
  const t = language === "fr"
    ? {
        tagline: "Créateurs de circuits sur mesure au Maroc. Une approche artisanale du voyage, tissée selon votre rythme.",
        explore: "Explorer",
        contactLabel: "Contact",
        location: "Marrakech — Maroc",
        legal: "Mentions légales",
        cgv: "CGV",
        madeIn: "Fait à Marrakech",
      }
    : {
        tagline: "Tailor-made journey designers in Morocco. An artisanal approach to travel, woven to your own pace.",
        explore: "Explore",
        contactLabel: "Contact",
        location: "Marrakech — Morocco",
        legal: "Legal notice",
        cgv: "Terms",
        madeIn: "Made in Marrakech",
      };

  return (
    <footer className="border-t border-night/10 mt-16 md:mt-20">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2 space-y-4">
          <img src={logo} alt="marocatlastour" className="h-9 w-auto" />
          <p className="text-sm text-night/75 max-w-sm leading-relaxed">{t.tagline}</p>
        </div>
        <div>
          <p className="label-eyebrow mb-4">{t.explore}</p>
          <ul className="space-y-3 text-sm">
            <li><Link to="/qui-sommes-nous" className="hover:text-clay transition-colors">{nav.qui}</Link></li>
            <li><Link to="/configurer" className="hover:text-clay transition-colors">{nav.devis}</Link></li>
            <li><Link to="/inspirations" className="hover:text-clay transition-colors">{nav.inspirations}</Link></li>
            <li><Link to="/galerie" className="hover:text-clay transition-colors">{nav.galerie}</Link></li>
            <li><Link to="/blog" className="hover:text-clay transition-colors">{nav.blog}</Link></li>
            <li><a href="mailto:contact@marocatlastour.com" className="hover:text-clay transition-colors">{nav.contact}</a></li>
          </ul>
        </div>
        <div>
          <p className="label-eyebrow mb-4">{t.contactLabel}</p>
          <ul className="space-y-3 text-sm text-night/80">
            <li>
              <a href="mailto:contact@marocatlastour.com" className="hover:text-clay transition-colors">
                contact@marocatlastour.com
              </a>
            </li>
            <li>
              <a href="tel:+33780390269" className="hover:text-clay transition-colors">
                +33 7 80 39 02 69
              </a>
            </li>
            <li>{t.location}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-night/10">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-[10px] uppercase tracking-[0.22em] text-night/40">
          <span>© {new Date().getFullYear()} marocatlastour Travel</span>
          <div className="flex items-center gap-4">
            <Link to="/mentions-legales" className="hover:text-clay transition-colors">{t.legal}</Link>
            <Link to="/cgv" className="hover:text-clay transition-colors">{t.cgv}</Link>
          </div>
          <span>{t.madeIn}</span>
        </div>
      </div>
    </footer>
  );
}
