import jobsData from "@/data/jobs.json";
import blogsData from "@/data/blogs.json";
import { Job, BlogPost, UserProfile, MatchResult } from "@/types/job";
import { isJobExpired } from "@/lib/utils";

export function getAllJobs(includeClosed = false): Job[] {
  const jobs = jobsData as Job[];
  if (includeClosed) return jobs;
  return jobs.filter((j) => j.status === "published" && !isJobExpired(j.importantDates.lastDate));
}

export function getAllRawJobs(): Job[] {
  return jobsData as Job[];
}

export function getJobBySlug(slug: string): Job | undefined {
  return (jobsData as Job[]).find((job) => job.slug === slug || job.id === slug);
}

export function getJobsByCategory(category: string, includeClosed = false): Job[] {
  const jobs = getAllJobs(includeClosed);
  if (category === "all") return jobs;
  return jobs.filter(
    (job) => job.category.toLowerCase() === category.toLowerCase()
  );
}

export function getJobsByState(state: string, includeClosed = false): Job[] {
  const normalized = state.toLowerCase().replace(/-/g, " ");
  const jobs = getAllJobs(includeClosed);
  return jobs.filter(
    (job) =>
      job.state.toLowerCase() === normalized ||
      job.state.toLowerCase() === "all india" ||
      job.location.toLowerCase().includes(normalized)
  );
}

export function getJobsByQualification(qualification: string, includeClosed = false): Job[] {
  const normalized = qualification.toLowerCase();
  const jobs = getAllJobs(includeClosed);
  return jobs.filter((job) =>
    job.qualification.some((q) => q.toLowerCase().includes(normalized))
  );
}

export function getFeaturedJobs(): Job[] {
  return getAllJobs().filter((job) => job.isFeatured || job.isHot);
}

export function getAllBlogs(): BlogPost[] {
  return blogsData as BlogPost[];
}

export function getBlogBySlug(slug: string): BlogPost | undefined {
  return (blogsData as BlogPost[]).find((b) => b.slug === slug);
}

export function matchJobsWithProfile(profile: UserProfile): MatchResult[] {
  const activeJobs = getAllJobs();

  const results: MatchResult[] = activeJobs.map((job) => {
    let score = 50; // base score for active opening
    const matchedCriteria: string[] = [];
    const unmatchedCriteria: string[] = [];

    // Qualification check
    const matchesQual = job.qualification.some((q) => {
      if (q === profile.qualification || q === "Any Graduate") return true;
      if (profile.qualification === "B.Tech/B.E" && q === "Graduate") return true;
      if (profile.qualification === "Post Graduate" && q === "Graduate") return true;
      return false;
    });

    if (matchesQual) {
      score += 25;
      matchedCriteria.push(`Eligible for required qualification (${job.qualification.join(", ")})`);
    } else {
      score -= 20;
      unmatchedCriteria.push(`Requires ${job.qualification.join(" / ")}`);
    }

    // Sector match
    if (profile.targetSector === "all") {
      score += 10;
      matchedCriteria.push("Matches preferred career domain");
    } else if (profile.targetSector === "govt" && job.category !== "it") {
      score += 15;
      matchedCriteria.push("Government / Public Sector role matching your target");
    } else if (profile.targetSector === "it" && job.category === "it") {
      score += 15;
      matchedCriteria.push("IT & Tech opening matching your profile");
    } else {
      score -= 15;
      unmatchedCriteria.push(`Sector differs from preferred (${profile.targetSector.toUpperCase()})`);
    }

    // State / Location check
    if (
      job.state.toLowerCase() === "all india" ||
      job.state.toLowerCase() === profile.state.toLowerCase() ||
      job.location.toLowerCase().includes(profile.state.toLowerCase())
    ) {
      score += 10;
      matchedCriteria.push(`Open to candidates from ${profile.state}`);
    }

    // Clamp score between 15% and 99%
    const finalScore = Math.min(Math.max(score, 15), 98);

    let tip = "Apply promptly before the upcoming deadline.";
    if (finalScore >= 80) {
      tip = "🔥 High match! Your qualifications strongly align with this notification.";
    } else if (finalScore >= 60) {
      tip = "Good opportunity. Review the syllabus or tech stack requirements.";
    } else {
      tip = "Check relaxation criteria and alternative post options.";
    }

    return {
      job,
      matchScore: finalScore,
      matchedCriteria,
      unmatchedCriteria,
      recommendationTip: tip,
    };
  });

  return results.sort((a, b) => b.matchScore - a.matchScore);
}
