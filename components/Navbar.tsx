"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, Bell, Menu, X, Briefcase, Building2, Terminal, Shield, BookOpen, UserCheck } from "lucide-react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm">
      {/* Top breaking alert ribbon */}
      <div className="bg-gradient-to-r from-slate-900 via-brand-900 to-slate-900 text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
            <span className="bg-saffron-500 text-slate-950 font-bold px-2 py-0.5 rounded text-[10px] tracking-wide uppercase">
              Live Alert
            </span>
            <span className="truncate text-slate-200">
              ⚡ SSC CGL 2026 (14,800+ Posts), RRB NTPC (11,558 Posts) & TCS NQT 2026 applications active now!
            </span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-xs">
            <Link href="/ai-match" className="text-yellow-300 hover:underline flex items-center gap-1 font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              Check Your AI Match
            </Link>
            <Link href="/admin" className="text-slate-400 hover:text-white transition">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Tagline */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white font-extrabold text-xl shadow-md group-hover:scale-105 transition-transform">
              Z
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                  zovyn<span className="text-brand-600">.in</span>
                </span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold px-1.5 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-700">
                  AI Alert
                </span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium hidden sm:block">
                India's Smartest Job Alert Portal — AI-Matched to Your Profile
              </p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <Link
              href="/jobs"
              className="text-slate-700 dark:text-slate-200 hover:text-brand-600 dark:hover:text-brand-400 font-medium px-3 py-2 rounded-lg text-sm transition"
            >
              All Jobs
            </Link>
            <Link
              href="/category/govt"
              className="text-slate-700 dark:text-slate-200 hover:text-brand-600 dark:hover:text-brand-400 font-medium px-3 py-2 rounded-lg text-sm transition flex items-center gap-1.5"
            >
              <Building2 className="w-4 h-4 text-brand-600" />
              Govt Jobs
            </Link>
            <Link
              href="/category/it"
              className="text-slate-700 dark:text-slate-200 hover:text-brand-600 dark:hover:text-brand-400 font-medium px-3 py-2 rounded-lg text-sm transition flex items-center gap-1.5"
            >
              <Terminal className="w-4 h-4 text-emerald-600" />
              IT & Software
            </Link>
            <Link
              href="/category/railway"
              className="text-slate-700 dark:text-slate-200 hover:text-brand-600 dark:hover:text-brand-400 font-medium px-3 py-2 rounded-lg text-sm transition"
            >
              Railway
            </Link>
            <Link
              href="/category/bank"
              className="text-slate-700 dark:text-slate-200 hover:text-brand-600 dark:hover:text-brand-400 font-medium px-3 py-2 rounded-lg text-sm transition"
            >
              Bank
            </Link>
            <Link
              href="/admit-card"
              className="text-slate-700 dark:text-slate-200 hover:text-brand-600 dark:hover:text-brand-400 font-medium px-2.5 py-2 rounded-lg text-sm transition"
            >
              Admit Card
            </Link>
            <Link
              href="/answer-keys"
              className="text-slate-700 dark:text-slate-200 hover:text-brand-600 dark:hover:text-brand-400 font-medium px-2.5 py-2 rounded-lg text-sm transition"
            >
              Answer Keys
            </Link>
            <Link
              href="/closing-soon"
              className="text-red-600 dark:text-red-400 hover:underline font-semibold px-2.5 py-2 rounded-lg text-sm transition"
            >
              Closing Soon
            </Link>
            <Link
              href="/blog"
              className="text-slate-700 dark:text-slate-200 hover:text-brand-600 dark:hover:text-brand-400 font-medium px-2.5 py-2 rounded-lg text-sm transition hidden xl:flex items-center gap-1.5"
            >
              <BookOpen className="w-4 h-4 text-slate-500" />
              Syllabus
            </Link>
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/ai-match"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-600 hover:from-brand-700 hover:to-purple-700 text-white font-semibold px-4 py-2 rounded-xl text-sm shadow-md hover:shadow-indigo-500/25 transition-all transform hover:-translate-y-0.5"
            >
              <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
              <span>AI Job Matcher</span>
            </Link>
            <a
              href="https://t.me/zovyn_jobs"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-sky-50 text-sky-700 dark:bg-sky-950/60 dark:text-sky-300 hover:bg-sky-100 font-medium px-3 py-2 rounded-xl text-sm border border-sky-200 dark:border-sky-800 transition"
            >
              <Bell className="w-4 h-4 text-sky-500" />
              <span>Telegram Alerts</span>
            </a>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              href="/ai-match"
              className="bg-brand-600 text-white p-2 rounded-lg text-xs font-semibold flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI</span>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 pt-3 pb-6 space-y-3">
          <Link
            href="/ai-match"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 text-white font-semibold"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-300" />
              <span>Find Jobs Matched to My Profile</span>
            </div>
            <span className="text-xs bg-white/20 px-2 py-0.5 rounded">AI Tool</span>
          </Link>
          <div className="grid grid-cols-2 gap-2 pt-2">
            <Link
              href="/jobs"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-medium text-sm flex items-center gap-2"
            >
              <Briefcase className="w-4 h-4 text-brand-600" /> All Jobs
            </Link>
            <Link
              href="/category/govt"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-medium text-sm flex items-center gap-2"
            >
              <Building2 className="w-4 h-4 text-emerald-600" /> Govt Jobs
            </Link>
            <Link
              href="/category/it"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-medium text-sm flex items-center gap-2"
            >
              <Terminal className="w-4 h-4 text-indigo-600" /> IT & Tech
            </Link>
            <Link
              href="/category/railway"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-medium text-sm flex items-center gap-2"
            >
              <Shield className="w-4 h-4 text-orange-600" /> Railways
            </Link>
            <Link
              href="/category/bank"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-medium text-sm flex items-center gap-2"
            >
              <Building2 className="w-4 h-4 text-sky-600" /> Banking
            </Link>
            <Link
              href="/blog"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-medium text-sm flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4 text-purple-600" /> Blog & Guides
            </Link>
          </div>
          <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
            <Link href="/admin" onClick={() => setMobileMenuOpen(false)} className="hover:underline">
              Admin Login
            </Link>
            <a
              href="https://chat.whatsapp.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-600 font-semibold flex items-center gap-1"
            >
              Join WhatsApp Group
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
