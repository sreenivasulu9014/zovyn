import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { getJobsByQualification } from "@/lib/jobs";
import { JobCard } from "@/components/JobCard";
import { GraduationCap, ChevronRight, Briefcase } from "lucide-react";

interface QualificationPageProps {
  params: {
    slug: string;
  };
}

const qualData: Record<string, { label: string; desc: string }> = {
  "10th": {
    label: "10th Pass Govt & Tradesman Jobs",
    desc: "Army Agniveer, Railway Group D, SSC MTS, Post Office GDS, and state level matriculation jobs.",
  },
  "12th": {
    label: "12th Pass Govt & Police Jobs",
    desc: "UP Police Constable, SSC CHSL, Railway Clerks, NDA, and clerical jobs for Intermediate pass candidates.",
  },
  "graduate": {
    label: "Graduate / Degree Jobs",
    desc: "UPSC Civil Services, SSC CGL, IBPS Bank PO/Clerk, State PSC, and executive roles for Bachelor degree holders.",
  },
  "b-tech": {
    label: "B.Tech / B.E Engineering Jobs",
    desc: "Software Engineering, AI Engineer, PSU GATE recruitment, Indian Engineering Services (IES), and tech roles.",
  },
  "diploma": {
    label: "Diploma & ITI Technical Jobs",
    desc: "Junior Engineer (JE), Railway Loco Pilot (ALP), Technician Grade, and PSU trade apprenticeships.",
  },
};

export async function generateStaticParams() {
  return [
    { slug: "10th" },
    { slug: "12th" },
    { slug: "graduate" },
    { slug: "b-tech" },
    { slug: "diploma" },
  ];
}

export async function generateMetadata({ params }: QualificationPageProps): Promise<Metadata> {
  const item = qualData[params.slug.toLowerCase()];
  const title = item ? item.label : "Qualification Jobs";
  return {
    title: `${title} (2026) | zovyn.in`,
    description: item ? item.desc : "Jobs filtered by qualification",
    alternates: {
      canonical: `https://zovyn.in/qualification/${params.slug}`,
    },
  };
}

export default function QualificationPage({ params }: QualificationPageProps) {
  const slug = params.slug.toLowerCase();
  const info = qualData[slug] || {
    label: `${slug.toUpperCase()} Pass Jobs`,
    desc: "Jobs filtered by educational eligibility.",
  };

  const lookupKey = slug === "b-tech" ? "B.Tech" : slug === "graduate" ? "Graduate" : slug;
  const jobs = getJobsByQualification(lookupKey);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <nav className="text-xs text-slate-500 flex items-center gap-1.5">
        <Link href="/" className="hover:underline">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/jobs" className="hover:underline">Jobs</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-slate-800 dark:text-slate-200 font-semibold">{info.label}</span>
      </nav>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-600 bg-purple-50 dark:bg-purple-950 px-2.5 py-1 rounded-full mb-3">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Qualification Filter</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          {info.label}
        </h1>
        <p className="text-sm text-slate-500 mt-2 max-w-3xl">
          {info.desc}
        </p>
      </div>

      {jobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8">
          <Briefcase className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">No Direct Openings Found</h3>
          <p className="text-sm text-slate-500 mt-1">
            Browse our full directory to see all active postings.
          </p>
        </div>
      )}
    </div>
  );
}
