# KAFU DRIO Newsletter — Issue 1, May 2026

**Kaimosi Friends University**  
Directorate of Research, Innovation & Outreach  
Official Newsletter · Issue No. 1 · May 2026

---

## 📁 Project Structure

```
kafu-drio-newsletter/
├── public/
│   ├── index.html          ← Main newsletter page
│   ├── images/             ← All optimised images (39 files)
│   │   ├── logo.png
│   │   ├── logo2.png
│   │   ├── hero.jpg
│   │   ├── portrait-amimo.jpg
│   │   ├── portrait-shikuku.jpg
│   │   └── ... (all other images)
│   └── assets/
│       ├── styles.css      ← Full responsive stylesheet
│       └── app.js          ← Scroll reveal, nav, lightbox, animations
├── vercel.json             ← Vercel deployment config
├── package.json
└── README.md
```

---

## 🚀 Deploying to Vercel via GitHub

### Step 1 — Create a GitHub repository

1. Go to [github.com](https://github.com) and click **New repository**
2. Name it: `kafu-drio-newsletter`
3. Set to **Public** (or Private — both work with Vercel)
4. Do **not** initialise with README (you already have one)
5. Click **Create repository**

### Step 2 — Push project files to GitHub

Open your terminal and run:

```bash
# Navigate to the project folder
cd kafu-drio-newsletter

# Initialise git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: KAFU DRIO Newsletter Issue 1 May 2026"

# Add your GitHub remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/kafu-drio-newsletter.git

# Push
git branch -M main
git push -u origin main
```

### Step 3 — Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in (use your GitHub account)
2. Click **Add New → Project**
3. Select your `kafu-drio-newsletter` repository
4. Vercel will auto-detect the settings from `vercel.json`
5. Click **Deploy**

Your newsletter will be live at:  
`https://kafu-drio-newsletter.vercel.app`

---

## 🔄 Updating the Newsletter

After any changes to files:

```bash
git add .
git commit -m "Update newsletter content"
git push
```

Vercel automatically redeploys within ~30 seconds.

---

## 🌐 Custom Domain (Optional)

In your Vercel project dashboard:
1. Go to **Settings → Domains**
2. Add your domain e.g. `newsletter.kafu.ac.ke`
3. Follow the DNS instructions shown

---

## 📋 Newsletter Sections

| # | Section | Key Images |
|---|---------|-----------|
| Cover | Full-bleed cinematic hero | hero.jpg |
| 01 | Leadership Messages | portrait-amimo.jpg, portrait-shikuku.jpg |
| 02 | DRIO Mandate & Goals | mandate-event.jpg, goals-event.jpg |
| 03 | Key Activities 2025 | grants-event.jpg |
| 04 | Research Performance | chart-bar.png, chart2.png |
| 05 | Grants & Fellowships | chart-pie.png, portrait-okenwa.jpg, award-cert.jpg, grant-doc.jpg |
| 06 | Awards & Conferences | conference-event.jpg, portrait-bonface/lucy/linda.jpg, award-ceremony1/2.jpg, conference1-4.jpg |
| 07 | Science Fair | award-ceremony photos |
| 08 | Innovation & IP | grant-doc.jpg, examflow-event.jpg |
| 09 | Themes & Partnerships | themes-wide.jpg, citizen-science1/2.jpg |
| 10 | Students Corner | students-banner.jpg, project photos |
| 11 | Outlook 2026-27 | appreciation-wide.jpg |

---

## ⚙️ Local Development

```bash
# Install serve (one-time)
npm install -g serve

# Run locally
npm run dev
# Opens at http://localhost:3000
```

---

© 2026 Kaimosi Friends University — DRIO. All rights reserved.
