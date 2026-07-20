import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="border-t border-night/10 mt-16 md:mt-20">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2 space-y-4">
          <div className="font-logo text-2xl uppercase text-night">marocatlastour</div>
          <p className="text-sm text-night/75 max-w-sm leading-relaxed">
            Créateurs de circuits sur mesure au Maroc. Une approche artisanale du voyage,
            tissée selon votre rythme.
          </p>
        </div>
        <div>
          <p className="label-eyebrow mb-4">Explorer</p>
          <ul className="space-y-3 text-sm">
            <li><Link to="/qui-sommes-nous" className="hover:text-clay transition-colors">Qui sommes-nous</Link></li>
            <li><Link to="/configurer" className="hover:text-clay transition-colors">Devis sur mesure</Link></li>
            <li><Link to="/inspirations" className="hover:text-clay transition-colors">Inspirations</Link></li>
            <li><Link to="/galerie" className="hover:text-clay transition-colors">Galerie</Link></li>
            <li><a href="mailto:info@marocatlastour.com" className="hover:text-clay transition-colors">Contact</a></li>
          </ul>
        </div>
        <div>
          <p className="label-eyebrow mb-4">Contact</p>
          <ul className="space-y-3 text-sm text-night/80">
            <li>
              <a href="mailto:info@marocatlastour.com" className="hover:text-clay transition-colors">
                info@marocatlastour.com
              </a>
            </li>
            <li>+212 5 24 00 00 00</li>
            <li>Marrakech — Maroc</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-night/10">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-6 flex justify-between items-center text-[10px] uppercase tracking-[0.22em] text-night/40">
          <span>© {new Date().getFullYear()} marocatlastour Travel</span>
          <span>Fait à Marrakech</span>
        </div>
      </div>
    </footer>
  );
}
