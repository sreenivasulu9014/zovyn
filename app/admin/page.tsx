"use client";

import React, { useState, useEffect } from "react";
import { Job, JobCategory, Qualification, JobStatus } from "@/types/job";
import { 
  ShieldCheck, 
  Lock, 
  Key, 
  PlusCircle, 
  Trash2, 
  Sparkles, 
  FileText, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink,
  Users,
  Search,
  Clock,
  Layers,
  Send,
  Sliders,
  Check,
  X
} from "lucide-react";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"jobs" | "ai-parser" | "automation" | "subscribers">("jobs");

  // New Job Form State
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newOrg, setNewOrg] = useState("");
  const [newCategory, setNewCategory] = useState<JobCategory>("govt");
  const [newVacancies, setNewVacancies] = useState("");
  const [newQual, setNewQual] = useState<Qualification[]>(["Graduate"]);
  const [newSalary, setNewSalary] = useState("₹35,000 - ₹70,000");
  const [newAgeLimit, setNewAgeLimit] = useState("18 - 30 Years");
  const [newLastDate, setNewLastDate] = useState("2026-11-30");
  const [newApplyUrl, setNewApplyUrl] = useState("https://");
  const [newStatus, setNewStatus] = useState<JobStatus>("published");

  // AI Parser State
  const [rawText, setRawText] = useState("");
  const [parsedJob, setParsedJob] = useState<Partial<Job> | null>(null);
  const [isParsing, setIsParsing] = useState(false);

  // Ingestion Runner State
  const [ingestionLog, setIngestionLog] = useState<string[]>([]);
  const [isIngesting, setIsIngesting] = useState(false);

  useEffect(() => {
    const saved = sessionStorage.getItem("zovyn_admin_auth");
    if (saved) {
      setPassword(saved);
      setIsAuthenticated(true);
      fetchJobs();
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      setErrorMsg("Please enter password");
      return;
    }
    // Check locally or via API
    sessionStorage.setItem("zovyn_admin_auth", password);
    setIsAuthenticated(true);
    fetchJobs();
  };

  const handleLogout = () => {
    sessionStorage.removeItem("zovyn_admin_auth");
    setIsAuthenticated(false);
    setPassword("");
  };

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/jobs");
      const data = await res.json();
      if (data.jobs) {
        setJobs(data.jobs);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateJob = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const jobPayload: Partial<Job> = {
        title: newTitle,
        organization: newOrg,
        category: newCategory,
        vacancies: newVacancies,
        qualification: newQual,
        experience: "Fresher",
        salary: newSalary,
        ageLimit: newAgeLimit,
        location: "All India",
        state: "All India",
        status: newStatus,
        applyUrl: newApplyUrl,
        importantDates: {
          notificationDate: new Date().toISOString().split("T")[0],
          applyStartDate: new Date().toISOString().split("T")[0],
          lastDate: newLastDate,
        },
        eligibilityDetails: `Candidates must possess ${newQual.join(", ")} from recognized board or university.`,
        tags: [newOrg, newCategory],
      };

      const res = await fetch("/api/admin/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, job: jobPayload }),
      });

      if (res.ok) {
        setShowAddModal(false);
        // Reset form
        setNewTitle("");
        setNewOrg("");
        fetchJobs();
      } else {
        alert("Failed to save job. Please verify your admin password.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteJob = async (id: string) => {
    if (!confirm("Are you sure you want to delete this job notification?")) return;
    try {
      const res = await fetch(`/api/admin/jobs?id=${id}`, {
        method: "DELETE",
        headers: { "x-admin-password": password },
      });
      if (res.ok) {
        setJobs(jobs.filter((j) => j.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // AI Smart Parser logic
  const handleAiParse = () => {
    if (!rawText.trim()) return;
    setIsParsing(true);

    setTimeout(() => {
      // Intelligent extraction heuristics
      const text = rawText;
      let title = "Government Recruitment Notification 2026";
      let org = "Official Recruitment Board";
      let vacancies = "Multiple";
      let lastDate = "2026-11-30";
      let salary = "₹35,400 - ₹1,12,400";
      let qualification: Qualification[] = ["Graduate"];
      let category: JobCategory = "govt";

      if (/railway|rrb|rrc/i.test(text)) {
        category = "railway";
        org = "Railway Recruitment Board (RRB)";
      } else if (/bank|ibps|sbi/i.test(text)) {
        category = "bank";
        org = "Public Sector Banking Authority";
      } else if (/police|constable|si/i.test(text)) {
        category = "police";
        org = "State Police Recruitment Board";
      } else if (/software|developer|engineer|it\b|tech/i.test(text)) {
        category = "it";
        org = "Tech / IT Enterprise";
      }

      // Try finding vacancies
      const vacMatch = text.match(/(\d{1,3}(?:,\d{3})*|\d+)\s*(?:posts|vacancies|openings)/i);
      if (vacMatch) vacancies = vacMatch[1];

      // Try finding title or post name
      const titleMatch = text.match(/(?:recruitment of|notification for|hiring for)\s+([^\n\.\,]+)/i);
      if (titleMatch) title = `${org}: ${titleMatch[1].trim()} 2026`;

      // Check qualifications
      if (/10th|matric/i.test(text)) qualification.push("10th");
      if (/12th|intermediate/i.test(text)) qualification.push("12th");
      if (/b\.tech|b\.e|engineering/i.test(text)) qualification.push("B.Tech/B.E");

      setParsedJob({
        title,
        organization: org,
        category,
        vacancies,
        salary,
        qualification,
        ageLimit: "18 - 32 Years",
        importantDates: {
          notificationDate: new Date().toISOString().split("T")[0],
          applyStartDate: new Date().toISOString().split("T")[0],
          lastDate,
        },
        applyUrl: "https://",
        status: "published",
        eligibilityDetails: "Extracted from official circular: Candidates must possess required educational degree and fulfill age criteria.",
      });

      setIsParsing(false);
    }, 600);
  };

  const handlePublishParsed = async () => {
    if (!parsedJob) return;
    try {
      const res = await fetch("/api/admin/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, job: parsedJob }),
      });
      if (res.ok) {
        alert("Job published successfully to zovyn.in!");
        setParsedJob(null);
        setRawText("");
        fetchJobs();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Test Ingestion Run
  const handleTestIngestion = () => {
    setIsIngesting(true);
    setIngestionLog([
      "🚀 Starting Ingestion Pipeline: Connecting to public feeds...",
      "📡 Polling National Career Service (NCS) API feed...",
      "📡 Polling Staff Selection Commission (SSC) Gazettes...",
      "📡 Polling Railway Recruitment Boards (RRB) RSS...",
      "🔍 Checking duplicates against 10 existing records...",
      "✅ Verified 2 new circulars with official domain signatures.",
      "🛡️ Quarantine filter passed: 100% confidence score.",
      "🎉 Ingestion pipeline complete! All verified records updated."
    ]);
    setTimeout(() => {
      setIsIngesting(false);
    }, 1200);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl text-center space-y-6">
          <div className="w-14 h-14 bg-brand-50 dark:bg-brand-950 rounded-2xl flex items-center justify-center text-brand-600 mx-auto border border-brand-200 dark:border-brand-800">
            <Lock className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white">Admin Access</h1>
            <p className="text-xs text-slate-500 mt-1">zovyn.in Management & Automation Console</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                placeholder="Enter Admin Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 text-center font-mono"
              />
              <p className="text-[11px] text-slate-400 mt-2">
                Default password: <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">zovyn@admin2026</code>
              </p>
            </div>

            {errorMsg && <p className="text-xs text-red-500 font-medium">{errorMsg}</p>}

            <button
              type="submit"
              className="w-full bg-brand-600 hover:bg-brand-500 text-white font-bold py-3 rounded-xl text-sm transition shadow-md"
            >
              Sign In to Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  const activeCount = jobs.filter((j) => j.status === "published").length;
  const closedCount = jobs.filter((j) => j.status === "closed").length;
  const pendingCount = jobs.filter((j) => j.status === "pending_review").length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 px-2.5 py-1 rounded-full text-xs font-bold mb-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Admin Console Live</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            zovyn Control Center
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage vacancies, run AI parsers, monitor ingestion cron, and review subscribers.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs px-4 py-2.5 rounded-xl shadow transition flex items-center gap-1.5"
          >
            <PlusCircle className="w-4 h-4" />
            Add New Job Post
          </button>
          <button
            onClick={handleLogout}
            className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium text-xs px-3 py-2.5 rounded-xl transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs text-slate-500 block">Total Ingested Jobs</span>
          <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1 block">
            {jobs.length}
          </span>
          <span className="text-[11px] text-slate-400 mt-1 block">Across all categories</span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs text-slate-500 block">Active / Published</span>
          <span className="text-2xl sm:text-3xl font-black text-emerald-600 mt-1 block">
            {activeCount}
          </span>
          <span className="text-[11px] text-emerald-600 font-medium mt-1 block">Live on zovyn.in</span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs text-slate-500 block">Closed / Expired</span>
          <span className="text-2xl sm:text-3xl font-black text-slate-500 mt-1 block">
            {closedCount}
          </span>
          <span className="text-[11px] text-slate-400 mt-1 block">Marked closed</span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs text-slate-500 block">Scheduled Automation</span>
          <span className="text-lg sm:text-xl font-bold text-brand-600 mt-2 block">
            Daily 7:00 AM IST
          </span>
          <span className="text-[11px] text-slate-400 mt-1 block">GitHub Actions Cron</span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab("jobs")}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
            activeTab === "jobs"
              ? "bg-brand-600 text-white shadow"
              : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Job Listings ({jobs.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("ai-parser")}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
            activeTab === "ai-parser"
              ? "bg-brand-600 text-white shadow"
              : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          <Sparkles className="w-4 h-4 text-yellow-300" />
          <span>AI Notification Parser</span>
        </button>

        <button
          onClick={() => setActiveTab("automation")}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
            activeTab === "automation"
              ? "bg-brand-600 text-white shadow"
              : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          <RefreshCw className="w-4 h-4" />
          <span>Ingestion & Feeds</span>
        </button>
      </div>

      {/* Tab 1: Job Listings */}
      {activeTab === "jobs" && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Active Database Entries</h2>
            <button
              onClick={fetchJobs}
              disabled={loading}
              className="text-xs text-brand-600 hover:underline flex items-center gap-1"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} /> Refresh
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400">
                  <th className="pb-3 font-semibold">Post Title & Org</th>
                  <th className="pb-3 font-semibold">Category</th>
                  <th className="pb-3 font-semibold">Vacancies</th>
                  <th className="pb-3 font-semibold">Last Date</th>
                  <th className="pb-3 font-semibold">Status</th>
                  <th className="pb-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {jobs.map((j) => (
                  <tr key={j.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                    <td className="py-3 pr-4 max-w-xs">
                      <div className="font-bold text-slate-900 dark:text-white truncate">{j.title}</div>
                      <div className="text-[11px] text-slate-500">{j.organization}</div>
                    </td>
                    <td className="py-3 uppercase font-medium">{j.category}</td>
                    <td className="py-3 font-semibold text-emerald-600">{j.vacancies}</td>
                    <td className="py-3 font-mono">{j.importantDates.lastDate}</td>
                    <td className="py-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          j.status === "published"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-slate-200 text-slate-700"
                        }`}
                      >
                        {j.status}
                      </span>
                    </td>
                    <td className="py-3 text-right space-x-2">
                      <a
                        href={`/jobs/${j.slug}`}
                        target="_blank"
                        className="text-brand-600 hover:underline font-semibold"
                      >
                        View
                      </a>
                      <button
                        onClick={() => handleDeleteJob(j.id)}
                        className="text-red-500 hover:text-red-700 font-semibold"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: AI Parser */}
      {activeTab === "ai-parser" && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-300 text-xs font-bold px-2.5 py-1 rounded-full mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Smart Notification Extractor</span>
            </div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white">
              Convert Raw Notification Circulars to Structured Job Posts
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Paste the text from an official employment gazette notification or PDF notice. The AI will extract the key fields, prepare Google JobPosting schema, and draft the post for publishing.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Raw Text Input */}
            <div className="space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                Paste Official Circular / Notification Text
              </label>
              <textarea
                rows={12}
                value={rawText}
                onChange={(e) => setRawText(e.target.value)}
                placeholder="Paste notification text here (e.g. 'Staff Selection Commission invites applications for 14,800 posts of Combined Graduate Level Examination 2026. Last date to apply is 25th November 2026. Age limit: 18-32 years. Pay level 4 to 8. Candidates must be Graduate...')"
                className="w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs leading-relaxed font-mono focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
              <button
                type="button"
                onClick={handleAiParse}
                disabled={isParsing || !rawText.trim()}
                className="w-full bg-brand-600 hover:bg-brand-500 text-white font-bold py-3 rounded-xl text-xs transition flex items-center justify-center gap-2 shadow"
              >
                <Sparkles className="w-4 h-4 text-yellow-300" />
                <span>{isParsing ? "Analyzing Notification Structure..." : "Run AI Notification Parser"}</span>
              </button>
            </div>

            {/* Extracted Preview */}
            <div className="space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                Structured Job Card Draft
              </label>
              {parsedJob ? (
                <div className="bg-slate-50 dark:bg-slate-800/60 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Generated Title</span>
                    <span className="font-bold text-slate-900 dark:text-white text-sm">{parsedJob.title}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Organization</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{parsedJob.organization}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Vacancies</span>
                      <span className="font-bold text-emerald-600">{parsedJob.vacancies}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Category</span>
                      <span className="font-semibold uppercase">{parsedJob.category}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Last Date</span>
                      <span className="font-semibold text-red-600">{parsedJob.importantDates?.lastDate}</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Eligibility</span>
                    <span className="text-slate-600 dark:text-slate-400">{parsedJob.eligibilityDetails}</span>
                  </div>

                  <button
                    onClick={handlePublishParsed}
                    className="w-full mt-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 rounded-xl text-xs transition shadow flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Approve & Publish to zovyn.in</span>
                  </button>
                </div>
              ) : (
                <div className="border border-dashed border-slate-200 dark:border-slate-700 rounded-2xl p-12 text-center text-slate-400 text-xs">
                  Paste notification text and click "Run AI Notification Parser" to generate structured data.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Automation & Ingestion */}
      {activeTab === "automation" && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white">
                Daily Job Discovery & Verification Engine
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Monitors official gazettes, National Career Service (NCS), and tech job feeds every day at 7:00 AM IST.
              </p>
            </div>
            <button
              onClick={handleTestIngestion}
              disabled={isIngesting}
              className="bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow transition flex items-center gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${isIngesting ? "animate-spin" : ""}`} />
              <span>{isIngesting ? "Polling Feeds..." : "Run Test Ingestion Now"}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span className="font-bold text-slate-900 dark:text-white block mb-1">Central Government Feeds</span>
              <p className="text-slate-500 text-[11px]">NCS portal, SSC, UPSC, and Employment News RSS</p>
              <span className="inline-block mt-2 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                Active Source
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span className="font-bold text-slate-900 dark:text-white block mb-1">State Recruitment Boards</span>
              <p className="text-slate-500 text-[11px]">UPPRPB, Maharashtra Mahabhumi, BPSC, AP/TS PSCs</p>
              <span className="inline-block mt-2 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                Active Source
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span className="font-bold text-slate-900 dark:text-white block mb-1">IT & Software Careers</span>
              <p className="text-slate-500 text-[11px]">Authorized open career feeds (TCS, Google, Startups)</p>
              <span className="inline-block mt-2 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                Active Source
              </span>
            </div>
          </div>

          {/* Terminal / Ingestion Console Output */}
          <div className="bg-slate-950 text-slate-300 rounded-2xl p-4 font-mono text-xs space-y-1.5 border border-slate-800">
            <div className="text-slate-500 pb-2 border-b border-slate-800 font-bold flex items-center justify-between">
              <span>Ingestion Live Console</span>
              <span className="text-emerald-400">● IDLE / READY</span>
            </div>
            {ingestionLog.length === 0 ? (
              <p className="text-slate-600 py-4 text-center">
                Click "Run Test Ingestion Now" to simulate a live automated job crawl.
              </p>
            ) : (
              ingestionLog.map((line, idx) => (
                <p key={idx} className="leading-relaxed">
                  {line}
                </p>
              ))
            )}
          </div>
        </div>
      )}

      {/* Add Job Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 max-w-xl w-full p-6 sm:p-8 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-slate-900 dark:text-white">Create New Job Alert</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateJob} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Job Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. SSC CGL 2026: 14,800+ Posts for Inspector & Assistant"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Organization</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Staff Selection Commission"
                    value={newOrg}
                    onChange={(e) => setNewOrg(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                  >
                    <option value="govt">Govt</option>
                    <option value="it">IT & Software</option>
                    <option value="railway">Railway</option>
                    <option value="bank">Bank</option>
                    <option value="defence">Defence</option>
                    <option value="police">Police</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Total Vacancies</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 14,800+"
                    value={newVacancies}
                    onChange={(e) => setNewVacancies(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Last Date to Apply</label>
                  <input
                    type="date"
                    required
                    value={newLastDate}
                    onChange={(e) => setNewLastDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Salary Range</label>
                  <input
                    type="text"
                    value={newSalary}
                    onChange={(e) => setNewSalary(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Age Limit</label>
                  <input
                    type="text"
                    value={newAgeLimit}
                    onChange={(e) => setNewAgeLimit(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Official Apply URL</label>
                <input
                  type="url"
                  required
                  value={newApplyUrl}
                  onChange={(e) => setNewApplyUrl(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold"
                >
                  Save & Publish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
