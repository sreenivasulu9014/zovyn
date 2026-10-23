"use client";

import React, { useState } from "react";
import { UserProfile, Qualification, MatchResult } from "@/types/job";
import { matchJobsWithProfile } from "@/lib/jobs";
import { JobCard } from "@/components/JobCard";
import { 
  Sparkles, 
  GraduationCap, 
  MapPin, 
  Briefcase, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  RotateCcw,
  SlidersHorizontal,
  Flame
} from "lucide-react";

export default function AiMatchPage() {
  const [qualification, setQualification] = useState<Qualification>("Graduate");
  const [age, setAge] = useState<number>(23);
  const [state, setState] = useState<string>("All India");
  const [sector, setSector] = useState<'all' | 'govt' | 'it'>("all");
  const [experience, setExperience] = useState<string>("Fresher");
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [matches, setMatches] = useState<MatchResult[]>([]);

  const handleMatch = (e: React.FormEvent) => {
    e.preventDefault();
    const profile: UserProfile = {
      qualification,
      age,
      state,
      targetSector: sector,
      experience,
    };
    const results = matchJobsWithProfile(profile);
    setMatches(results);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setMatches([]);
  };

  const statesList = [
    "All India",
    "Uttar Pradesh",
    "Maharashtra",
    "Bihar",
    "Rajasthan",
    "Karnataka",
    "Delhi",
    "Madhya Pradesh",
    "Tamil Nadu",
    "West Bengal",
    "Gujarat",
    "Punjab",
    "Haryana",
    "Telangana",
    "Kerala",
    "Odisha",
    "Jharkhand",
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300 border border-brand-200 dark:border-brand-800 px-3.5 py-1.5 rounded-full text-xs font-semibold">
          <Sparkles className="w-4 h-4 text-brand-600 animate-spin" style={{ animationDuration: "5s" }} />
          <span>AI Profile Matching Algorithm</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Find Jobs Accurately Matched to Your Profile
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
          Stop sifting through hundreds of irrelevant notifications. Tell our AI engine your qualification, age, and location — and receive verified Sarkari & IT openings with exact eligibility match scores.
        </p>
      </div>

      {/* Main interactive form or results */}
      {!submitted ? (
        <div className="max-w-3xl mx-auto bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-xl">
          <form onSubmit={handleMatch} className="space-y-6">
            {/* Qualification Selector */}
            <div>
              <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-brand-600" />
                Select Your Highest Qualification
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  "10th",
                  "12th",
                  "Diploma",
                  "Graduate",
                  "B.Tech/B.E",
                  "BCA/MCA",
                  "Post Graduate",
                  "Any Graduate",
                ].map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => setQualification(q as Qualification)}
                    className={`py-2.5 px-3 rounded-xl border text-xs sm:text-sm font-semibold transition text-center ${
                      qualification === q
                        ? "bg-brand-600 text-white border-brand-600 shadow-sm"
                        : "bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-brand-400"
                    }`}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Age & Experience Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2">
                  Your Age: <span className="text-brand-600 font-extrabold">{age} Years</span>
                </label>
                <input
                  type="range"
                  min="17"
                  max="45"
                  value={age}
                  onChange={(e) => setAge(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-brand-600"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                  <span>17 Years</span>
                  <span>30 Years</span>
                  <span>45 Years</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-brand-600" />
                  Experience Level
                </label>
                <select
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  <option value="Fresher">Fresher (Looking for 1st Job)</option>
                  <option value="0-2 Years">0 - 2 Years Experience</option>
                  <option value="2-5 Years">2 - 5 Years Experience</option>
                  <option value="5+ Years">5+ Years Senior Experience</option>
                </select>
              </div>
            </div>

            {/* State Domicile & Target Sector */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-brand-600" />
                  Your State / Domicile
                </label>
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  {statesList.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2">
                  Target Career Domain
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "all", label: "Both (Govt + IT)" },
                    { id: "govt", label: "Govt Only" },
                    { id: "it", label: "IT / Tech Only" },
                  ].map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSector(s.id as any)}
                      className={`py-2 px-2 rounded-xl border text-xs font-semibold text-center transition ${
                        sector === s.id
                          ? "bg-brand-600 text-white border-brand-600 shadow-sm"
                          : "bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700"
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-600 hover:from-brand-700 hover:to-purple-700 text-white font-bold text-base shadow-xl shadow-brand-500/25 transition transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5 text-yellow-300" />
              <span>Calculate My AI Job Matches Now</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        </div>
      ) : (
        /* Results Section */
        <div className="space-y-8">
          <div className="bg-brand-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 border border-brand-800 shadow-xl">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-xs font-bold text-yellow-300 uppercase tracking-wider">
                Matching Complete
              </span>
              <h2 className="text-xl sm:text-2xl font-black">
                Found {matches.length} Jobs Matched for {qualification} ({age} yrs, {state})
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
                Sorted by AI compatibility score based on academic eligibility and age limits.
              </p>
            </div>
            <button
              onClick={handleReset}
              className="bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl border border-white/20 flex items-center gap-1.5 transition whitespace-nowrap"
            >
              <RotateCcw className="w-4 h-4" />
              Recalculate Profile
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {matches.map(({ job, matchScore, matchedCriteria, unmatchedCriteria, recommendationTip }) => (
              <div
                key={job.id}
                className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-md hover:shadow-xl transition flex flex-col justify-between"
              >
                <div>
                  {/* Top Match Score Pill */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div
                        className={`text-sm font-black px-3 py-1 rounded-xl text-white flex items-center gap-1 ${
                          matchScore >= 80
                            ? "bg-emerald-600"
                            : matchScore >= 60
                            ? "bg-brand-600"
                            : "bg-amber-600"
                        }`}
                      >
                        <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                        {matchScore}% Profile Match
                      </div>
                      <span className="text-xs font-bold text-slate-500 uppercase">{job.category}</span>
                    </div>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2.5 py-1 rounded-lg">
                      {job.vacancies} Posts
                    </span>
                  </div>

                  {/* Title & Org */}
                  <p className="text-xs text-slate-500 font-medium">{job.organization}</p>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1 mb-3 line-clamp-2">
                    {job.title}
                  </h3>

                  {/* AI Match analysis checklist */}
                  <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl space-y-2 mb-4 text-xs">
                    {matchedCriteria.map((c, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-medium">
                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                        <span>{c}</span>
                      </div>
                    ))}
                    {unmatchedCriteria.map((u, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-medium">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{u}</span>
                      </div>
                    ))}
                    <div className="pt-2 border-t border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-semibold">
                      {recommendationTip}
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
                  <a
                    href={`/jobs/${job.slug}`}
                    className="text-xs font-semibold text-brand-600 hover:underline flex items-center gap-1"
                  >
                    View Details
                  </a>
                  <a
                    href={job.applyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs px-4 py-2 rounded-xl transition"
                  >
                    Apply on Official Portal
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
