import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { getAllJobs } from "@/lib/jobs";
import { formatDate } from "@/lib/utils";
import { FileCheck, ExternalLink, Calendar, Building2, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Admit Card 2026: Direct Hall Ticket Download Links for Govt & Bank Exams | zovyn.in",
  description:
    "Download admit cards and hall tickets for SSC, Railway RRB, UPSC, IBPS Bank, Police Bharti, and Teaching exams. Official login & exam city slip links.",
  alternates: {
    canonical: "https://zovyn.in/admit-card",
  },
};

export default function AdmitCardsPage() {
  const allJobs = getAllJobs(true);
  const admitCardJobs = allJobs.filter((j) => j.importantDates.admitCardDate);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <nav className="text-xs text-slate-500 flex items-center gap-1.5">
        <Link href="/" className="hover:underline">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-slate-800 dark:text-slate-200 font-semibold">Admit Cards</span>
      </nav>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
        <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 text-xs font-bold px-2.5 py-1 rounded-full mb-3">
          <FileCheck className="w-3.5 h-3.5" />
          <span>Hall Ticket Center</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Admit Card & Hall Ticket Releases (2026)
        </h1>
        <p className="text-sm text-slate-500 mt-2 max-w-3xl">
          Get direct, verified links to download admit cards, check exam city slips, and view reporting schedules across Central & State examinations.
        </p>
      </div>

      <div className="space-y-4">
        {admitCardJobs.map((job) => (
          <div
            key={job.id}
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm hover:shadow-md transition flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="space-y-1">
              <span className="text-xs text-brand-600 font-bold uppercase">{job.organization}</span>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                <Link href={`/jobs/${job.slug}`} className="hover:text-brand-600">
                  {job.title} — Admit Card & Exam Date
                </Link>
              </h2>
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                <span>Admit Card: <strong className="text-emerald-600">{job.importantDates.admitCardDate}</strong></span>
                <span>Exam Schedule: <strong>{job.importantDates.examDate || "Announced Shortly"}</strong></span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href={`/jobs/${job.slug}`}
                className="bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs px-4 py-2.5 rounded-xl transition shadow"
              >
                Download Admit Card
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
