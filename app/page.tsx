import React from "react";
import Link from "next/link";
import { getAllJobs, getAllBlogs } from "@/lib/jobs";
import { JobCard } from "@/components/JobCard";
import { QuickFilters } from "@/components/QuickFilters";
import { TelegramWhatsAppBanner } from "@/components/TelegramWhatsAppBanner";
import { 
  Sparkles, 
  Search, 
  Flame, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  BookOpen, 
  Building2, 
  Terminal, 
  Landmark, 
  GraduationCap, 
  TrendingUp, 
  Briefcase,
  MapPin,
  Clock
} from "lucide-react";

export default function HomePage() {
  const allJobs = getAllJobs();
  const featuredJobs = allJobs.filter((j) => j.isFeatured || j.isHot);
  const govtJobs = allJobs.filter((j) => j.category === "govt" || j.category === "railway" || j.category === "bank" || j.category === "defence" || j.category === "police");
  const itJobs = allJobs.filter((j) => j.category === "it");
  const blogs = getAllBlogs().slice(0, 3);

  const states = [
    { name: "Andhra Pradesh (ఆంధ్రప్రదేశ్)", count: "5,852+ (APPSC, DSC, Police)", slug: "andhra-pradesh" },
    { name: "Telangana (తెలంగాణ)", count: "6,200+ (TGPSC & IT)", slug: "telangana" },
    { name: "All India (Central)", count: "65,000+", slug: "all-india" },
    { name: "Uttar Pradesh", count: "32,400+", slug: "uttar-pradesh" },
    { name: "Maharashtra", count: "18,200+", slug: "maharashtra" },
    { name: "Delhi NCR", count: "14,500+", slug: "delhi" },
    { name: "Bihar", count: "21,100+", slug: "bihar" },
    { name: "Karnataka", count: "16,800+", slug: "karnataka" },
  ];

  return (
    <div className="space-y-12 sm:space-y-16 pb-16">
      {/* Hero Section with AI Match Teaser */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-950 via-slate-900 to-slate-950 text-white pt-12 pb-20 sm:pt-16 sm:pb-24">
        {/* Glow backdrop */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-brand-600/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 bg-brand-500/10 border border-brand-400/30 px-3.5 py-1.5 rounded-full text-xs font-semibold text-brand-300">
              <Sparkles className="w-4 h-4 text-yellow-300 animate-spin" style={{ animationDuration: '4s' }} />
              <span>Next-Gen AI Job Matching Engine</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
              India's Smartest Job Alert Portal
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-indigo-300 to-purple-400">
                — AI-Matched to Your Profile
              </span>
            </h1>

            <p className="text-sm sm:text-lg text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
              Real-time notifications for Central & State Government jobs (UPSC, SSC, Railway, Banking) and high-growth IT/Software engineering off-campus drives.
            </p>

            {/* Quick Hero Search & Match CTA */}
            <div className="pt-4 max-w-2xl mx-auto">
              <form action="/jobs" method="GET" className="relative flex items-center bg-white dark:bg-slate-800 rounded-2xl p-1.5 shadow-2xl border border-slate-700/50">
                <Search className="w-5 h-5 text-slate-400 ml-3 shrink-0" />
                <input
                  type="text"
                  name="q"
                  placeholder="Search by Exam, Post, Qualification (e.g. SSC, B.Tech, RRB, 12th)..."
                  className="w-full bg-transparent px-3 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-brand-600 hover:bg-brand-500 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition shadow-md whitespace-nowrap"
                >
                  Search Jobs
                </button>
              </form>

              {/* Quick AI Trigger Pill */}
              <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
                <span className="text-slate-400">Or use AI:</span>
                <Link
                  href="/ai-match"
                  className="inline-flex items-center gap-1.5 bg-gradient-to-r from-brand-500/20 to-purple-500/20 border border-brand-400/30 hover:border-brand-400 px-3 py-1.5 rounded-lg text-brand-300 hover:text-white font-medium transition"
                >
                  <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                  Auto-Match My Degree & Skills (100% Free)
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Stats Banner */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto text-center">
            <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-4">
              <p className="text-2xl sm:text-3xl font-black text-white">1,15,000+</p>
              <p className="text-xs text-slate-400 mt-1">Active Vacancies Tracked</p>
            </div>
            <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-4">
              <p className="text-2xl sm:text-3xl font-black text-emerald-400">100%</p>
              <p className="text-xs text-slate-400 mt-1">Official & Verified Feeds</p>
            </div>
            <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-4">
              <p className="text-2xl sm:text-3xl font-black text-brand-400">Daily 7 AM</p>
              <p className="text-xs text-slate-400 mt-1">Automated Updates</p>
            </div>
            <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-4">
              <p className="text-2xl sm:text-3xl font-black text-saffron-500">₹0 Spam</p>
              <p className="text-xs text-slate-400 mt-1">Direct Official Links</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Category Shortcut Tiles */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-brand-600" />
              Explore by Sector & Category
            </h2>
            <Link href="/jobs" className="text-xs sm:text-sm font-semibold text-brand-600 hover:underline flex items-center gap-1">
              View All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
            {[
              { title: "Central Govt", icon: Building2, count: "54,000+", href: "/category/govt", color: "text-blue-600 bg-blue-50 dark:bg-blue-950" },
              { title: "IT & Tech", icon: Terminal, count: "32,000+", href: "/category/it", color: "text-indigo-600 bg-indigo-50 dark:bg-indigo-950" },
              { title: "Railways RRB", icon: Landmark, count: "11,558", href: "/category/railway", color: "text-amber-600 bg-amber-50 dark:bg-amber-950" },
              { title: "Banking PO/Clerk", icon: Landmark, count: "9,800+", href: "/category/bank", color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950" },
              { title: "Defence & Army", icon: ShieldCheck, count: "30,000+", href: "/category/defence", color: "text-red-600 bg-red-50 dark:bg-red-950" },
              { title: "10th / 12th Pass", icon: GraduationCap, count: "45,000+", href: "/qualification/12th", color: "text-purple-600 bg-purple-50 dark:bg-purple-950" },
            ].map((cat) => {
              const Icon = cat.icon;
              return (
                <Link
                  key={cat.title}
                  href={cat.href}
                  className="group bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-brand-500/50 hover:shadow-lg transition-all"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${cat.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-brand-600 transition">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{cat.count} Vacancies</p>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Featured & Trending Notifications */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-red-100 dark:bg-red-950 text-red-600">
                <Flame className="w-5 h-5 fill-red-500" />
              </span>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                  Hot & Trending Job Notifications
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Top recruitment drives closing soon or drawing massive applicant volumes
                </p>
              </div>
            </div>
            <Link
              href="/jobs"
              className="text-xs sm:text-sm font-semibold text-brand-600 hover:underline flex items-center gap-1"
            >
              Browse All Jobs <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <QuickFilters activeCategory="all" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
            {featuredJobs.map((job) => (
              <JobCard key={job.id} job={job} featured={true} />
            ))}
          </div>
        </section>

        {/* Telegram & WhatsApp Community Banner */}
        <section>
          <TelegramWhatsAppBanner />
        </section>

        {/* Dual Column: Latest Govt Jobs & IT / Software Jobs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Govt Column */}
          <section className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Building2 className="w-5 h-5 text-blue-600" />
                Latest Government & PSU Alerts
              </h3>
              <Link href="/category/govt" className="text-xs font-semibold text-brand-600 hover:underline">
                View All Govt
              </Link>
            </div>
            <div className="space-y-4">
              {govtJobs.slice(0, 3).map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          </section>

          {/* IT & Software Column */}
          <section className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Terminal className="w-5 h-5 text-emerald-600" />
                Latest IT & Software Drives
              </h3>
              <Link href="/category/it" className="text-xs font-semibold text-brand-600 hover:underline">
                View All IT
              </Link>
            </div>
            <div className="space-y-4">
              {itJobs.slice(0, 3).map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          </section>
        </div>

        {/* State-Wise Job Alerts Grid */}
        <section className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <MapPin className="w-5 h-5 text-saffron-500" />
                State-Wise Job Openings in India
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Find public service commissions, state police, revenue, and teacher recruitment by state
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            {states.map((st) => (
              <Link
                key={st.slug}
                href={`/state/${st.slug}`}
                className="p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 hover:bg-white hover:border-brand-500 hover:shadow-md transition group"
              >
                <div className="text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-brand-600 transition">
                  {st.name}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{st.count} Openings</div>
              </Link>
            ))}
          </div>
        </section>

        {/* Career Guides & Exam Syllabus Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-purple-600" />
              Sarkari & IT Exam Preparation Guides
            </h2>
            <Link href="/blog" className="text-xs sm:text-sm font-semibold text-brand-600 hover:underline">
              Read All Articles
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <Link
                key={blog.id}
                href={`/blog/${blog.slug}`}
                className="group bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl hover:border-brand-500/50 transition flex flex-col justify-between"
              >
                <div>
                  {blog.imageUrl && (
                    <div className="aspect-video relative overflow-hidden bg-slate-900">
                      <img
                        src={blog.imageUrl}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="p-5">
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                      <span className="font-semibold text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950 px-2 py-0.5 rounded">
                        {blog.category}
                      </span>
                      <span>{blog.readTime}</span>
                    </div>
                    {blog.teluguTitle && (
                      <p className="text-xs font-bold text-amber-800 dark:text-amber-300 line-clamp-1 mb-1">
                        {blog.teluguTitle}
                      </p>
                    )}
                    <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-brand-600 transition line-clamp-2 mb-2">
                      {blog.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {blog.teluguExcerpt || blog.excerpt}
                    </p>
                  </div>
                </div>
                <div className="px-5 pb-5 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs font-semibold text-brand-600 dark:text-brand-400 flex items-center justify-between">
                  <span>వివరాలు చదవండి</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
