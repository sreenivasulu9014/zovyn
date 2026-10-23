import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { getAllBlogs } from "@/lib/jobs";
import { formatDate } from "@/lib/utils";
import { BookOpen, Calendar, Clock, ArrowRight, Sparkles, MessageSquare, Send, CheckCircle2, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Sarkari Exam Syllabus, AP & TS Telugu Job Guides & IT Careers | zovyn.in",
  description:
    "Free Telugu & English preparation roadmaps, APPSC Group 2, AP DSC Teacher, AP Police, TGPSC Group 1 syllabus breakdowns, cutoff analysis, and IT career guidance.",
  alternates: {
    canonical: "https://zovyn.in/blog",
  },
};

export default function BlogListingPage() {
  const blogs = getAllBlogs();
  const teluguGuides = blogs.filter((b) => b.language === "bilingual" || b.state === "Andhra Pradesh" || b.state === "Telangana");
  const otherGuides = blogs.filter((b) => b.state === "All India");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Editorial Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-950 dark:to-indigo-950 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide">
          <BookOpen className="w-4 h-4 text-brand-600" />
          <span>zovyn Career Editorial Hub • తెలుగు ఉద్యోగ మార్గదర్శి</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
          Exam Patterns, Telugu Job Guides &amp; Career Roadmaps
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
          Comprehensive, verified study plans, revised AP &amp; TS notification breakdowns, official syllabus, and tech interview guidance prepared by career mentors.
        </p>

        {/* Quick Language Highlights */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs">
          <span className="bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200 font-bold px-3 py-1 rounded-full border border-amber-300">
            🔥 ఆంధ్రప్రదేశ్ &amp; తెలంగాణ ఉద్యోగ సమాచారం (Telugu Guides)
          </span>
          <span className="bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200 font-bold px-3 py-1 rounded-full border border-emerald-300">
            ✓ 100% Official Notifications
          </span>
          <span className="bg-blue-100 text-blue-900 dark:bg-blue-950 dark:text-blue-200 font-bold px-3 py-1 rounded-full border border-blue-300">
            ⚡ Direct Apply &amp; PDF Links
          </span>
        </div>
      </div>

      {/* Telegram & WhatsApp Sticky Community Alert */}
      <div className="bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            <span>డైలీ తెలుగు జాబ్ అలర్ట్స్ (Daily Telugu Job Alerts)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black">
            ఆంధ్రప్రదేశ్ &amp; తెలంగాణ తాజా జాబ్ నోటిఫికేషన్లు మీ మొబైల్‌లోనే పొందండి!
          </h2>
          <p className="text-xs sm:text-sm text-indigo-100 max-w-2xl leading-relaxed">
            APPSC, AP DSC, AP Police, TGPSC, రైల్వే, బ్యాంకింగ్ మరియు ప్రైవేట్ సాఫ్ట్‌వేర్ ఉద్యోగాల అలర్ట్స్ నేరుగా మీ వాట్సాప్ మరియు టెలిగ్రామ్ గ్రూపుల్లో ఉచితంగా అందుతాయి.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <a
            href="https://t.me/zovyn_jobs"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-brand-700 hover:bg-slate-100 font-bold px-5 py-3 rounded-xl text-xs sm:text-sm shadow-md transition"
          >
            <Send className="w-4 h-4 text-sky-500" />
            <span>Join Telegram</span>
          </a>
          <a
            href="https://chat.whatsapp.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white font-bold px-5 py-3 rounded-xl text-xs sm:text-sm shadow-md transition"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Join WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Featured Telugu Recruitment Guides Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <MapPin className="w-5 h-5 text-amber-500" />
              <span>Andhra Pradesh &amp; Telangana Special Coverage (తెలుగు)</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              రాష్ట్ర స్థాయి పోస్టులు, డీఎస్సీ ఉపాధ్యాయ నియామకాలు, గ్రూప్స్ మరియు పోలీస్ ఉద్యోగాల పూర్తి వివరాలు
            </p>
          </div>
          <span className="text-xs font-bold bg-amber-50 text-amber-800 dark:bg-amber-950 dark:text-amber-300 px-3 py-1 rounded-lg border border-amber-200">
            {teluguGuides.length} Telugu Guides
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teluguGuides.map((post) => (
            <article
              key={post.id}
              className="group bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-2xl hover:border-brand-500/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Visual Banner Image */}
                <Link href={`/blog/${post.slug}`} className="block relative aspect-video overflow-hidden bg-slate-900">
                  {post.imageUrl ? (
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-indigo-900 via-slate-900 to-purple-900 flex items-center justify-center text-white font-bold p-4 text-center">
                      {post.title}
                    </div>
                  )}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="bg-amber-500 text-slate-950 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md shadow">
                      తెలుగు + English
                    </span>
                    {post.state && (
                      <span className="bg-slate-900/80 backdrop-blur text-white text-[10px] font-bold px-2 py-1 rounded-md">
                        {post.state}
                      </span>
                    )}
                  </div>
                </Link>

                <div className="p-6">
                  {/* Category & Read Time */}
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                    <span className="font-bold text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950 px-2.5 py-1 rounded-lg">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime}
                    </span>
                  </div>

                  {/* Telugu Headline if present */}
                  {post.teluguTitle && (
                    <p className="text-xs font-bold text-amber-800 dark:text-amber-300 line-clamp-2 mb-2 leading-relaxed bg-amber-50/60 dark:bg-amber-950/40 p-2 rounded-xl">
                      {post.teluguTitle}
                    </p>
                  )}

                  {/* English Main Title */}
                  <Link href={`/blog/${post.slug}`}>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-brand-600 transition-colors line-clamp-2 mb-3 leading-snug">
                      {post.title}
                    </h3>
                  </Link>

                  {/* Excerpt */}
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed mb-4">
                    {post.teluguExcerpt || post.excerpt}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 pb-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400">{formatDate(post.publishedAt)}</span>
                <Link
                  href={`/blog/${post.slug}`}
                  className="font-bold text-brand-600 dark:text-brand-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                >
                  వివరాలు చదవండి <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Central Govt & Career Roadmaps */}
      {otherGuides.length > 0 && (
        <div className="space-y-6 pt-6">
          <div className="pb-3 border-b border-slate-200 dark:border-slate-800">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              All India Strategy &amp; High-Paying IT Roadmaps
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              SSC CGL, Railways, Banking preparation blueprints and Software Engineering careers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {otherGuides.map((post) => (
              <article
                key={post.id}
                className="group bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl hover:border-brand-500/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <Link href={`/blog/${post.slug}`} className="block relative aspect-video overflow-hidden bg-slate-900">
                    {post.imageUrl ? (
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-slate-800 to-indigo-900" />
                    )}
                    <div className="absolute top-3 left-3">
                      <span className="bg-brand-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-md">
                        {post.category}
                      </span>
                    </div>
                  </Link>

                  <div className="p-6">
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                      <span className="font-semibold text-slate-400">By {post.author}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {post.readTime}
                      </span>
                    </div>

                    <Link href={`/blog/${post.slug}`}>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-brand-600 transition line-clamp-2 mb-2">
                        {post.title}
                      </h3>
                    </Link>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400">{formatDate(post.publishedAt)}</span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="font-bold text-brand-600 dark:text-brand-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                  >
                    Read Guide <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
