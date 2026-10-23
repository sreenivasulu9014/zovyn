import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { Sparkles, ShieldCheck, Target, Users, CheckCircle2, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | zovyn.in — India's Smartest Job Alert Portal",
  description:
    "Learn about zovyn.in mission, verification standards, and AI-driven technology helping millions of Indian job seekers find verified Sarkari and IT careers.",
  alternates: {
    canonical: "https://zovyn.in/about",
  },
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="space-y-3 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300 border border-brand-200 dark:border-brand-800 px-3 py-1 rounded-full text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Our Mission</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Empowering India’s Aspirants with Truth, Speed & AI
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          zovyn.in was founded to solve India’s biggest job search pain point: spam notifications, fake recruitment notices, misleading application fees, and unverified deadlines.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-600" />
          The zovyn Difference
        </h2>
        <p>
          Unlike traditional portals that copy-paste unverified notices or flood users with deceptive clickbait, zovyn.in enforces a strict **Source Verification Protocol**. Every single recruitment notice is cross-referenced with official gazettes, recruiting body domain signatures (.gov.in, .nic.in, or verified enterprise domains), and official PDFs before publication.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-900 dark:text-white mb-1">Zero Hallucinations</h3>
            <p className="text-xs text-slate-500">
              AI is strictly employed for metadata extraction and profile matching. All vacancies, dates, and salary figures come strictly from official circulars.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-900 dark:text-white mb-1">Real-Time Quarantine</h3>
            <p className="text-xs text-slate-500">
              Expired job circulars are automatically removed from active feeds and marked closed so candidates never waste application fees.
            </p>
          </div>
        </div>

        <h2 className="text-xl font-bold text-slate-900 dark:text-white pt-4">Our Technology</h2>
        <p>
          Built on modern high-speed edge infrastructure, zovyn.in provides instant serverless loading across all 2G/3G/4G/5G mobile connections in India. Our daily automated crawlers run every morning at 7:00 AM IST to ensure you receive breaking notifications before anyone else.
        </p>
      </div>
    </div>
  );
}
