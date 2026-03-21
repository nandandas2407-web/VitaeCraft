<div align="center">
  <br/>
  <img width="72" src="https://img.shields.io/badge/%F0%9F%93%84-VitaeCraft-b8f03a?style=for-the-badge&labelColor=04040c&color=b8f03a" alt="logo"/>
  <br/><br/>

  <h1>VitaeCraft</h1>

  <p><strong>The resume builder that gets you hired.</strong><br/>
  ATS-optimized · Real-time preview · AI-powered · Zero backend · Runs in your browser.</p>

  <br/>

  <a href="https://github.com/nandandas2407-web/VitaeCraft/stargazers">
    <img src="https://img.shields.io/github/stars/nandandas2407-web/VitaeCraft?style=flat-square&color=b8f03a&labelColor=04040c" alt="Stars"/>
  </a>
  <a href="https://github.com/nandandas2407-web/VitaeCraft/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-b8f03a?style=flat-square&labelColor=04040c" alt="License"/>
  </a>
  <img src="https://img.shields.io/badge/dependencies-zero-b8f03a?style=flat-square&labelColor=04040c" alt="Zero Dependencies"/>
  <img src="https://img.shields.io/badge/built%20with-HTML%20%B7%20CSS%20%B7%20JS-b8f03a?style=flat-square&labelColor=04040c" alt="Stack"/>
  <a href="https://github.com/nandandas2407-web">
    <img src="https://img.shields.io/badge/author-Nandan%20Das-b8f03a?style=flat-square&labelColor=04040c" alt="Author"/>
  </a>

  <br/><br/>

  <a href="#-quick-start"><b>Quick Start</b></a> ·
  <a href="#-features"><b>Features</b></a> ·
  <a href="#-screenshots"><b>Screenshots</b></a> ·
  <a href="#-project-structure"><b>Structure</b></a> ·
  <a href="#-deploy"><b>Deploy</b></a> ·
  <a href="#-contributing"><b>Contributing</b></a>

  <br/><br/>

  <img src="https://img.shields.io/badge/▶%20Open%20index.html%20and%20start%20building-no%20install%20needed-04040c?style=for-the-badge&color=0e0e1c&labelColor=0e0e1c" alt=""/>

  <br/><br/>

</div>

---

## What is VitaeCraft?

VitaeCraft is a **fully browser-based resume builder** — no server, no account, no cloud. You open a single HTML file and walk away with a job-ready PDF.

It combines a clean form-driven editor with a live resume preview, a real-time ATS score analyzer, AI-assisted bullet writing, and a job description keyword matcher — all in ~1,000 lines of vanilla JavaScript.

```
Your data stays in your browser. Always. No upload, no tracking, no cost.
```

<br/>

## ✨ Features

<table>
<tr>
<td width="50%">

### 🎯 ATS Score Analyzer
Real-time scoring across **9 categories**. Know exactly how a recruiter bot reads your resume before you submit. Each category shows a progress bar, your current score, and a fix suggestion.

| Category | Max |
|:--|--:|
| Contact Info | 15 |
| Summary / Profile | 15 |
| Skills Section | 15 |
| Work Experience | 20 |
| Quantified Metrics | 10 |
| Education | 10 |
| Certifications | 5 |
| Achievements | 5 |
| Format Safety | 5 |
| **Total** | **100** |

</td>
<td width="50%">

### 🎨 6 Professional Templates

All templates are fully **ATS-safe** — no tables, no text boxes, no multi-column tricks that confuse parsers.

| Template | Best For |
|:--|:--|
| **Modern** | Tech & startups |
| **Classic** | Finance & law |
| **Executive** | Senior leadership |
| **Minimal** | Design & creative |
| **Compact** | One-page fits |
| **Creative** | Portfolio roles |

Switch templates instantly. Your data persists across all layouts.

</td>
</tr>
<tr>
<td>

### ✨ AI Bullet Improver
Turn weak job descriptions into **3 strong, metric-driven alternatives** using AI. Paste your current bullet, click improve, pick the best version.

**Before:**
> Worked on frontend features

**After (AI-generated):**
> Built 12 responsive React components, reducing page load time by 35% through lazy loading and code splitting

</td>
<td>

### 🔍 JD Keyword Matcher
Paste a job description. Instantly see which **keywords are missing** from your resume — the exact terms ATS systems scan for.

Stop guessing why you're not getting interviews. Match your resume to the role, word-for-word.

</td>
</tr>
<tr>
<td>

### 💾 Auto-save + Snapshots
- Saves to `localStorage` on every keystroke
- Create **named snapshots** at any version
- Restore any snapshot with one click
- Zero data loss, even if you close the tab

</td>
<td>

### 📤 One-click PDF Export
Uses the browser's native print engine for a **pixel-perfect PDF** — no third-party service, no watermark, no sign-up required. Prints exactly what you see in the preview.

</td>
</tr>
</table>

<br/>

### 🧩 Demo Profiles Built-in

Load any of 7 pre-built demo resumes to explore the editor instantly. Covers multiple industries and career levels:

```
fresher_developer      →  Frontend Developer (India, entry-level)
intermediate_developer →  Senior Full Stack Engineer (US, 5 yrs)
senior_developer       →  Staff Software Engineer (10+ yrs, Stripe)
fresher_teacher        →  English Language Teacher (India, B.Ed)
intermediate_teacher   →  Senior English Teacher & HOD
fresher_designer       →  UI/UX Designer (LA, internship background)
```

<br/>

### ⚡ Everything Else

- **Real-time live preview** — the resume re-renders as you type, zero lag
- **Mobile-first responsive** — full editor on phones, slide-up preview panel
- **ATS mode toggle** — force-switches to fonts and layouts that maximize parser compatibility
- **Level selector** — switch demo data between Fresher / Mid / Senior with one click
- **Toast notifications** — non-blocking feedback on every action
- **Scroll animations** — `IntersectionObserver`-driven fade-ins on the landing page
- **Zero dependencies** — no npm, no bundler, no `node_modules`, no build step
- **`file://` compatible** — works without a local server, including Android/Termux

<br/>

---

## 📸 Screenshots

<br/>

### Landing Page

```
╔══════════════════════════════════════════════════════════════════╗
║  ▣ VitaeCraft       Features   Templates   How it works   Start→.           ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                              ║
║  ⬤  ATS-Optimized · Free · No sign-up required                               ║
║                                                                              ║
║  Your resume.                  ╔══════════════════════╗                  ║
║  ─────────────────          ║ ⬤ ⬤ ⬤   VitaeCraft      ║                  ║
║  Crafted to land               ╠══════╦═══════════════╣                  ║
║  interviews.                   ║ Info  ║ ▓▓▓▓▓░░░░      ║                  ║
║                                ║       ║ ▓▓▓░░           ║                  ║
║  Build a professional resume   ║ Exp   ╠───────────────╣                   ║
║  in minutes. Real-time         ║       ║ ATS Score        ║                  ║
║  preview, smart suggestions,   ║ Skil  ║  87 / 100        ║                  ║
║  beautiful templates.          ║       ║  ████████▒░░   ║                  ║
║                                ╚══════╩═══════════════╝                  ║
║  [ Start Building Free → ]                                                   ║
║  [ See how it works ]      ✓ ATS Passed  📄 PDF Ready            ║
║                                                                  ║
║   6+ Templates   ╎   ATS Checker   ╎   PDF Export                ║
╚══════════════════════════════════════════════════════════════════╝
```

<br/>

### Resume Editor

```
╔══════════════════════════════════════════════════════════════════╗
║  ▣ VitaeCraft   [Modern] [Classic] [Executive]  [🎯 ATS] [↓ PDF] ║
╠═══════════════════════════╦══════════════════════════════════════╣
║  ▸ PERSONAL INFO          ║                                      ║
║    Name  ┌──────────────┐ ║   Jordan Kim                         ║
║          │ Jordan Kim   │ ║   Senior Full Stack Developer        ║
║    Title ┌──────────────┐ ║   jordan@devstack.io · Austin, TX    ║
║          │ Senior Dev   │ ║   ────────────────────────────────   ║
║                           ║                                      ║
║  ▸ EXPERIENCE   [+ Add]   ║   EXPERIENCE                        ║
║  ┌─────────────────────┐  ║   Acme SaaS Corp                    ║
║  │ Acme SaaS Corp      │  ║   Senior Full Stack Developer        ║
║  │ Mar 2022 – Present  │  ║   Mar 2022 – Present · Remote        ║
║  └─────────────────────┘  ║   • Led development of 3 features    ║
║                           ║     used by 15,000+ monthly users    ║
║  ▸ SKILLS                 ║   • Improved API response by 60%     ║
║  [TypeScript] [React]     ║                                      ║
║  [Node.js]  [PostgreSQL]  ║   SKILLS                            ║
║  [Docker]   [+ Add]       ║   TypeScript · React · Node.js       ║
╚═══════════════════════════╩══════════════════════════════════════╝
```

<br/>

### ATS Score Panel

```
╔══════════════════════════════════════════╗
║  🎯  ATS Score Analysis                  ║
║                                          ║
║  Overall Score              87 / 100     ║
║  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒░░░   87%         ║
║                                          ║
║  Contact Info      ▓▓▓▓▓▓▓▓▓▓▓▓  15/15  ║
║  Summary           ▓▓▓▓▓▓▓▓▓▓▒░  13/15  ║
║  Skills            ▓▓▓▓▓▓▓▓▓▓▓▓  15/15  ║
║  Work Experience   ▓▓▓▓▓▓▓▓▓▓▓▓  20/20  ║
║  Metrics           ▓▓▓▓▓▓▓▓▓▓▓▓  10/10  ║
║  Education         ▓▓▓▓▓▓▓▓▓▒░░  10/10  ║
║  Certifications    ▓▓▓▓▓░░░░░░░   5/5   ║
║  Format Safety     ▓▓▓▓▓░░░░░░░   5/5   ║
║                                          ║
║  ✅  Great score — passes most ATS bots  ║
╚══════════════════════════════════════════╝
```

<br/>

---

## 🚀 Quick Start

**No install. No terminal. No dependencies.**

```bash
# Clone
git clone https://github.com/nandandas2407-web/VitaeCraft.git
cd VitaeCraft

# Open (pick your OS)
open index.html          # macOS
xdg-open index.html      # Linux
start index.html         # Windows
```

Or just **drag `index.html` into your browser tab.**

> Works on Chrome · Firefox · Safari · Edge · Android Chrome · iOS Safari  
> Works on `file://` — no local server needed

<br/>

---

## 📁 Project Structure

```
VitaeCraft/
├── index.html              ← Landing page (marketing + nav)
├── app.html                ← The full resume editor
│
├── css/
│   ├── landing.css         ← Landing page styles, animations, responsive
│   └── app.css             ← Editor layout, panels, template preview, print
│
└── js/
    ├── state.js            ← Single global S{} object — all resume data lives here
    ├── data.js             ← 7 pre-built demo resume profiles
    ├── render.js           ← Converts S{} → resume HTML (handles all 6 templates)
    ├── form.js             ← Input binding, add/remove sections, live sync to state
    ├── panels.js           ← ATS analyzer, JD matcher, snapshot manager, AI improver
    ├── app.js              ← Bootstrap, toast system, mobile panel toggle
    └── landing.js          ← Scroll effects, nav transitions, IntersectionObserver
```

<br/>

### How It Works (Architecture)

```
User types in form
       │
       ▼
  form.js mutates S{}  ──────────────────────────────────┐
       │                                                  │
       ▼                                                  ▼
  render.js reads S{}                           state auto-saved
  → builds resume HTML string                  to localStorage
  → injects into #preview pane
       │
       ▼
  Live preview updates instantly
```

- **No framework.** Pure ES6. The only "state management" is a plain object called `S`.
- **No virtual DOM.** `render.js` produces an HTML string and does `innerHTML =` — fast enough for real-time.
- **Persistence:** `localStorage` key `vitaecraft_v1_state` for live data, `vitaecraft_v1_snaps` for named snapshots.
- **PDF:** Uses `window.print()` with a dedicated print stylesheet — no canvas, no canvas-to-image hacks.

<br/>

---

## 🌐 Deploy

VitaeCraft is a static project. It deploys anywhere in seconds.

### GitHub Pages (Recommended)

1. Fork this repository
2. Go to **Settings → Pages**
3. Set source to **Deploy from branch → `main` → `/ (root)`**
4. Your site is live at `https://<username>.github.io/VitaeCraft/`

### Netlify (Drag & Drop)

1. Download this repo as a `.zip`
2. Go to [netlify.com/drop](https://app.netlify.com/drop)
3. Drag the unzipped folder — deployed instantly

### Vercel

```bash
npx vercel --yes
# Done. No config file needed.
```

### Self-host

Copy all files to any web server or CDN. No server-side processing. No build step. Works as-is.

<br/>

---

## 🔧 Customization

### Add a New Resume Template

**1. Write the renderer** in `js/render.js`:

```js
// Inside the template switch statement
case 'mytemplate':
  return `
    <div class="resume resume-mytemplate">
      <header class="rt-header">
        <h1>${esc(S.name)}</h1>
        <p class="rt-title">${esc(S.title)}</p>
      </header>
      <main class="rt-body">
        ${S.exps.map(id => renderExp(id)).join('')}
      </main>
    </div>
  `;
```

**2. Add a print stylesheet** in `css/app.css`:

```css
@media print {
  .resume-mytemplate { font-family: Georgia, serif; }
  .resume-mytemplate .rt-header { text-align: center; }
}
```

**3. Register the tab button** in `app.html`:

```html
<button class="tpl-tab" data-tpl="mytemplate">My Template</button>
```

<br/>

### Add a New Demo Profile

In `js/data.js`, add a key to the `DEMOS` object:

```js
const DEMOS = {
  // ... existing profiles ...

  product_manager: {
    name: 'Sara Mitchell',
    title: 'Senior Product Manager',
    email: 'sara@productco.io',
    phone: '+1 415-555-0100',
    li: 'linkedin.com/in/saramitchell',
    gh: '',
    loc: 'New York, NY',
    summary: 'Product leader with 6 years shipping B2B SaaS...',
    skCats: {
      pm: { label: 'Product', tags: ['Roadmapping', 'A/B Testing', 'SQL', 'Figma'] }
    },
    exps: [{ co: 'Notion', role: 'Senior PM', dur: '2021–Present', loc: 'Remote', desc: '...' }],
    projs: [],
    edus: [{ school: 'Columbia University', deg: 'MBA', yr: '2018–2020', grade: '' }],
    certs: [],
    achs: [],
    langs: [{ name: 'English', level: 'Native' }]
  }
};
```

<br/>

---

## 📱 Mobile Support

| Context | Behavior |
|:--|:--|
| Landing page `< 960px` | Single column, centered content |
| Landing page `< 640px` | Steps stack vertically, templates center |
| App editor on mobile | Form is shown first; tap **👁 Preview** to see resume |
| PDF export on mobile | Opens native print dialog; works on Android Chrome + iOS Safari |
| Android / Termux | Fully compatible with `file://` — no server needed |

<br/>

---

## 🤝 Contributing

All contributions welcome — templates, profiles, bug fixes, feature ideas.

```bash
# 1. Fork the repo and clone it
git clone https://github.com/<your-username>/VitaeCraft.git

# 2. Create a branch
git checkout -b feat/your-feature-name

# 3. Make changes — no build step, just edit and open index.html
# 4. Commit clearly
git commit -m "feat: add product manager demo profile"

# 5. Push and open a PR
git push origin feat/your-feature-name
```

### Ideas for Contributions

```
🎨  New resume templates (dark theme, two-column, ATS-aggressive)
👤  More demo profiles (healthcare, finance, law, marketing)
🔗  Shareable resume via URL-encoded state
📥  Import from LinkedIn profile JSON
🌍  i18n support (RTL layouts, non-Latin alphabets)
🧪  More ATS categories (action verbs, length check, section order)
```

<br/>

---

## 📄 License

MIT License — free for personal and commercial use.

```
Copyright (c) 2025 Nandan Das

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software to use, copy, modify, merge, publish, distribute, sublicense,
and/or sell copies of the software, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the software.
```

See [LICENSE](LICENSE) for full text.

<br/>

---

## 🙏 Acknowledgements

- [**Syne**](https://fonts.google.com/specimen/Syne) · [**DM Sans**](https://fonts.google.com/specimen/DM+Sans) · [**DM Mono**](https://fonts.google.com/specimen/DM+Mono) — typography via Google Fonts
- Every job seeker who ever deserved a better shot

<br/>

---

<div align="center">

<br/>

```
Built with care by Nandan Das
```

<br/>

[![GitHub Profile](https://img.shields.io/badge/github-nandandas2407--web-b8f03a?style=for-the-badge&logo=github&logoColor=white&labelColor=04040c)](https://github.com/nandandas2407-web)

<br/>

**If VitaeCraft helped you or someone you know land a job — a ⭐ means the world.**

<br/>

</div>
