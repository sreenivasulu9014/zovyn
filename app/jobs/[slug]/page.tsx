import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { getAllJobs, getJobBySlug } from "@/lib/jobs";
import { formatDate, isDeadlineApproaching, isJobExpired } from "@/lib/utils";
import { JobSchema } from "@/components/JobSchema";
import { 
  Building2, 
  Calendar, 
  MapPin, 
  GraduationCap, 
  IndianRupee, 
  FileText, 
  ExternalLink, 
  Share2, 
  Send, 
  MessageSquare, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Briefcase,
  ChevronRight,
  ShieldCheck,
  XCircle,
  AlertTriangle
} from "lucide-react";

interface JobDetailPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const jobs = getAllJobs(true);
  return jobs.map((job) => ({
    slug: job.slug,
  }));
}

export async function generateMetadata({ params }: JobDetailPageProps): Promise<Metadata> {
  const job = getJobBySlug(params.slug);
  if (!job) {
    return { title: "Job Notification Not Found" };
  }

  const isExpired = job.status === "closed" || isJobExpired(job.importantDates.lastDate);
  const statusPrefix = isExpired ? "[Closed] " : "";
  const pageTitle = `${statusPrefix}${job.title} | zovyn.in`;
  const pageDescription = `${job.organization} has released notification for ${job.vacancies} vacancies. Eligibility: ${job.qualification.join(", ")}. Last date: ${job.importantDates.lastDate}. ${isExpired ? "Note: Applications are currently closed." : "Apply online at official portal."}`;

  return {
    title: pageTitle,
    description: pageDescription,
    alternates: {
      canonical: `https://zovyn.in/jobs/${job.slug}`,
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: `https://zovyn.in/jobs/${job.slug}`,
      type: "article",
      images: [
        {
          url: job.organizationLogo || "https://zovyn.in/og-job.png",
          width: 800,
          height: 600,
          alt: job.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
    },
  };
}

export default function JobDetailPage({ params }: JobDetailPageProps) {
  const job = getJobBySlug(params.slug);

  if (!job) {
    notFound();
  }

  const isExpired = job.status === "closed" || isJobExpired(job.importantDates.lastDate);
  const isUrgent = !isExpired && isDeadlineApproaching(job.importantDates.lastDate);
  const pageUrl = `https://zovyn.in/jobs/${job.slug}`;

  // WhatsApp share text
  const shareText = encodeURIComponent(
    `🚨 *${job.title}*\n🏢 *Organization:* ${job.organization}\n💼 *Vacancies:* ${job.vacancies}\n🎓 *Eligibility:* ${job.qualification.join(", ")}\n⏳ *Last Date:* ${job.importantDates.lastDate}\n\n👉 Apply Online here: ${pageUrl}`
  );

  const relatedJobs = getAllJobs()
    .filter((j) => j.category === job.category && j.id !== job.id)
    .slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Schema Markup for Google Job Search (Only for active jobs to keep Google Jobs index compliant) */}
      {!isExpired && <JobSchema job={job} url={pageUrl} />}

      {/* Breadcrumb */}
      <nav className="text-xs text-slate-500 flex items-center gap-1.5 flex-wrap">
        <Link href="/" className="hover:underline">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/jobs" className="hover:underline">Jobs</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href={`/category/${job.category}`} className="hover:underline capitalize">{job.category}</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-slate-800 dark:text-slate-200 font-semibold truncate max-w-xs">{job.title}</span>
      </nav>

      {/* Closed Banner Warning if Expired */}
      {isExpired && (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 flex items-center gap-3 text-amber-800 dark:text-amber-300 text-sm">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
          <p>
            <strong>Application Closed:</strong> The deadline for this recruitment was <strong>{formatDate(job.importantDates.lastDate)}</strong>. The application window is now closed. Please check official portals for admit cards, answer keys, or upcoming recruitment cycles.
          </p>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300 border border-brand-200 dark:border-brand-800">
              {job.subcategory || job.category}
            </span>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200">
              {job.vacancies} Total Vacancies
            </span>
            {job.verification?.verified && (
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 flex items-center gap-1 border border-emerald-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Official Verified Source
              </span>
            )}
            {isUrgent && (
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-100 text-amber-800 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                Deadline Approaching
              </span>
            )}
            {isExpired && (
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-200 text-slate-700 flex items-center gap-1">
                <XCircle className="w-3.5 h-3.5" />
                Expired
              </span>
            )}
          </div>
          <span className="text-xs text-slate-400">
            Posted: {formatDate(job.postedAt)}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm font-semibold text-brand-600 dark:text-brand-400">
          <Building2 className="w-4 h-4 shrink-0" />
          <span>{job.organization}</span>
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-snug">
          {job.title}
        </h1>

        {/* Telugu Title Highlight if present */}
        {job.teluguTitle && (
          <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-2xl p-4">
            <span className="text-[11px] font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider block mb-1">
              తెలుగు సమాచారం / Regional Notification
            </span>
            <p className="text-base sm:text-lg font-bold text-slate-900 dark:text-amber-100">
              {job.teluguTitle}
            </p>
          </div>
        )}

        {/* Quick Share Buttons */}
        <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-500 font-medium mr-1 flex items-center gap-1">
            <Share2 className="w-3.5 h-3.5" /> Share:
          </span>
          <a
            href={`https://api.whatsapp.com/send?text=${shareText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-3 py-1.5 rounded-lg transition"
          >
            <MessageSquare className="w-3.5 h-3.5" /> WhatsApp
          </a>
          <a
            href={`https://t.me/share/url?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(job.title)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-sky-500 hover:bg-sky-400 text-white font-medium px-3 py-1.5 rounded-lg transition"
          >
            <Send className="w-3.5 h-3.5" /> Telegram
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Detailed Information */}
        <div className="lg:col-span-8 space-y-8">
          {/* Summary Box */}
          <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4 pb-2 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-brand-600" />
              Recruitment Quick Overview
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                <span className="text-xs text-slate-500 block">Organization</span>
                <span className="font-bold text-slate-900 dark:text-white">{job.organization}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                <span className="text-xs text-slate-500 block">Total Vacancies</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">{job.vacancies}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                <span className="text-xs text-slate-500 block">Salary / Pay Scale</span>
                <span className="font-bold text-slate-900 dark:text-white">{job.salary}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                <span className="text-xs text-slate-500 block">Age Limit</span>
                <span className="font-bold text-slate-900 dark:text-white">{job.ageLimit}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                <span className="text-xs text-slate-500 block">Location / State</span>
                <span className="font-bold text-slate-900 dark:text-white">{job.state || job.location}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                <span className="text-xs text-slate-500 block">Required Qualification</span>
                <span className="font-bold text-slate-900 dark:text-white">{job.qualification.join(", ")}</span>
              </div>
            </div>
          </section>

          {/* Important Dates & Application Fee Table */}
          <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4 pb-2 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-saffron-500" />
              Important Dates & Application Fee
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Dates */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Schedule</h3>
                <div className="space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-slate-600 dark:text-slate-400">Application Start:</span>
                    <span className="font-semibold text-slate-900 dark:text-white">{formatDate(job.importantDates.applyStartDate)}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                    <span className={`font-bold ${isExpired ? "text-slate-400 line-through" : "text-red-600"}`}>Last Date to Apply:</span>
                    <span className={`font-bold ${isExpired ? "text-slate-400 line-through" : "text-red-600"}`}>{formatDate(job.importantDates.lastDate)}</span>
                  </div>
                  {job.importantDates.examDate && (
                    <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                      <span className="text-slate-600 dark:text-slate-400">Exam Date:</span>
                      <span className="font-semibold text-slate-900 dark:text-white">{job.importantDates.examDate}</span>
                    </div>
                  )}
                  {job.importantDates.admitCardDate && (
                    <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                      <span className="text-slate-600 dark:text-slate-400">Admit Card:</span>
                      <span className="font-semibold text-slate-900 dark:text-white">{job.importantDates.admitCardDate}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Fee */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Application Fee</h3>
                <div className="space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-slate-600 dark:text-slate-400">General / OBC:</span>
                    <span className="font-semibold text-slate-900 dark:text-white">{job.applicationFee.general || "Nil"}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-slate-600 dark:text-slate-400">SC / ST / PwD:</span>
                    <span className="font-semibold text-slate-900 dark:text-white">{job.applicationFee.sc_st_pwd || "Nil"}</span>
                  </div>
                  {job.applicationFee.female && (
                    <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                      <span className="text-slate-600 dark:text-slate-400">Female Candidates:</span>
                      <span className="font-semibold text-slate-900 dark:text-white">{job.applicationFee.female}</span>
                    </div>
                  )}
                  {job.applicationFee.details && (
                    <p className="text-[11px] text-slate-400 italic pt-1">{job.applicationFee.details}</p>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Eligibility & Selection Process */}
          <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-emerald-600" />
                Educational Qualification & Criteria
              </h2>
              <div className="bg-emerald-50/50 dark:bg-emerald-950/30 p-4 rounded-2xl border border-emerald-200/60 dark:border-emerald-800/60 text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                {job.eligibilityDetails}
              </div>
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3">Selection Process</h3>
              <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                {job.selectionProcess.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3">How to Apply (Step-by-Step)</h3>
              <ol className="space-y-2.5 text-sm text-slate-700 dark:text-slate-300 list-decimal list-inside">
                {job.howToApply.map((step, idx) => (
                  <li key={idx} className="leading-relaxed">
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* Official Verification Notice */}
          <div className="bg-slate-100 dark:bg-slate-800/60 rounded-2xl p-4 text-xs text-slate-600 dark:text-slate-400 flex items-start gap-2.5">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-slate-800 dark:text-slate-200">
                zovyn Verification Trust Guarantee:
              </p>
              <p className="mt-0.5">
                {job.verification?.validationNotes || "Notification matched and cross-checked directly from official gazettes and recruitment authority servers."}
              </p>
            </div>
          </div>
        </div>

        {/* Right Sidebar: Direct Action CTAs & Related Jobs */}
        <div className="lg:col-span-4 space-y-6">
          {/* Sticky Action Card */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-lg space-y-4 lg:sticky lg:top-24">
            <h3 className="font-bold text-base text-slate-900 dark:text-white">Important Links</h3>

            {isExpired ? (
              <div className="w-full bg-slate-100 dark:bg-slate-800 text-slate-500 font-bold py-3 px-4 rounded-xl text-sm text-center border border-slate-200 dark:border-slate-700">
                Application Closed
              </div>
            ) : (
              <a
                href={job.applyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-brand-600 hover:bg-brand-500 text-white font-bold py-3 px-4 rounded-xl text-sm transition flex items-center justify-center gap-2 shadow-md shadow-brand-500/25"
              >
                <span>Apply Online Directly</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}

            {job.notificationPdfUrl && (
              <a
                href={job.notificationPdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-900 dark:text-white font-semibold py-2.5 px-4 rounded-xl text-sm transition flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-700"
              >
                <FileText className="w-4 h-4 text-red-500" />
                <span>Download Official Notification PDF</span>
              </a>
            )}

            {job.officialWebsiteUrl && (
              <a
                href={job.officialWebsiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 font-medium py-2 px-3 text-xs transition flex items-center justify-center gap-1.5"
              >
                <span>Visit Official Organization Website</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-center">
              <Link
                href="/ai-match"
                className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline inline-flex items-center gap-1"
              >
                Check if your profile matches this job
              </Link>
            </div>
          </div>

          {/* Related Jobs Widget */}
          {relatedJobs.length > 0 && (
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
              <h3 className="font-bold text-sm uppercase tracking-wider text-slate-400">
                Related {job.category.toUpperCase()} Notifications
              </h3>
              <div className="space-y-3">
                {relatedJobs.map((rj) => (
                  <Link
                    key={rj.id}
                    href={`/jobs/${rj.slug}`}
                    className="block p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-100 dark:border-slate-800 transition group"
                  >
                    <p className="text-xs text-brand-600 font-medium truncate">{rj.organization}</p>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-brand-600 transition line-clamp-2 mt-0.5">
                      {rj.title}
                    </h4>
                    <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2">
                      <span>{rj.vacancies} Posts</span>
                      <span>Last: {formatDate(rj.importantDates.lastDate)}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
