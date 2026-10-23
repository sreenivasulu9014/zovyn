import sourcesData from "@/data/sources.json";

export interface RecruitmentSource {
  id: string;
  name: string;
  category: string;
  officialUrl: string;
  collectionMethod: string;
  trustedDomain: string;
  scanFrequency: string;
  status: "healthy" | "degraded" | "offline";
  trustScore: number;
  lastScanned: string;
}

export function getAllSources(): RecruitmentSource[] {
  return sourcesData as RecruitmentSource[];
}

export function getSourceById(id: string): RecruitmentSource | undefined {
  return (sourcesData as RecruitmentSource[]).find((s) => s.id === id);
}

export function getSourcesByCategory(category: string): RecruitmentSource[] {
  return (sourcesData as RecruitmentSource[]).filter(
    (s) => s.category.toLowerCase() === category.toLowerCase()
  );
}

/**
 * Validates whether a given URL belongs to an official government or verified enterprise recruitment domain.
 */
export function isValidOfficialDomain(urlString: string): boolean {
  try {
    const parsed = new URL(urlString);
    const hostname = parsed.hostname.toLowerCase();

    // Standard official Indian government domain extensions
    if (
      hostname.endsWith(".gov.in") ||
      hostname.endsWith(".nic.in") ||
      hostname.endsWith(".res.in") ||
      hostname.endsWith(".ac.in") ||
      hostname.endsWith(".edu.in")
    ) {
      return true;
    }

    // Check against trusted corporate/enterprise recruitment domains
    const trustedDomains = [
      "ibps.in",
      "sbi.co.in",
      "tcs.com",
      "google.com",
      "careers.google.com",
      "microsoft.com",
      "zeta.tech",
      "zovyn.in",
    ];

    return trustedDomains.some(
      (td) => hostname === td || hostname.endsWith(`.${td}`)
    );
  } catch {
    return false;
  }
}
