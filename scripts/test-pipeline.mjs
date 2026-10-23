#!/usr/bin/env node

/**
 * zovyn.in Automated Pipeline Test Suite
 * Tests parsing, domain verification, duplicate detection hashing, and expiration rules.
 */

import assert from "assert";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { computeJobHash, isTrustedRecruitmentDomain } from "./fetch-jobs.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("-----------------------------------------------------------------");
console.log("🧪 RUNNING ZOVYN.IN AUTOMATED PIPELINE UNIT TESTS");
console.log("-----------------------------------------------------------------");

let passed = 0;
let total = 0;

function runTest(name, fn) {
  total++;
  try {
    fn();
    console.log(`  ✓ [PASS] ${name}`);
    passed++;
  } catch (err) {
    console.error(`  ✗ [FAIL] ${name}`);
    console.error(`    ${err.message}`);
  }
}

// Test 1: JSON Integrity
runTest("JSON Database Integrity Check", () => {
  const jobs = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../data/jobs.json"), "utf8"));
  const blogs = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../data/blogs.json"), "utf8"));
  const sources = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../data/sources.json"), "utf8"));
  assert(Array.isArray(jobs), "data/jobs.json must be an array");
  assert(Array.isArray(blogs), "data/blogs.json must be an array");
  assert(Array.isArray(sources), "data/sources.json must be an array");
  assert(jobs.length >= 10, "Should contain at least 10 job postings");
  assert(sources.length >= 10, "Should contain at least 10 official sources");
});

// Test 2: Domain Verification
runTest("Official Domain Verification Filter", () => {
  assert.strictEqual(isTrustedRecruitmentDomain("https://ssc.gov.in/notice"), true);
  assert.strictEqual(isTrustedRecruitmentDomain("https://upsconline.nic.in/apply"), true);
  assert.strictEqual(isTrustedRecruitmentDomain("https://psc.ap.gov.in/registration"), true);
  assert.strictEqual(isTrustedRecruitmentDomain("https://www.tspsc.gov.in/group1"), true);
  assert.strictEqual(isTrustedRecruitmentDomain("https://careers.google.com/jobs"), true);
  assert.strictEqual(isTrustedRecruitmentDomain("https://nextstep.tcs.com/campus"), true);
  assert.strictEqual(isTrustedRecruitmentDomain("https://random-fake-job-scam.xyz"), false);
  assert.strictEqual(isTrustedRecruitmentDomain("https://unknown-spammer.info/ssc"), false);
});

// Test 3: Idempotent Hash Generator
runTest("SHA-256 Idempotency Hash Determinism", () => {
  const sample1 = {
    organization: "Staff Selection Commission",
    title: "SSC CGL 2026 Examination",
    importantDates: { lastDate: "2026-11-25" },
  };
  const sample2 = {
    organization: "staff selection commission",
    title: "SSC CGL 2026 examination",
    importantDates: { lastDate: "2026-11-25" },
  };
  const hash1 = computeJobHash(sample1);
  const hash2 = computeJobHash(sample2);
  assert.strictEqual(hash1, hash2, "Identical jobs with case differences must produce the same hash");
});

// Test 4: Job Model Validation
runTest("Mandatory Job Posting Fields Check", () => {
  const jobs = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../data/jobs.json"), "utf8"));
  for (const j of jobs) {
    assert(j.id, `Job missing id: ${JSON.stringify(j)}`);
    assert(j.slug, `Job missing slug: ${j.id}`);
    assert(j.title, `Job missing title: ${j.id}`);
    assert(j.organization, `Job missing organization: ${j.id}`);
    assert(j.importantDates?.lastDate, `Job missing lastDate: ${j.id}`);
    assert(j.applyUrl, `Job missing applyUrl: ${j.id}`);
    assert(["published", "pending_review", "closed"].includes(j.status), `Invalid status: ${j.status}`);
  }
});

// Test 5: Closed Job Expiry Detection
runTest("Expired Jobs Correctly Identified", () => {
  const jobs = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../data/jobs.json"), "utf8"));
  const closedJob = jobs.find((j) => j.id === "sbi-clerk-2026-closed-demo");
  assert(closedJob, "sbi-clerk-2026-closed-demo must be present");
  assert.strictEqual(closedJob.status, "closed", "SBI Clerk demo must be closed");
});

console.log("-----------------------------------------------------------------");
console.log(`Results: ${passed}/${total} Tests Passed`);
console.log("-----------------------------------------------------------------\n");

if (passed === total) {
  process.exit(0);
} else {
  process.exit(1);
}
