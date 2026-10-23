import React from "react";
import { Metadata } from "next";
import { ShieldCheck, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Editorial Policy & Verification Standards | zovyn.in",
  description:
    "Our editorial policies, multi-tier verification process, duplicate detection, and correction standards for job alerts.",
  alternates: {
    canonical: "https://zovyn.in/editorial-policy",
  },
};

export default function EditorialPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Editorial & Verification Standards
        </h1>
        <p className="text-sm text-slate-500 mt-2">
          How zovyn.in sources, vets, cross-verifies, and publishes recruitment notifications.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">1. Verified Sources Only</h2>
          <p>
            We strictly do not publish unverified rumors, forwarded WhatsApp notices, or unofficial circulars. All recruitment notifications are checked against official government websites (domains ending in .gov.in, .nic.in, .res.in) or registered company careers pages.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">2. Multi-Step Validation</h2>
          <ul className="space-y-2 list-disc list-inside">
            <li><strong>Authority Check:</strong> Confirming the recruiting organization is a legally constituted public or private entity.</li>
            <li><strong>Official Notification PDF:</strong> Every listing must reference an official advertisement number, gazette circular, or official download link.</li>
            <li><strong>Date & Fee Sanity:</strong> Validating that start dates, end dates, and application fee structures match official notices.</li>
            <li><strong>Direct Application Links:</strong> We always link directly to the official recruitment gateway, never intermediate ad networks.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">3. Prompt Correction & Retraction</h2>
          <p>
            If an examination date is postponed, rescheduled, or cancelled by the recruiting body, our system updates the respective notification within 24 hours and sends alert notices to subscribed candidates.
          </p>
        </section>
      </div>
    </div>
  );
}
