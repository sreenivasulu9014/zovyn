# zovyn.in — India's Smartest Job Alert Portal (AI-Matched to Your Profile)

> Real-time, verified Central & State Government jobs (UPSC, SSC, Railways, Banking, Defence, Police) and IT/Software off-campus drives across all Indian states.

---

## 🌟 Key Features

1. **AI Job Profile Matcher (`/ai-match`)**:
   - Interactive candidate profiling tool: selects education (10th, 12th, B.Tech, Graduate), age, and domicile.
   - Calculates accurate compatibility match percentage with personalized examination advice.

2. **Official Source Verification Protocol**:
   - Multi-tier verification against official domains (`.gov.in`, `.nic.in`, verified company career portals).
   - Real-time duplicate detection via application URL and advertisement number indexing.
   - Closed job management: expired vacancies are cleanly tagged as `Closed` with application warnings to comply with Google Search standards.

3. **SEO & Structured Data Engine**:
   - Google `schema.org/JobPosting` structured JSON-LD data for rich search result snippets.
   - Google `Article` schema for syllabus, exam strategy, and prep guides.
   - Dynamic XML sitemap (`/sitemap.xml`) and crawler directives (`/robots.txt`).
   - SEO landing pages for categories (`/category/[slug]`), states (`/state/[state]`), and qualifications (`/qualification/[slug]`).

4. **Interactive Admin Console (`/admin`)**:
   - Secure authentication via `ADMIN_PASSWORD` (default: `zovyn@admin2026`).
   - Real-time vacancy statistics (Active, Closed, Ingested).
   - **AI Notification Parser**: Paste raw circular or advertisement text to auto-generate structured job listings with one-click publishing.
   - Live ingestion console and subscriber management.

5. **Automated Daily Ingestion & Deploy**:
   - GitHub Actions workflow (`.github/workflows/daily-job-fetch.yml`) runs every morning at **7:00 AM IST (01:30 UTC)**.
   - Scans official feeds, expires old deadlines, commits changes, and triggers zero-downtime auto-deploy on Vercel.

---

## 🚀 Quick Start & Local Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Test Ingestion Script Locally
```bash
node scripts/fetch-jobs.mjs
```

---

## 📦 How to Connect GitHub & Deploy to Vercel

### Step 1: Push to Your GitHub Repository
Run the following commands in this directory:
```bash
# Initialize git if not already done
git init
git add .
git commit -m "feat: complete zovyn.in AI job alert platform"

# Link to your GitHub repository (replace with your repo URL):
git remote add origin https://github.com/<YOUR-USERNAME>/<YOUR-REPO-NAME>.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy on Vercel
1. Go to [Vercel Dashboard](https://vercel.com/new).
2. Click **Import** next to your GitHub repository.
3. In **Environment Variables**, add:
   - `ADMIN_PASSWORD`: Your secret admin PIN (e.g. `zovyn@admin2026`)
   - `NEXT_PUBLIC_SITE_URL`: `https://zovyn.in`
4. Click **Deploy**. Vercel will build and launch your production portal within 60 seconds!
5. In your Vercel Project Settings > Domains, add `zovyn.in` and update your DNS records (A / CNAME).

---

## 🔒 Security & Verification Notice
zovyn.in prioritizes candidate trust. All recruitment notices link directly to official authority portals. No intermediary redirects or misleading links are permitted.
