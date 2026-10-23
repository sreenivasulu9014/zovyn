import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | zovyn.in",
  description: "Privacy policy and data protection guidelines at zovyn.in.",
  alternates: {
    canonical: "https://zovyn.in/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-sm text-slate-500 mt-2">Last Updated: October 2026</p>
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        <p>
          At zovyn.in, we respect the privacy of our visitors. This Privacy Policy outlines the types of information we collect and how we use it.
        </p>
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">Information We Collect</h2>
          <p>
            When you subscribe to job alerts, we collect your email address or WhatsApp phone number with your explicit consent to deliver alerts based on your career interests. We do not sell or lease candidate contact details to third-party telemarketers.
          </p>
        </section>
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">Cookies and Analytics</h2>
          <p>
            We use standard analytics cookies to analyze traffic patterns and optimize site performance for mobile devices across India.
          </p>
        </section>
      </div>
    </div>
  );
}
