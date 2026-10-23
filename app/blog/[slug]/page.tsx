import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { getAllBlogs, getBlogBySlug, getJobBySlug } from "@/lib/jobs";
import { formatDate } from "@/lib/utils";
import { ArticleSchema } from "@/components/ArticleSchema";
import { 
  BookOpen, 
  Clock, 
  Calendar, 
  ChevronRight, 
  User, 
  Share2, 
  MessageSquare, 
  Send, 
  ArrowLeft,
  ExternalLink,
  FileText,
  ShieldCheck,
  Building2,
  CheckCircle2,
  MapPin
} from "lucide-react";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const blogs = getAllBlogs();
  return blogs.map((b) => ({
    slug: b.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = getBlogBySlug(params.slug);
  if (!post) {
    return { title: "Article Not Found | zovyn.in" };
  }

  const pageTitle = `${post.title} | zovyn.in`;

  return {
    title: pageTitle,
    description: post.excerpt,
    alternates: {
      canonical: `https://zovyn.in/blog/${post.slug}`,
    },
    openGraph: {
      title: pageTitle,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author],
      images: [
        {
          url: post.imageUrl || "https://zovyn.in/og-blog.png",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: post.excerpt,
      images: [post.imageUrl || "https://zovyn.in/og-blog.png"],
    },
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getBlogBySlug(params.slug);
  if (!post) {
    notFound();
  }

  const pageUrl = `https://zovyn.in/blog/${post.slug}`;
  const relatedJobs = (post.relatedJobSlugs || [])
    .map((s) => getJobBySlug(s))
    .filter(Boolean);

  const shareText = encodeURIComponent(
    `📢 *${post.title}*\n\n${post.teluguTitle ? `👉 ${post.teluguTitle}\n\n` : ""}${post.excerpt.slice(0, 160)}...\n\n🔗 పూర్తి సమాచారం & అప్లై లింక్ ఇక్కడ చూడండి:\n${pageUrl}`
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      <ArticleSchema post={post} url={pageUrl} />

      {/* Breadcrumbs */}
      <nav className="text-xs text-slate-500 flex items-center gap-1.5 flex-wrap">
        <Link href="/" className="hover:underline">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/blog" className="hover:underline">Blog &amp; Guides</Link>
        {post.state && (
          <>
            <ChevronRight className="w-3 h-3" />
            <Link href={`/state/${post.state.toLowerCase().replace(/\s+/g, "-")}`} className="hover:underline">
              {post.state}
            </Link>
          </>
        )}
        <ChevronRight className="w-3 h-3" />
        <span className="text-slate-800 dark:text-slate-200 font-semibold truncate max-w-xs">{post.title}</span>
      </nav>

      {/* Hero Visual Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm space-y-6">
        {/* Banner image */}
        {post.imageUrl && (
          <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="p-6 sm:p-8 space-y-5">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="font-bold text-brand-700 bg-brand-50 dark:bg-brand-950 dark:text-brand-300 px-3 py-1 rounded-full border border-brand-200 dark:border-brand-800">
              {post.category}
            </span>
            {post.language === "bilingual" && (
              <span className="font-bold text-amber-800 bg-amber-50 dark:bg-amber-950 dark:text-amber-300 px-3 py-1 rounded-full border border-amber-300">
                తెలుగు + English
              </span>
            )}
            {post.state && (
              <span className="flex items-center gap-1 text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full font-semibold">
                <MapPin className="w-3 h-3" />
                {post.state}
              </span>
            )}
            <span className="text-slate-500 flex items-center gap-1 ml-auto">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime}
            </span>
          </div>

          {/* Telugu Title Highlight if present */}
          {post.teluguTitle && (
            <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/80 rounded-2xl p-4">
              <span className="text-[11px] font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider block mb-1">
                తెలుగు సమాచారం / Regional Language Notification
              </span>
              <h2 className="text-base sm:text-xl font-bold text-slate-900 dark:text-amber-100 leading-snug">
                {post.teluguTitle}
              </h2>
            </div>
          )}

          {/* English Main Title */}
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-snug">
            {post.title}
          </h1>

          {/* Author & Published Date */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-brand-600" />
              <span>By <strong>{post.author}</strong></span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {formatDate(post.publishedAt)}
              </span>
            </div>

            {/* Viral Share Buttons */}
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-400 flex items-center gap-1">
                <Share2 className="w-3.5 h-3.5" /> షేర్ చేయండి:
              </span>
              <a
                href={`https://api.whatsapp.com/send?text=${shareText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 py-1.5 rounded-lg inline-flex items-center gap-1 transition"
              >
                <MessageSquare className="w-3.5 h-3.5" /> WhatsApp
              </a>
              <a
                href={`https://t.me/share/url?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(post.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-sky-500 hover:bg-sky-400 text-white font-bold px-3 py-1.5 rounded-lg inline-flex items-center gap-1 transition"
              >
                <Send className="w-3.5 h-3.5" /> Telegram
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Official Links Banner if available */}
      {(post.applyUrl || post.notificationPdfUrl) && (
        <div className="bg-gradient-to-r from-brand-50 to-indigo-50 dark:from-slate-900 dark:to-indigo-950 border border-brand-200 dark:border-brand-800 rounded-3xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0" />
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                అధికారిక రిక్రూట్‌మెంట్ లింకులు (Official Direct Links)
              </h3>
              <p className="text-xs text-slate-500">
                100% Verified Government Portal Links
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            {post.applyUrl && (
              <a
                href={post.applyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none text-center bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition inline-flex items-center justify-center gap-1.5 shadow"
              >
                <span>Apply Online</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            {post.notificationPdfUrl && (
              <a
                href={post.notificationPdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none text-center bg-white dark:bg-slate-800 hover:bg-slate-100 text-slate-800 dark:text-white font-semibold text-xs px-4 py-2.5 rounded-xl transition inline-flex items-center justify-center gap-1.5 border border-slate-300 dark:border-slate-700"
              >
                <FileText className="w-3.5 h-3.5 text-red-500" />
                <span>PDF Download</span>
              </a>
            )}
          </div>
        </div>
      )}

      {/* Article Content with Markdown formatting */}
      <article className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-sm prose prose-slate dark:prose-invert max-w-none text-slate-800 dark:text-slate-200 leading-relaxed text-sm sm:text-base space-y-4">
        <div 
          className="whitespace-pre-line overflow-x-auto [&_table]:w-full [&_table]:border-collapse [&_table]:text-xs sm:[&_table]:text-sm [&_th]:border [&_th]:border-slate-300 dark:[&_th]:border-slate-700 [&_th]:bg-slate-100 dark:[&_th]:bg-slate-800 [&_th]:p-2.5 [&_th]:text-left [&_td]:border [&_td]:border-slate-200 dark:[&_td]:border-slate-800 [&_td]:p-2.5 [&_tr:nth-child(even)]:bg-slate-50/50 dark:[&_tr:nth-child(even)]:bg-slate-800/40"
        >
          {post.content}
        </div>
      </article>

      {/* Related Active Vacancies */}
      {relatedJobs.length > 0 && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Building2 className="w-4 h-4 text-brand-600" />
              <span>సంబంధిత యాక్టివ్ నోటిఫికేషన్లు (Related Active Job Circulars)</span>
            </h3>
            <span className="text-xs bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold px-2.5 py-0.5 rounded-full">
              Applications Open
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedJobs.map((rj) => rj && (
              <div
                key={rj.id}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col justify-between"
              >
                <div>
                  <span className="text-[11px] font-bold text-brand-600 dark:text-brand-400 block truncate">
                    {rj.organization}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-2 mt-1">
                    {rj.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-2">
                    {rj.vacancies} Posts • Last: {formatDate(rj.importantDates.lastDate)}
                  </p>
                </div>
                <div className="pt-3 mt-3 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
                  <Link
                    href={`/jobs/${rj.slug}`}
                    className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline"
                  >
                    View Notification
                  </Link>
                  <a
                    href={rj.applyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg"
                  >
                    Apply Now
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Back button */}
      <div className="pt-2">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-brand-600 dark:text-brand-400 hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          అన్ని సిలబస్ &amp; గైడ్ల జాబితాకు తిరిగి వెళ్లండి (Back to All Guides)
        </Link>
      </div>
    </div>
  );
}
