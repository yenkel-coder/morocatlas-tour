import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { blogPosts, pickBlog } from "@/lib/blog";
import { useLanguage } from "@/lib/i18n";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog — Guides et conseils voyage au Maroc | marocatlastour" },
      { name: "description", content: "Nos guides pratiques pour préparer votre voyage au Maroc : itinéraires, meilleures périodes, villes et régions à découvrir." },
    ],
  }),
  component: BlogPage,
});

const TEXT = {
  fr: {
    eyebrow: "Blog",
    title: "Conseils & inspirations.",
    body: "Nos guides pratiques pour préparer votre voyage au Maroc — avant même de composer votre itinéraire sur mesure.",
    readMore: "Lire l'article →",
    cta: "Composer mon voyage →",
  },
  en: {
    eyebrow: "Blog",
    title: "Guides & inspiration.",
    body: "Our practical guides to help you prepare your trip to Morocco — before you even start building your tailor-made itinerary.",
    readMore: "Read the article →",
    cta: "Design my trip →",
  },
} as const;

function BlogPage() {
  const { language } = useLanguage();
  const t = TEXT[language];

  return (
    <div className="min-h-screen bg-sand text-night">
      <SiteHeader />
      <main className="pt-32 px-6 md:px-8 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-16 animate-fade-up">
            <p className="label-eyebrow text-clay mb-4">{t.eyebrow}</p>
            <h1 className="font-serif text-5xl md:text-6xl mb-6 text-balance">{t.title}</h1>
            <p className="text-lg text-night/65 leading-relaxed">{t.body}</p>
          </div>
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                to="/blog/$slug"
                params={{ slug: post.slug }}
                className="group block"
              >
                <article>
                  <div className="overflow-hidden mb-6 aspect-[4/5]">
                    <img
                      src={post.image}
                      alt={pickBlog(post.imageAlt, language)}
                      width={1024}
                      height={1280}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <p className="label-eyebrow text-clay mb-2">
                    {pickBlog(post.eyebrow, language)} · {pickBlog(post.readTime, language)}
                  </p>
                  <h3 className="font-serif text-2xl mb-2 group-hover:text-clay transition-colors">
                    {pickBlog(post.title, language)}
                  </h3>
                  <p className="text-night/65 text-sm leading-relaxed mb-3">
                    {pickBlog(post.excerpt, language)}
                  </p>
                  <p className="text-sm font-medium text-clay">{t.readMore}</p>
                </article>
              </Link>
            ))}
          </div>
          <div className="mt-20 text-center">
            <Link
              to="/configurer"
              search={{ etape: 1 }}
              className="inline-flex items-center gap-2 bg-clay text-sand px-8 py-4 rounded-xl font-medium hover:bg-clay/90 transition-colors"
            >
              {t.cta}
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
