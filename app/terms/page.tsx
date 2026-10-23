import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | zovyn.in",
  description: "Terms and conditions of use for zovyn.in.",
  alternates: {
    canonical: "https://zovyn.in/terms",
  },
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Terms & Conditions
        </h1>
        <p className="text-sm text-slate-500 mt-2">Effective Date: October 2026</p>
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        <p>
          By accessing and browsing zovyn.in, you agree to comply with and be bound by the following terms of use.
        </p>
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">Use of Portal Material</h2>
          <p>
            All information provided on zovyn.in is for informational and educational purposes. Candidates should verify all recruitment details on official websites before submitting fees.
          </p>
        </section>
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">Limitation of Liability</h2>
          <p>
            zovyn.in shall not be held liable for any loss or damage arising from typographical errors in gazette notices or changes made by official recruiting authorities.
          </p>
        </section>
      </div>
    </div>
  );
}
