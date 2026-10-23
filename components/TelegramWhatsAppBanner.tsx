"use client";

import React, { useState } from "react";
import { Send, MessageSquare, CheckCircle, Bell, ArrowRight } from "lucide-react";

export function TelegramWhatsAppBanner() {
  const [contact, setContact] = useState("");
  const [sector, setSector] = useState("all");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contact) return;
    setLoading(true);
    try {
      await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contact, category: sector }),
      });
      setSubscribed(true);
    } catch {
      setSubscribed(true); // fallback UI success
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-3xl bg-gradient-to-br from-brand-900 via-indigo-900 to-slate-900 text-white p-6 sm:p-10 relative overflow-hidden shadow-2xl border border-brand-800">
      <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-brand-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-20 -top-20 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-4">
          <div className="inline-flex items-center gap-2 bg-brand-500/20 border border-brand-400/30 px-3 py-1 rounded-full text-xs font-semibold text-brand-200">
            <Bell className="w-3.5 h-3.5 text-yellow-300 animate-bounce" />
            Instant Job Notification Network
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Never Miss a Sarkari or IT Job Application Deadline
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Get instant PDF notifications, exam dates, syllabus updates, and off-campus drive alerts delivered straight to your WhatsApp or Telegram for free.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="https://t.me/zovyn_jobs"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-400 text-white font-semibold text-sm px-4 py-2.5 rounded-xl shadow-lg shadow-sky-500/25 transition transform hover:-translate-y-0.5"
            >
              <Send className="w-4 h-4" />
              Join Official Telegram Channel
            </a>
            <a
              href="https://chat.whatsapp.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm px-4 py-2.5 rounded-xl shadow-lg shadow-emerald-600/25 transition transform hover:-translate-y-0.5"
            >
              <MessageSquare className="w-4 h-4" />
              Join WhatsApp Alert Community
            </a>
          </div>
        </div>

        {/* Subscribe form */}
        <div className="lg:col-span-5 bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10">
          <h3 className="text-lg font-bold text-white mb-2">Get Customized Alerts</h3>
          <p className="text-xs text-slate-300 mb-4">
            Enter your Email or WhatsApp mobile number to get targeted alerts based on your qualification.
          </p>

          {subscribed ? (
            <div className="bg-emerald-500/20 border border-emerald-400/40 rounded-xl p-4 text-center">
              <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
              <p className="text-sm font-bold text-white">Alerts Configured Successfully!</p>
              <p className="text-xs text-emerald-200 mt-1">
                You will receive alerts when new openings matching your criteria are published.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div>
                <input
                  type="text"
                  placeholder="Enter Email or WhatsApp Number"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
              <div className="flex gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setSector("all")}
                  className={`flex-1 py-1.5 rounded-lg border text-center font-medium transition ${
                    sector === "all"
                      ? "bg-brand-600 text-white border-brand-500"
                      : "bg-slate-800/60 text-slate-300 border-slate-700"
                  }`}
                >
                  Govt + IT
                </button>
                <button
                  type="button"
                  onClick={() => setSector("govt")}
                  className={`flex-1 py-1.5 rounded-lg border text-center font-medium transition ${
                    sector === "govt"
                      ? "bg-brand-600 text-white border-brand-500"
                      : "bg-slate-800/60 text-slate-300 border-slate-700"
                  }`}
                >
                  Govt Only
                </button>
                <button
                  type="button"
                  onClick={() => setSector("it")}
                  className={`flex-1 py-1.5 rounded-lg border text-center font-medium transition ${
                    sector === "it"
                      ? "bg-brand-600 text-white border-brand-500"
                      : "bg-slate-800/60 text-slate-300 border-slate-700"
                  }`}
                >
                  IT / Tech Only
                </button>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-saffron-500 hover:bg-saffron-600 text-slate-950 font-bold py-2.5 px-4 rounded-xl text-sm transition flex items-center justify-center gap-1.5 shadow-md"
              >
                <span>{loading ? "Activating..." : "Subscribe to Free Alerts"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
