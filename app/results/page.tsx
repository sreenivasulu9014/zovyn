import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { getAllJobs } from "@/lib/jobs";
import { Award, ChevronRight, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Sarkari Result 2026: Direct Merit List & Cut Off Scorecard Links | zovyn.in",
  description:
    "Check latest Sarkari exam results, scorecards, merit lists, and category-wise cut-off marks for SSC, Railway RRB, UPSC, Banking, and State Police examinations.",
  alternates: {
    canonical: "https://zovyn.in/results",
  },
};

export default function ResultsPage() {
  const allJobs = getAllJobs(true);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <nav className="text-xs text-slate-500 flex items-center gap-1.5">
        <Link href="/" className="hover:underline">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-slate-800 dark:text-slate-200 font-semibold">Results & Cut-Offs</span>
      </nav>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
        <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 text-xs font-bold px-2.5 py-1 rounded-full mb-3">
          <Award className="w-3.5 h-3.5" />
          <span>Results & Scorecards</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Government & PSU Exam Results (2026)
        </h1>
        <p className="text-sm text-slate-500 mt-2 max-w-3xl">
          Direct, verified official portals for examination scorecards, cut-offs, answer keys, and document verification merit lists.
        </p>
      </div>

      <div className="space-y-4">
        {allJobs.slice(0, 6).map((job) => (
          <div
            key={job.id}
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm hover:shadow-md transition flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="space-y-1">
              <span className="text-xs text-brand-600 font-bold uppercase">{job.organization}</span>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                <Link href={`/jobs/${job.slug}`} className="hover:text-brand-600">
                  {job.title} — Official Result & Cut-off Status
                </Link>
              </h2>
              <p className="text-xs text-slate-500">
                Selection rounds: {job.selectionProcess.join(" → ")}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={job.officialWebsiteUrl || job.applyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs px-4 py-2.5 rounded-xl transition shadow flex items-center gap-1.5"
              >
                <span>Check Official Result</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
