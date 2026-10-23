import React from "react";
import { Job } from "@/types/job";

interface JobSchemaProps {
  job: Job;
  url: string;
}

export function JobSchema({ job, url }: JobSchemaProps) {
  const schemaData = {
    "@context": "https://schema.org/",
    "@type": "JobPosting",
    "title": job.title,
    "description": `
      <h3>${job.title}</h3>
      <p><strong>Organization:</strong> ${job.organization}</p>
      <p><strong>Total Vacancies:</strong> ${job.vacancies}</p>
      <p><strong>Eligibility / Qualification:</strong> ${job.qualification.join(", ")} - ${job.eligibilityDetails}</p>
      <p><strong>Salary / Pay Scale:</strong> ${job.salary}</p>
      <p><strong>Age Limit:</strong> ${job.ageLimit}</p>
      <p><strong>Last Date to Apply:</strong> ${job.importantDates.lastDate}</p>
      <h4>Selection Process</h4>
      <ul>
        ${job.selectionProcess.map((step) => `<li>${step}</li>`).join("")}
      </ul>
      <h4>How to Apply</h4>
      <ol>
        ${job.howToApply.map((step) => `<li>${step}</li>`).join("")}
      </ol>
    `.trim(),
    "identifier": {
      "@type": "PropertyValue",
      "name": job.organization,
      "value": job.id,
    },
    "datePosted": job.postedAt,
    "validThrough": `${job.importantDates.lastDate}T23:59:59Z`,
    "employmentType": "FULL_TIME",
    "hiringOrganization": {
      "@type": "Organization",
      "name": job.organization,
      "sameAs": job.officialWebsiteUrl || "https://zovyn.in",
      "logo": job.organizationLogo,
    },
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": job.location,
        "addressRegion": job.state,
        "addressCountry": "IN",
      },
    },
    "url": url,
    "directApply": true,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}
