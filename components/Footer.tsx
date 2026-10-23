import React from "react";
import Link from "next/link";
import { Sparkles, Shield, Heart, Send, CheckCircle2 } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-14 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-indigo-600 flex items-center justify-center text-white font-extrabold text-xl shadow-lg">
                Z
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                zovyn<span className="text-brand-400">.in</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              India's Smartest Job Alert Portal — AI-Matched to Your Profile.
              Instant notifications for Central & State Government examinations,
              PSUs, Banking, Railways, Defence, and IT Software industry careers.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://t.me/zovyn_jobs"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold px-3 py-2 rounded-lg flex items-center gap-1.5 transition"
              >
                <Send className="w-3.5 h-3.5" />
                Telegram Channel (50k+)
              </a>
              <Link
                href="/ai-match"
                className="bg-brand-600/30 hover:bg-brand-600/50 text-brand-300 border border-brand-500/40 text-xs font-semibold px-3 py-2 rounded-lg flex items-center gap-1.5 transition"
              >
                <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                AI Match Calculator
              </Link>
            </div>
          </div>

          {/* Govt & PSU Categories */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">
              Govt & Public Sector
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link href="/category/govt" className="hover:text-white transition">
                  Central Govt Jobs (SSC, UPSC)
                </Link>
              </li>
              <li>
                <Link href="/category/railway" className="hover:text-white transition">
                  Railway Jobs (RRB NTPC, ALP)
                </Link>
              </li>
              <li>
                <Link href="/category/bank" className="hover:text-white transition">
                  Banking Jobs (IBPS, SBI PO/Clerk)
                </Link>
              </li>
              <li>
                <Link href="/category/defence" className="hover:text-white transition">
                  Defence (Army, Navy, Airforce)
                </Link>
              </li>
              <li>
                <Link href="/category/police" className="hover:text-white transition">
                  State Police & PAC Bharti
                </Link>
              </li>
              <li>
                <Link href="/category/teaching" className="hover:text-white transition">
                  Teaching (TET, CTET, KVS)
                </Link>
              </li>
            </ul>
          </div>

          {/* IT, Tech & Qualifications */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">
              IT & Qualifications
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link href="/category/it" className="hover:text-white transition">
                  IT & Software Engineering
                </Link>
              </li>
              <li>
                <Link href="/category/freshers" className="hover:text-white transition">
                  Fresher Off-Campus Drives
                </Link>
              </li>
              <li>
                <Link href="/qualification/10th" className="hover:text-white transition">
                  10th Pass Govt Jobs
                </Link>
              </li>
              <li>
                <Link href="/qualification/12th" className="hover:text-white transition">
                  12th Pass Govt Jobs
                </Link>
              </li>
              <li>
                <Link href="/qualification/graduate" className="hover:text-white transition">
                  Any Graduate Vacancies
                </Link>
              </li>
              <li>
                <Link href="/qualification/b-tech" className="hover:text-white transition">
                  B.Tech / Engineering Jobs
                </Link>
              </li>
            </ul>
          </div>

          {/* Portal Information & Legal */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">
              Information & Legal
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link href="/about" className="hover:text-white transition">
                  About zovyn.in
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition">
                  Syllabus & Exam Prep Guides
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-white transition">
                  Disclaimer & Verification
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition">
                  Contact Us / Grievance
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-white transition text-xs text-slate-500">
                  Admin Panel
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer Bar */}
        <div className="bg-slate-800/60 rounded-xl p-4 border border-slate-800 text-xs text-slate-400 leading-relaxed mb-8 flex items-start gap-3">
          <Shield className="w-5 h-5 text-saffron-500 shrink-0 mt-0.5" />
          <p>
            <strong className="text-slate-200">Legal Disclaimer:</strong> zovyn.in is an independent job information aggregator and career assistance portal. We are not affiliated with the Government of India, Staff Selection Commission, UPSC, Indian Railways, or any recruiting body. We source public recruitment notifications directly from official gazettes and portals. Candidates are strongly advised to verify details from official recruiting websites before applying.
          </p>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} zovyn.in. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Engineered with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for India's Job Seekers
          </p>
        </div>
      </div>
    </footer>
  );
}
