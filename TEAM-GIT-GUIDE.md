# Team Git Guide – who pushes what

Each member works on their **own branch** from **their own GitHub account**, then opens a Pull Request into `main`.

## Step 0 – Member 1 creates the repo and pushes the base

```bash
git init
git add index.html css/base.css js/nav.js images/app-logo.jpeg README.md TEAM-GIT-GUIDE.md
git commit -m "Add page skeleton, base styles and navigation"
git branch -M main
git remote add origin https://github.com/<owner>/fixmyride.git
git push -u origin main
```
Then invite Members 2–5 as collaborators (Settings → Collaborators).

> `index.html` already contains every section. Each member is responsible for the block between
> `<!-- MEMBER N START -->` and `<!-- MEMBER N END -->`. If you want true separate commits, Member 1 pushes
> `index.html` with the other members' blocks empty, and each member then adds their own block in their branch.

## Each member (2, 3, 4, 5)

```bash
git clone https://github.com/<owner>/fixmyride.git
cd fixmyride
git checkout -b feature/<your-part>
# add ONLY your files (see below)
git add <your files>
git commit -m "<message below>"
git push -u origin feature/<your-part>
```
Then open a Pull Request on GitHub. Merge order: **2 → 3 → 4 → 5**.

| Member | Branch | Files to add | Commit message |
|---|---|---|---|
| 1 | `main` | `index.html`, `css/base.css`, `js/nav.js`, `images/app-logo.jpeg`, `README.md`, `TEAM-GIT-GUIDE.md` | Add page skeleton, base styles and navigation |
| 2 | `feature/hero-splash` | `css/hero.css`, `js/splash.js`, `images/hero-mockup.svg` (+ your HTML blocks in `index.html`) | Add splash screen, hero and problem sections |
| 3 | `feature/features-steps` | `css/features.css`, `js/animations.js` (+ your HTML blocks) | Add how-it-works, features and scroll animations |
| 4 | `feature/gallery-team` | `css/gallery-team.css`, `images/screenshot-1-breakdown.svg`, `images/screenshot-2-mechanics.svg`, `images/screenshot-3-tracking.svg`, `images/screenshot-4-completion.svg`, `images/team-1.svg` … `images/team-5.svg` (+ your HTML blocks) | Add screenshots and team sections |
| 5 | `feature/form-footer` | `css/form-footer.css`, `js/form.js`, `images/favicon.svg`, `images/og-preview.svg` (+ your HTML blocks) | Add waitlist form, footer and deployment |

## If `index.html` conflicts
Keep **both** sides' blocks. Never delete another member's `MEMBER N START/END` section.

## Before final submission
- Replace the placeholder team names/roles in the Team section with the real members.
- Replace the fake phone number in the footer.
- Connect the waitlist form to Formspree or Google Forms (`js/form.js`).
