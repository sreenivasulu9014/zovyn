import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { getJobsByState, getAllJobs, getAllBlogs } from "@/lib/jobs";
import { JobCard } from "@/components/JobCard";
import { formatDate } from "@/lib/utils";
import { 
  MapPin, 
  ChevronRight, 
  Briefcase, 
  Building2, 
  ExternalLink, 
  CheckCircle2, 
  FileText, 
  Send, 
  MessageSquare,
  Sparkles,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Calendar,
  GraduationCap
} from "lucide-react";

interface StatePageProps {
  params: {
    state: string;
  };
}

export async function generateStaticParams() {
  return [
    { state: "andhra-pradesh" },
    { state: "telangana" },
    { state: "uttar-pradesh" },
    { state: "maharashtra" },
    { state: "bihar" },
    { state: "rajasthan" },
    { state: "karnataka" },
    { state: "tamil-nadu" },
    { state: "kerala" },
    { state: "gujarat" },
    { state: "west-bengal" },
    { state: "odisha" },
    { state: "madhya-pradesh" },
    { state: "punjab" },
    { state: "haryana" },
    { state: "assam" },
    { state: "jharkhand" },
    { state: "chhattisgarh" },
    { state: "uttarakhand" },
    { state: "himachal-pradesh" },
    { state: "delhi" },
    { state: "jammu-and-kashmir" },
    { state: "all-india" },
  ];
}

export async function generateMetadata({ params }: StatePageProps): Promise<Metadata> {
  const isAP = params.state === "andhra-pradesh";
  const isTS = params.state === "telangana";

  if (isAP) {
    return {
      title: "5,852 New Andhra Pradesh Govt Jobs 2026 | Apply Online (APPSC, DSC, Police) | zovyn.in",
      description:
        "Latest Andhra Pradesh Govt Jobs 2026: Find the latest updates on new government job notifications across AP from APPSC, AP Police, AP DSC, APGENCO, APSRTC, Universities, Railways. 10th, 12th, ITI, Diploma, Degree, B.Tech.",
      alternates: {
        canonical: "https://zovyn.in/state/andhra-pradesh",
      },
    };
  }

  if (isTS) {
    return {
      title: "Telangana Govt Jobs 2026: TGPSC Group 1, Police, Singareni & Tech Jobs | zovyn.in",
      description:
        "Latest Telangana State Govt Jobs 2026: TGPSC Group 1, 2, 3, TS Police Constable, SI, DSC Teacher, and IT software jobs in Hyderabad.",
      alternates: {
        canonical: "https://zovyn.in/state/telangana",
      },
    };
  }

  const formattedState = params.state
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    title: `Government & IT Jobs in ${formattedState} (2026) | zovyn.in`,
    description: `Latest State Govt, Public Service Commission (PSC), Police Bharti, and IT Software openings in ${formattedState}. Verified notifications & direct apply links.`,
    alternates: {
      canonical: `https://zovyn.in/state/${params.state}`,
    },
  };
}

export default function StatePage({ params }: StatePageProps) {
  const isAP = params.state === "andhra-pradesh";
  const isTS = params.state === "telangana";
  const formattedState = params.state
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const jobs = getJobsByState(params.state);
  const allBlogs = getAllBlogs();
  const regionalBlogs = isAP
    ? allBlogs.filter((b) => b.state === "Andhra Pradesh" || b.language === "bilingual")
    : isTS
    ? allBlogs.filter((b) => b.state === "Telangana" || b.language === "bilingual")
    : [];

  const apDistricts = [
    "Visakhapatnam",
    "Vijayawada (NTR)",
    "Guntur",
    "Tirupati",
    "Kurnool",
    "Nellore (SPSR)",
    "Anantapur",
    "YSR Kadapa",
    "Kakinada",
    "Rajahmundry",
    "Eluru",
    "Ongole",
  ];

  const tsDistricts = [
    "Hyderabad",
    "Warangal",
    "Nizamabad",
    "Karimnagar",
    "Khammam",
    "Nalgonda",
    "Mahabubnagar",
    "Rangareddy",
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Breadcrumb */}
      <nav className="text-xs text-slate-500 flex items-center gap-1.5 flex-wrap">
        <Link href="/" className="hover:underline">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/jobs" className="hover:underline">Jobs</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-slate-800 dark:text-slate-200 font-semibold">{formattedState} Jobs</span>
      </nav>

      {/* ANDHRA PRADESH SPECIAL MEGA HERO */}
      {isAP ? (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
            {/* Visual Banner */}
            <div className="relative aspect-[21/9] sm:aspect-[24/8] w-full overflow-hidden bg-slate-950">
              <img
                src="/images/ap-mega-jobs-banner.svg"
                alt="5,852 New Andhra Pradesh Govt Jobs 2026"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6 sm:p-10 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 bg-amber-100 dark:bg-amber-950 dark:text-amber-300 px-3 py-1 rounded-full border border-amber-300">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>ఆంధ్రప్రదేశ్ అధికారిక రిక్రూట్‌మెంట్ హబ్ 2026</span>
                </span>
                <span className="text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 px-3 py-1 rounded-full border border-emerald-300">
                  ✓ 5,852+ Active Vacancies
                </span>
                <span className="text-xs font-bold bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 px-3 py-1 rounded-full border border-blue-300">
                  ⚡ Daily Updated Portal
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                5,852 New Andhra Pradesh Govt Jobs 2026 | Apply Online
              </h1>

              {/* Exact reference content requested by the user */}
              <div className="prose prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed bg-slate-50 dark:bg-slate-800/60 p-5 rounded-2xl border border-slate-200 dark:border-slate-700">
                <p>
                  <strong>Latest Andhra Pradesh Govt Jobs 2026:</strong> Find the latest updates on new government job notifications across Andhra Pradesh (AP) from <strong>APPSC, AP Police, APGENCO, APSRTC, APTRANSCO, APFDC, Universities, PSUs, Banking, Railways, Defence,</strong> and Central Government departments. Explore Sarkari Job Vacancies in Andhra Pradesh for <strong>10th, 12th, ITI, Diploma, Degree, Engineering, Nursing, Medical,</strong> and Postgraduate candidates. This page is updated daily with the latest and upcoming AP Govt Jobs bookmark this page for daily Sarkari Naukri updates from Andhra Pradesh.
                </p>
              </div>

              {/* District Navigation Chips */}
              <div className="pt-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  జిల్లా వారీ ఖాళీలు (Filter by District):
                </span>
                <div className="flex flex-wrap gap-2 text-xs">
                  {apDistricts.map((dist) => (
                    <span
                      key={dist}
                      className="bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 font-medium hover:border-brand-500 transition cursor-pointer"
                    >
                      {dist}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* FREEJOBALERT-STYLE NEW NOTIFICATIONS COMPARISON TABLE */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-brand-600" />
                  <span>ఆంధ్రప్రదేశ్ తాజా నోటిఫికేషన్ల పట్టిక (New AP Notifications Table 2026)</span>
                </h2>
                <p className="text-xs text-slate-500">
                  Direct official apply links and notification notifications sorted by latest announcement.
                </p>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 dark:bg-emerald-950 dark:text-emerald-300 px-3 py-1 rounded-full border border-emerald-200 self-start sm:self-auto">
                Live &amp; Verified
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-b border-slate-200 dark:border-slate-700">
                    <th className="p-3 font-bold">రిక్రూట్‌మెంట్ బోర్డు / శాఖ</th>
                    <th className="p-3 font-bold">పోస్టు పేరు</th>
                    <th className="p-3 font-bold">ఖాళీలు</th>
                    <th className="p-3 font-bold">విద్యార్హత</th>
                    <th className="p-3 font-bold">చివరి తేదీ</th>
                    <th className="p-3 font-bold text-center">దరఖాస్తు లింక్</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {jobs.map((job) => (
                    <tr key={job.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition">
                      <td className="p-3 font-bold text-brand-600 dark:text-brand-400">
                        {job.organization}
                      </td>
                      <td className="p-3">
                        <Link href={`/jobs/${job.slug}`} className="font-bold text-slate-900 dark:text-white hover:text-brand-600 block">
                          {job.title}
                        </Link>
                        {job.teluguTitle && (
                          <span className="text-[11px] text-amber-700 dark:text-amber-400 block line-clamp-1 mt-0.5">
                            {job.teluguTitle}
                          </span>
                        )}
                      </td>
                      <td className="p-3 font-bold text-emerald-600 dark:text-emerald-400 whitespace-nowrap">
                        {job.vacancies}
                      </td>
                      <td className="p-3 text-slate-600 dark:text-slate-300 whitespace-nowrap">
                        {job.qualification.join(", ")}
                      </td>
                      <td className="p-3 font-semibold text-red-600 whitespace-nowrap">
                        {formatDate(job.importantDates.lastDate)}
                      </td>
                      <td className="p-3 text-center whitespace-nowrap space-x-1">
                        <Link
                          href={`/jobs/${job.slug}`}
                          className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold px-2.5 py-1.5 rounded-lg text-xs"
                        >
                          Details
                        </Link>
                        <a
                          href={job.applyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-brand-600 hover:bg-brand-500 text-white font-bold px-3 py-1.5 rounded-lg text-xs inline-flex items-center gap-1 shadow"
                        >
                          <span>Apply</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : isTS ? (
        /* TELANGANA SPECIAL HERO */
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
          <div className="relative aspect-[21/9] sm:aspect-[24/8] w-full overflow-hidden bg-slate-950">
            <img
              src="/images/tgpsc-group1-banner.svg"
              alt="Telangana Govt Jobs 2026"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6 sm:p-10 space-y-4">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-700 bg-indigo-50 dark:bg-indigo-950 dark:text-indigo-300 px-3 py-1 rounded-full border border-indigo-200">
              <MapPin className="w-3.5 h-3.5" />
              <span>తెలంగాణ తాజా ఉద్యోగ సమాచారం 2026</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              Telangana State Govt &amp; IT Software Jobs 2026
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              Find the latest updates on TGPSC Group 1, Group 2, Group 3, Telangana Police SI &amp; Constable, Singareni Collieries, Gurukulam Teacher recruitment, and high-paying IT software developer openings across Hyderabad, Cyberabad, and Hitec City.
            </p>

            <div className="pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                జిల్లాల వారీ లింకులు:
              </span>
              <div className="flex flex-wrap gap-2 text-xs">
                {tsDistricts.map((dist) => (
                  <span
                    key={dist}
                    className="bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 font-medium"
                  >
                    {dist}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Standard State Hero */
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-saffron-600 bg-saffron-50 dark:bg-saffron-950 px-2.5 py-1 rounded-full mb-3">
            <MapPin className="w-3.5 h-3.5" />
            <span>Regional Job Hub</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Government &amp; IT Jobs in {formattedState}
          </h1>
          <p className="text-sm text-slate-500 mt-2">
            Discover all State PSC, Departmental, Police, Municipal, and Tech opportunities open for candidates in {formattedState}.
          </p>
        </div>
      )}

      {/* Featured Telugu Articles & Guides (if AP or TS) */}
      {regionalBlogs.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-brand-600" />
                <span>పరీక్షా సిలబస్ &amp; ప్రిపరేషన్ గైడ్లు (Telugu Guides &amp; Syllabus)</span>
              </h2>
              <p className="text-xs text-slate-500">
                Detailed breakdowns of exam patterns, syllabus, and booklists
              </p>
            </div>
            <Link href="/blog" className="text-xs font-bold text-brand-600 hover:underline flex items-center gap-1">
              View All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {regionalBlogs.slice(0, 3).map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-lg hover:border-brand-500/50 transition flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-video relative overflow-hidden bg-slate-900">
                    <img
                      src={post.imageUrl || "/images/ap-mega-jobs-banner.svg"}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                  </div>
                  <div className="p-4 space-y-1.5">
                    <span className="text-[10px] font-bold text-brand-600 bg-brand-50 dark:bg-brand-950 px-2 py-0.5 rounded">
                      {post.category}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-brand-600 line-clamp-2">
                      {post.teluguTitle || post.title}
                    </h3>
                  </div>
                </div>
                <div className="p-4 pt-0 text-[11px] text-brand-600 font-semibold flex items-center gap-1">
                  పూర్తి వివరాలు చదవండి →
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Grid of Job Cards */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Active Recruitment Notifications ({jobs.length})
        </h2>

        {jobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8">
            <Briefcase className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">No Direct Openings for {formattedState} Currently</h3>
            <p className="text-sm text-slate-500 mt-1">
              Check All India Central Govt openings which are open to candidates across all states.
            </p>
            <Link
              href="/category/govt"
              className="inline-block mt-4 bg-brand-600 text-white text-xs font-semibold px-4 py-2 rounded-xl"
            >
              View Central Govt Jobs
            </Link>
          </div>
        )}
      </div>

      {/* Official State Portals Reference Directory */}
      {isAP && (
        <div className="bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              ఆంధ్రప్రదేశ్ అధికారిక రిక్రూట్‌మెంట్ వెబ్‌సైట్లు (Official AP Govt Websites)
            </h3>
          </div>
          <p className="text-xs text-slate-500">
            Verify announcements directly on respective government servers:
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <a
              href="https://psc.ap.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-brand-500 font-semibold text-slate-800 dark:text-slate-200 flex items-center justify-between"
            >
              <span>APPSC Portal</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>
            <a
              href="https://apdsc.apcfss.in"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-brand-500 font-semibold text-slate-800 dark:text-slate-200 flex items-center justify-between"
            >
              <span>AP DSC (Teacher)</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>
            <a
              href="https://slprb.ap.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-brand-500 font-semibold text-slate-800 dark:text-slate-200 flex items-center justify-between"
            >
              <span>AP Police (SLPRB)</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>
            <a
              href="https://aphc.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-brand-500 font-semibold text-slate-800 dark:text-slate-200 flex items-center justify-between"
            >
              <span>AP High Court</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
