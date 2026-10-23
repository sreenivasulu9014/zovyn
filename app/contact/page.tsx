import React from "react";
import { Metadata } from "next";
import { Mail, MessageSquare, Send, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us & Grievance Redressal | zovyn.in",
  description: "Get in touch with zovyn.in team for feedback, correction requests, or career alert queries.",
  alternates: {
    canonical: "https://zovyn.in/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Contact zovyn.in
        </h1>
        <p className="text-sm text-slate-500 mt-2">
          Have a question about a job notification, need a correction, or want to partner? We are here to help.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Communication Channels</h2>

          <div className="space-y-4 text-sm">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-brand-50 text-brand-600">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-slate-900 dark:text-white block">Email Support</span>
                <a href="mailto:support@zovyn.in" className="text-brand-600 hover:underline">
                  support@zovyn.in
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-sky-50 text-sky-600">
                <Send className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-slate-900 dark:text-white block">Telegram Channel</span>
                <a href="https://t.me/zovyn_jobs" target="_blank" className="text-sky-600 hover:underline">
                  @zovyn_jobs
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-slate-900 dark:text-white block">Community WhatsApp</span>
                <span className="text-slate-500 text-xs">Official WhatsApp Job Alert Group</span>
              </div>
            </div>
          </div>
        </div>

        {/* Message Form */}
        <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Send a Message</h2>
          <form className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Your Name</label>
              <input
                type="text"
                required
                placeholder="Enter your name"
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Your Email</label>
              <input
                type="email"
                required
                placeholder="candidate@example.com"
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Message / Correction Details</label>
              <textarea
                rows={4}
                required
                placeholder="Provide notification details or query..."
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-brand-600 hover:bg-brand-500 text-white font-bold py-3 rounded-xl transition shadow"
            >
              Submit Inquiry
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
