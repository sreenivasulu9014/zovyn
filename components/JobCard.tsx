import React from "react";
import Link from "next/link";
import { Job } from "@/types/job";
import { formatDate, isDeadlineApproaching, isJobExpired } from "@/lib/utils";
import { Building2, Calendar, MapPin, GraduationCap, ArrowRight, Flame, Clock, IndianRupee, ShieldCheck, XCircle } from "lucide-react";

interface JobCardProps {
  job: Job;
  featured?: boolean;
}

export function JobCard({ job, featured = false }: JobCardProps) {
  const isExpired = job.status === "closed" || isJobExpired(job.importantDates.lastDate);
  const isUrgent = !isExpired && isDeadlineApproaching(job.importantDates.lastDate);

  const categoryBadgeColors: Record<string, string> = {
    govt: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800",
    railway: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800",
    bank: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800",
    it: "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950 dark:text-purple-300 dark:border-purple-800",
    defence: "bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800",
    police: "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950 dark:text-indigo-300 dark:border-indigo-800",
    teaching: "bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-950 dark:text-teal-300 dark:border-teal-800",
    freshers: "bg-pink-50 text-pink-700 border-pink-200 dark:bg-pink-950 dark:text-pink-300 dark:border-pink-800",
  };

  const badgeClass = categoryBadgeColors[job.category] || categoryBadgeColors.govt;

  return (
    <div
      className={`group relative rounded-2xl border transition-all duration-200 bg-white dark:bg-slate-900 p-5 sm:p-6 flex flex-col justify-between hover:shadow-xl hover:border-brand-500/50 ${
        featured
          ? "border-brand-300 dark:border-brand-800 shadow-md ring-1 ring-brand-500/20"
          : "border-slate-200 dark:border-slate-800 shadow-sm"
      } ${isExpired ? "opacity-75 bg-slate-50/50 dark:bg-slate-900/50" : ""}`}
    >
      <div>
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${badgeClass} uppercase tracking-wider`}>
              {job.subcategory || job.category}
            </span>
            {job.verification?.verified && (
              <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 text-[11px] font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                Verified
              </span>
            )}
            {job.isHot && !isExpired && (
              <span className="inline-flex items-center gap-1 bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300 text-xs font-bold px-2 py-0.5 rounded-full animate-pulse">
                <Flame className="w-3.5 h-3.5 fill-red-500 text-red-500" />
                Hot
              </span>
            )}
            {isUrgent && (
              <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 text-xs font-semibold px-2 py-0.5 rounded-full">
                <Clock className="w-3.5 h-3.5" />
                Closing Soon
              </span>
            )}
            {isExpired && (
              <span className="inline-flex items-center gap-1 bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300 text-xs font-bold px-2 py-0.5 rounded-full">
                <XCircle className="w-3.5 h-3.5 text-slate-500" />
                Closed
              </span>
            )}
          </div>
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">
            {job.vacancies} Posts
          </span>
        </div>

        {/* Organization Name */}
        <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">
          <Building2 className="w-3.5 h-3.5 text-brand-600 shrink-0" />
          <span className="truncate">{job.organization}</span>
        </div>

        {/* Job Title */}
        <Link href={`/jobs/${job.slug}`}>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors line-clamp-2 mb-1.5">
            {job.title}
          </h3>
        </Link>

        {/* Telugu Subtitle if present */}
        {job.teluguTitle && (
          <p className="text-xs text-amber-800 dark:text-amber-300 font-semibold line-clamp-1 mb-3">
            {job.teluguTitle}
          </p>
        )}

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-300 mb-4 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl">
          <div className="flex items-center gap-1.5">
            <GraduationCap className="w-4 h-4 text-slate-400 shrink-0" />
            <span className="truncate">{job.qualification.join(", ")}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
            <span className="truncate">{job.state || job.location}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <IndianRupee className="w-4 h-4 text-slate-400 shrink-0" />
            <span className="truncate">{job.salary}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
            <span className={`truncate ${isExpired ? "text-red-500 line-through" : ""}`}>
              Last: {formatDate(job.importantDates.lastDate)}
            </span>
          </div>
        </div>
      </div>

      {/* Card Action footer */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
        <Link
          href={`/jobs/${job.slug}`}
          className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
        >
          View Full Details
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
        {isExpired ? (
          <span className="bg-slate-100 dark:bg-slate-800 text-slate-500 text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700">
            Closed
          </span>
        ) : (
          <a
            href={job.applyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs px-3.5 py-1.5 rounded-lg shadow hover:shadow-brand-500/20 transition-all inline-flex items-center gap-1"
          >
            Apply Online
          </a>
        )}
      </div>
    </div>
  );
}
