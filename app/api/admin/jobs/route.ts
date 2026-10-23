import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { Job } from "@/types/job";

const dataFilePath = path.join(process.cwd(), "data", "jobs.json");

function readJobs(): Job[] {
  try {
    const raw = fs.readFileSync(dataFilePath, "utf8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function writeJobs(jobs: Job[]) {
  fs.writeFileSync(dataFilePath, JSON.stringify(jobs, null, 2), "utf8");
}

export async function GET(request: Request) {
  const jobs = readJobs();
  return NextResponse.json({ success: true, count: jobs.length, jobs });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password, job } = body;

    const expectedPassword = process.env.ADMIN_PASSWORD || "zovyn@admin2026";
    if (password !== expectedPassword) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    if (!job || !job.title || !job.organization) {
      return NextResponse.json({ error: "Missing required job fields" }, { status: 400 });
    }

    const jobs = readJobs();

    // Generate slug and id if not provided
    const id = job.id || `job-${Date.now()}`;
    const slug = job.slug || job.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    const newJob: Job = {
      ...job,
      id,
      slug,
      postedAt: job.postedAt || new Date().toISOString(),
      importantDates: job.importantDates || {
        notificationDate: new Date().toISOString().split("T")[0],
        applyStartDate: new Date().toISOString().split("T")[0],
        lastDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      },
      qualification: job.qualification || ["Graduate"],
      selectionProcess: job.selectionProcess || ["Written Examination", "Document Verification"],
      howToApply: job.howToApply || ["Visit the official portal", "Submit application online"],
      applicationFee: job.applicationFee || { general: "Nil" },
    };

    // Prepend new job to top of list
    const updatedJobs = [newJob, ...jobs.filter((j) => j.id !== id)];
    writeJobs(updatedJobs);

    return NextResponse.json({ success: true, message: "Job created successfully", job: newJob });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to save job" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const password = request.headers.get("x-admin-password");

    const expectedPassword = process.env.ADMIN_PASSWORD || "zovyn@admin2026";
    if (password !== expectedPassword) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!id) {
      return NextResponse.json({ error: "Job ID required" }, { status: 400 });
    }

    const jobs = readJobs();
    const updated = jobs.filter((j) => j.id !== id);
    writeJobs(updated);

    return NextResponse.json({ success: true, message: "Job deleted successfully" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to delete" }, { status: 500 });
  }
}
