import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { getJobsByCategory, getAllJobs } from "@/lib/jobs";
import { JobCard } from "@/components/JobCard";
import { QuickFilters } from "@/components/QuickFilters";
import { Briefcase, ChevronRight } from "lucide-react";

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

const categoryTitles: Record<string, { title: string; desc: string }> = {
  govt: {
    title: "Central Government Jobs 2026",
    desc: "Latest SSC, UPSC, Ministries, and Central Public Sector Undertaking (PSU) recruitment notifications."
  },
  it: {
    title: "IT & Software Jobs 2026",
    desc: "Freshers off-campus drives, MNC software engineer openings, tech startups, and remote developer jobs."
  },
  railway: {
    title: "Indian Railways (RRB / RRC) Jobs 2026",
    desc: "RRB NTPC, Group D, ALP, Technician, and Junior Engineer recruitment alerts across all Indian Railway zones."
  },
  bank: {
    title: "Banking & Insurance Jobs 2026",
    desc: "IBPS PO, Clerk, SO, SBI, RBI, and nationalized bank probationary officer recruitment notifications."
  },
  defence: {
    title: "Indian Armed Forces & Defence Jobs",
    desc: "Join Indian Army, Navy, Air Force, Agniveer rally schedules, and NDA/CDS notifications."
  },
  police: {
    title: "State Police & Security Forces Recruitment",
    desc: "Constable, Sub-Inspector (SI), and PAC recruitment across UP, Bihar, Rajasthan, Maharashtra, and Delhi."
  },
  teaching: {
    title: "Teaching & Academic Jobs 2026",
    desc: "CTET, State TET, KVS, NVS, Assistant Professor, and School Teacher vacancies."
  },
  freshers: {
    title: "Fresher & Entry-Level Job Alerts",
    desc: "Off-campus hiring, graduate trainee programs, and entry-level positions with zero prior experience required."
  }
};

export async function generateStaticParams() {
  return [
    { slug: "govt" },
    { slug: "it" },
    { slug: "railway" },
    { slug: "bank" },
    { slug: "defence" },
    { slug: "police" },
    { slug: "teaching" },
    { slug: "freshers" },
  ];
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const cat = categoryTitles[params.slug.toLowerCase()];
  if (!cat) {
    return { title: "Category Not Found | zovyn.in" };
  }

  return {
    title: `${cat.title} - Latest Alerts & Apply Online`,
    description: cat.desc,
    alternates: {
      canonical: `https://zovyn.in/category/${params.slug}`,
    },
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const slug = params.slug.toLowerCase();
  const info = categoryTitles[slug];
  if (!info) {
    notFound();
  }

  const jobs = getJobsByCategory(slug);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Breadcrumb */}
      <nav className="text-xs text-slate-500 flex items-center gap-1.5">
        <Link href="/" className="hover:underline">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/jobs" className="hover:underline">Jobs</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-slate-800 dark:text-slate-200 font-semibold">{info.title}</span>
      </nav>

      {/* Header */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          {info.title}
        </h1>
        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mt-2 max-w-3xl">
          {info.desc}
        </p>
      </div>

      <QuickFilters activeCategory={slug} />

      {/* Jobs Grid */}
      {jobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8">
          <Briefcase className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">New Notifications Coming Soon</h3>
          <p className="text-sm text-slate-500 mt-1">
            We continuously poll official portals every morning at 7:00 AM IST for new releases.
          </p>
        </div>
      )}
    </div>
  );
}
