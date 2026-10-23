import React from "react";
import { Metadata } from "next";
import { Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Disclaimer & Non-Affiliation Statement | zovyn.in",
  description: "Official legal disclaimer and non-affiliation notice for zovyn.in users.",
  alternates: {
    canonical: "https://zovyn.in/disclaimer",
  },
};

export default function DisclaimerPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Disclaimer & Legal Notice
        </h1>
        <p className="text-sm text-slate-500 mt-2">
          Important notice regarding government affiliation and information accuracy.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200">
          <strong>Non-Affiliation Notice:</strong> zovyn.in is a privately operated job notification and informational portal. We are NOT associated, affiliated, endorsed by, or in any way officially connected with the Government of India, any State Government, Union Public Service Commission (UPSC), Staff Selection Commission (SSC), Railway Recruitment Control Board (RRB), Institute of Banking Personnel Selection (IBPS), or any other recruitment board.
        </div>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Source of Information</h2>
          <p>
            The recruitment notices, exam schedules, admit card links, and answer keys aggregated on zovyn.in are gathered from publicly accessible press releases, employment newspapers, official gazettes, and official recruiting websites.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Verification Responsibility</h2>
          <p>
            While we strive for absolute precision and verify records daily, candidates are strictly urged to verify all instructions, dates, age requirements, and fee details from the original official gazette notification before submitting any application form or remitting application fees.
          </p>
        </section>
      </div>
    </div>
  );
}
