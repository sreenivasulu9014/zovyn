export type JobCategory = 
  | 'govt'
  | 'it'
  | 'bank'
  | 'railway'
  | 'defence'
  | 'police'
  | 'teaching'
  | 'freshers'
  | 'admit-card'
  | 'result';

export type Qualification = 
  | '10th'
  | '12th'
  | 'ITI'
  | 'Diploma'
  | 'Graduate'
  | 'B.Tech/B.E'
  | 'BCA/MCA'
  | 'Post Graduate'
  | 'Any Graduate';

export type JobStatus = 'published' | 'pending_review' | 'closed';

export interface VerificationEvidence {
  verified: boolean;
  verifiedAt: string;
  officialSourceUrl: string;
  sourceDomain: string;
  confidenceScore: number; // 0 to 100
  validationNotes?: string;
}

export interface Job {
  id: string;
  slug: string;
  title: string;
  organization: string;
  organizationLogo?: string;
  category: JobCategory;
  subcategory?: string;
  location: string;
  state: string; // e.g. "All India", "Maharashtra", "Uttar Pradesh", "Delhi", etc.
  vacancies: number | string;
  qualification: Qualification[];
  experience: 'Fresher' | '0-2 Years' | '2-5 Years' | '5+ Years' | 'Experienced';
  salary: string;
  ageLimit: string;
  status: JobStatus;
  verification?: VerificationEvidence;
  applicationFee: {
    general?: string;
    sc_st_pwd?: string;
    female?: string;
    details?: string;
  };
  importantDates: {
    notificationDate: string;
    applyStartDate: string;
    lastDate: string;
    examDate?: string;
    admitCardDate?: string;
  };
  selectionProcess: string[];
  howToApply: string[];
  eligibilityDetails: string;
  applyUrl: string;
  notificationPdfUrl?: string;
  teluguTitle?: string;
  officialWebsiteUrl?: string;
  tags: string[];
  isFeatured?: boolean;
  isHot?: boolean;
  postedAt: string;
  source?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  teluguTitle?: string;
  imageUrl?: string;
  language?: 'english' | 'telugu' | 'bilingual';
  state?: string;
  excerpt: string;
  teluguExcerpt?: string;
  content: string;
  author: string;
  publishedAt: string;
  category: string;
  tags: string[];
  readTime: string;
  relatedJobSlugs?: string[];
  applyUrl?: string;
  notificationPdfUrl?: string;
}

export interface UserProfile {
  qualification: Qualification;
  age: number;
  state: string;
  targetSector: 'all' | 'govt' | 'it';
  techSkills?: string[];
  experience: string;
}

export interface MatchResult {
  job: Job;
  matchScore: number;
  matchedCriteria: string[];
  unmatchedCriteria: string[];
  recommendationTip: string;
}
