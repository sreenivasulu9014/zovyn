import React from "react";
import { getAllJobs } from "@/lib/jobs";
import { JobCard } from "@/components/JobCard";
import { QuickFilters } from "@/components/QuickFilters";
import { Search, Filter, Briefcase, SlidersHorizontal } from "lucide-react";

interface JobsPageProps {
  searchParams?: {
    q?: string;
    category?: string;
    state?: string;
    qualification?: string;
  };
}

export default function JobsPage({ searchParams }: JobsPageProps) {
  const query = searchParams?.q?.toLowerCase() || "";
  const selectedCategory = searchParams?.category || "";
  const selectedState = searchParams?.state || "";
  const selectedQual = searchParams?.qualification || "";

  const allJobs = getAllJobs();

  const filteredJobs = allJobs.filter((job) => {
    // Search query check
    if (query) {
      const matchTitle = job.title.toLowerCase().includes(query);
      const matchOrg = job.organization.toLowerCase().includes(query);
      const matchTags = job.tags.some((t) => t.toLowerCase().includes(query));
      const matchQual = job.qualification.some((q) => q.toLowerCase().includes(query));
      if (!matchTitle && !matchOrg && !matchTags && !matchQual) return false;
    }

    // Category check
    if (selectedCategory && selectedCategory !== "all") {
      if (job.category.toLowerCase() !== selectedCategory.toLowerCase()) return false;
    }

    // State check
    if (selectedState && selectedState !== "all") {
      const jobState = job.state.toLowerCase();
      const targetState = selectedState.toLowerCase().replace(/-/g, " ");
      if (jobState !== "all india" && jobState !== targetState) return false;
    }

    // Qualification check
    if (selectedQual && selectedQual !== "all") {
      if (!job.qualification.some((q) => q.toLowerCase().includes(selectedQual.toLowerCase()))) {
        return false;
      }
    }

    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header */}
      <div>
        <nav className="text-xs text-slate-500 mb-2 flex items-center gap-1.5">
          <a href="/" className="hover:underline">Home</a>
          <span>/</span>
          <span className="text-slate-800 dark:text-slate-200 font-semibold">All Jobs</span>
        </nav>
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Government & IT Job Notifications (2026)
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Showing {filteredJobs.length} active opportunities across Central Govt, State PSCs, Banking, Railways, and IT.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <form method="GET" action="/jobs" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
            <input
              type="text"
              name="q"
              defaultValue={query}
              placeholder="Search by role or exam..."
              className="w-full pl-9 pr-3 py-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div>
            <select
              name="category"
              defaultValue={selectedCategory}
              className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value="">All Categories</option>
              <option value="govt">Central Government</option>
              <option value="it">IT & Software</option>
              <option value="railway">Railways</option>
              <option value="bank">Banking</option>
              <option value="defence">Defence & Army</option>
              <option value="police">Police</option>
              <option value="freshers">Freshers</option>
            </select>
          </div>

          <div>
            <select
              name="qualification"
              defaultValue={selectedQual}
              className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value="">Any Qualification</option>
              <option value="10th">10th Pass</option>
              <option value="12th">12th Pass</option>
              <option value="Graduate">Graduate</option>
              <option value="B.Tech">B.Tech / B.E</option>
              <option value="BCA">BCA / MCA</option>
              <option value="Diploma">Diploma / ITI</option>
            </select>
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              className="flex-1 bg-brand-600 hover:bg-brand-500 text-white font-semibold text-sm py-2.5 rounded-xl transition shadow"
            >
              Filter Jobs
            </button>
            <a
              href="/jobs"
              className="px-3 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-medium text-sm rounded-xl transition text-center"
            >
              Reset
            </a>
          </div>
        </form>

        <QuickFilters activeCategory={selectedCategory || "all"} />
      </div>

      {/* Jobs Grid */}
      {filteredJobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8">
          <Briefcase className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">No Matching Notifications Found</h3>
          <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">
            Try adjusting your search filters or check out our featured openings.
          </p>
          <a
            href="/jobs"
            className="inline-block mt-4 bg-brand-600 text-white text-xs font-semibold px-4 py-2 rounded-xl"
          >
            Clear All Filters
          </a>
        </div>
      )}
    </div>
  );
}
