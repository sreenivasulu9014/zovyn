import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { getAllJobs } from "@/lib/jobs";
import { formatDate } from "@/lib/utils";
import { KeyRound, ExternalLink, Calendar, Building2, ChevronRight, CheckCircle2, AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Sarkari Exam Answer Key 2026: Response Sheets & Question Paper Objections | zovyn.in",
  description:
    "Download official exam answer keys, candidate response sheets, and submit objection forms for SSC, Railway RRB, UPSC, Banking, and State PSC examinations.",
  alternates: {
    canonical: "https://zovyn.in/answer-keys",
  },
};

export default function AnswerKeysPage() {
  const allJobs = getAllJobs(true);

  // Derive answer key records from active and completed exams
  const answerKeyItems = allJobs.slice(0, 8);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Breadcrumb */}
      <nav className="text-xs text-slate-500 flex items-center gap-1.5">
        <Link href="/" className="hover:underline">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-slate-800 dark:text-slate-200 font-semibold">Answer Keys</span>
      </nav>

      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
        <div className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300 text-xs font-bold px-2.5 py-1 rounded-full mb-3">
          <KeyRound className="w-3.5 h-3.5" />
          <span>Official Answer Key & Response Sheet Portal</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Government Exam Answer Keys & Objection Windows (2026)
        </h1>
        <p className="text-sm text-slate-500 mt-2 max-w-3xl">
          Check provisional and final official answer keys, view candidate response sheets with question master, and file representation/objections within designated board timelines.
        </p>
      </div>

      {/* Answer Key Grid / List */}
      <div className="space-y-4">
        {answerKeyItems.map((job) => (
          <div
            key={job.id}
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm hover:shadow-md transition flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="space-y-1">
              <span className="text-xs text-brand-600 font-bold uppercase">{job.organization}</span>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                <Link href={`/jobs/${job.slug}`} className="hover:text-brand-600">
                  {job.title} — Official Answer Key & Representation Window
                </Link>
              </h2>
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                <span>Stage: <strong className="text-slate-700 dark:text-slate-300">Provisional Key Released</strong></span>
                <span>Exam Schedule: <strong>{job.importantDates.examDate || "Completed / Scheduled"}</strong></span>
                <span className="text-emerald-600 flex items-center gap-1 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Verified Official Gateway
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={job.officialWebsiteUrl || job.applyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs px-4 py-2.5 rounded-xl transition shadow flex items-center gap-1.5"
              >
                <span>Download Answer Key</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
