import { MetadataRoute } from "next";
import { getAllJobs, getAllBlogs } from "@/lib/jobs";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://zovyn.in";
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: "daily", priority: 1.0 },
    { url: `${baseUrl}/jobs`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/ai-match`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/admit-card`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: `${baseUrl}/results`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: `${baseUrl}/answer-keys`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: `${baseUrl}/closing-soon`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/editorial-policy`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/disclaimer`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/privacy`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
  ];

  // Category Pages
  const categories = ["govt", "it", "railway", "bank", "defence", "police", "teaching", "freshers"];
  const categoryRoutes: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${baseUrl}/category/${cat}`,
    lastModified: now,
    changeFrequency: "daily",
    priority: 0.85,
  }));

  // State Pages
  const states = [
    "andhra-pradesh",
    "telangana",
    "uttar-pradesh",
    "maharashtra",
    "bihar",
    "rajasthan",
    "karnataka",
    "tamil-nadu",
    "kerala",
    "gujarat",
    "west-bengal",
    "odisha",
    "madhya-pradesh",
    "punjab",
    "haryana",
    "assam",
    "jharkhand",
    "chhattisgarh",
    "uttarakhand",
    "himachal-pradesh",
    "delhi",
    "jammu-and-kashmir",
    "all-india",
  ];
  const stateRoutes: MetadataRoute.Sitemap = states.map((st) => ({
    url: `${baseUrl}/state/${st}`,
    lastModified: now,
    changeFrequency: "daily",
    priority: 0.8,
  }));

  // Qualification Pages
  const qualifications = ["10th", "12th", "graduate", "b-tech", "diploma"];
  const qualRoutes: MetadataRoute.Sitemap = qualifications.map((q) => ({
    url: `${baseUrl}/qualification/${q}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // Dynamic Jobs
  const jobs = getAllJobs(true);
  const jobRoutes: MetadataRoute.Sitemap = jobs.map((job) => ({
    url: `${baseUrl}/jobs/${job.slug}`,
    lastModified: new Date(job.postedAt),
    changeFrequency: job.status === "closed" ? "monthly" : "daily",
    priority: job.status === "closed" ? 0.4 : 0.9,
  }));

  // Blog Posts
  const blogs = getAllBlogs();
  const blogRoutes: MetadataRoute.Sitemap = blogs.map((b) => ({
    url: `${baseUrl}/blog/${b.slug}`,
    lastModified: new Date(b.publishedAt),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...categoryRoutes,
    ...stateRoutes,
    ...qualRoutes,
    ...jobRoutes,
    ...blogRoutes,
  ];
}
