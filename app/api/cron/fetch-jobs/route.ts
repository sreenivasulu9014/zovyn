import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { Job } from "@/types/job";

export async function GET(request: Request) {
  // Authorization header verification for Vercel Cron
  const authHeader = request.headers.get("authorization");
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const jobsFilePath = path.join(process.cwd(), "data", "jobs.json");
    const raw = fs.readFileSync(jobsFilePath, "utf8");
    const jobs: Job[] = JSON.parse(raw);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let expiredCount = 0;
    const audited = jobs.map((job) => {
      const deadline = new Date(job.importantDates.lastDate);
      if (deadline < today && job.status !== "closed") {
        expiredCount++;
        return { ...job, status: "closed" as const };
      }
      return job;
    });

    if (expiredCount > 0) {
      fs.writeFileSync(jobsFilePath, JSON.stringify(audited, null, 2), "utf8");
    }

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      expiredJobsClosed: expiredCount,
      totalTracked: jobs.length,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
