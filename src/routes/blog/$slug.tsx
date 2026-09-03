import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { getBlogPostBySlug, pickBlog } from "@/lib/blog";
import { useLanguage } from "@/lib/i18n";

export const Route = createFileRoute("/blog/$slug")({
  head: ({ params }) => {
    const post = getBlogPostBySlug(params.slug);
    return {
      meta: [
        { title: post ? `${post.title.fr} — marocatlastour` : "Article introuvable" },
        { name: "description", content: post?.excerpt.fr ?? "" },
      ],
    };
  },
  loader: ({ params }) => {
    const post = getBlogPostBySlug(params.slug);
    if (!post) throw notFound();
    return post;
  },
  component: BlogDetailPage,
});

const TEXT = {
  fr: { back: "← Tous les articles", cta: "Composer mon voyage sur mesure →" },
  en: { back: "← All articles", cta: "Design my tailor-made trip →" },
} as const;

function BlogDetailPage() {
  const post = Route.useLoaderData();
  const { language } = useLanguage();
  const t = TEXT[language];

  return (
    <div className="min-h-screen bg-sand text-night">
      <SiteHeader />

      {/* Hero */}
      <div className="relative h-[50vh] overflow-hidden">
        <img
          src={post.image}
          alt={pickBlog(post.imageAlt, language)}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-night/50" />
        <div className="absolute inset-0 flex flex-col justify-end px-6 pb-12 md:px-16">
          <p className="label-eyebrow text-sand/70 mb-2">
            {pickBlog(post.eyebrow, language)} · {pickBlog(post.readTime, language)}
          </p>
          <h1 className="font-serif text-3xl md:text-5xl text-sand max-w-3xl">{pickBlog(post.title, language)}</h1>
        </div>
      </div>

      <main className="max-w-3xl mx-auto px-6 md:px-8 py-16">
        <div className="space-y-10 text-night/80 leading-relaxed text-[15px] md:text-base">
          {post.content.map((section, i) => (
            <section key={i}>
              {section.heading && (
                <h2 className="font-serif text-2xl text-night mb-4">{pickBlog(section.heading, language)}</h2>
              )}
              {section.paragraphs.map((p, j) => (
                <p key={j} className="mb-4">{pickBlog(p, language)}</p>
              ))}
            </section>
          ))}
        </div>

        <div className="mt-16 pt-10 border-t border-night/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <Link to="/blog" className="text-sm text-night/50 hover:text-clay transition-colors">
            {t.back}
          </Link>
          <Link
            to="/configurer"
            search={{ etape: 1 }}
            className="inline-flex items-center gap-2 bg-clay text-sand px-8 py-4 rounded-xl font-medium hover:bg-clay/90 transition-colors whitespace-nowrap"
          >
            {t.cta}
          </Link>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
