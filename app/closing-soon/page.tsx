import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { getAllJobs } from "@/lib/jobs";
import { JobCard } from "@/components/JobCard";
import { Clock, ChevronRight, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Govt & IT Jobs Closing Soon: Upcoming Application Deadlines (2026) | zovyn.in",
  description:
    "Don't miss out! Active Central & State Govt and IT vacancies closing applications this week. Direct online apply links before registration portals close.",
  alternates: {
    canonical: "https://zovyn.in/closing-soon",
  },
};

export default function ClosingSoonPage() {
  const allActive = getAllJobs(false);

  // Sort by nearest lastDate
  const sortedByDeadline = [...allActive].sort((a, b) => {
    return new Date(a.importantDates.lastDate).getTime() - new Date(b.importantDates.lastDate).getTime();
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Breadcrumb */}
      <nav className="text-xs text-slate-500 flex items-center gap-1.5">
        <Link href="/" className="hover:underline">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/jobs" className="hover:underline">Jobs</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-slate-800 dark:text-slate-200 font-semibold">Closing Soon</span>
      </nav>

      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
        <div className="inline-flex items-center gap-1.5 bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300 text-xs font-bold px-2.5 py-1 rounded-full mb-3">
          <Clock className="w-3.5 h-3.5" />
          <span>Urgent Application Deadlines</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Recruitment Notifications Closing Soon
        </h1>
        <p className="text-sm text-slate-500 mt-2 max-w-3xl">
          Sorted chronologically by application closing date. Ensure you complete registration, upload certificates, and pay fees before the official server cutoff.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedByDeadline.map((job) => (
          <JobCard key={job.id} job={job} featured={true} />
        ))}
      </div>
    </div>
  );
}
