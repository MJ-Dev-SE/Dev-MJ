# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

This is a Create React App (react-scripts) project. Run from the repo root:

- `npm start` — dev server with hot reload at http://localhost:3000
- `npm run build` — production build to `build/`
- `npm test` — Jest + React Testing Library in watch mode
- `npm test -- --watchAll=false` — run tests once (CI style)
- `npm test -- src/App.test.tsx` — run a single test file
- `npm test -- -t "renders learn react link"` — run tests matching a name

There is no separate lint script; ESLint runs through `react-scripts` (config in `package.json` under `eslintConfig`, extending `react-app`).

## Architecture

Single-page React 19 + TypeScript portfolio site, styled entirely with Tailwind CSS. No backend — the contact form posts directly to FormSubmit (`https://formsubmit.co/...`), and certificate PDFs are served as static assets.

**Routing & layout shell.** [src/App.tsx](src/App.tsx) is the layout root: it wraps everything in `BrowserRouter` and renders a persistent shell — `Sidebar` (off-canvas drawer), `Navbar` (sticky top bar with the hamburger toggle), `Footer`, and a `<main>` holding the `Routes`. Sidebar open/close state lives here in `App` and is passed down to both `Navbar` (toggle button) and `Sidebar` (visibility + backdrop). Routes: `/` (Home), `/projects`, `/certifications`, `/contact`, `/about`. Note `/about` has no sidebar link (commented out in [src/components/Sidebar.tsx](src/components/Sidebar.tsx)) but the route is still wired.

**Pages vs components.** `src/pages/*` are route targets; `src/components/*` are reusable pieces. `Home` is a thin wrapper that just renders `Hero`. The real complexity is in [src/components/Hero.tsx](src/components/Hero.tsx).

**Content lives inline in components, not in data files.** Project data, tech-stack groups, and certification lists are hardcoded arrays inside the components that render them:
- Projects are defined twice for different surfaces: a `projects` array inside `Hero.tsx` (the carousel "Experience" slide) AND as explicit `<ProjectCard>` props in [src/pages/Projects.tsx](src/pages/Projects.tsx). Editing one does not update the other — keep them in sync manually when project details change.
- Certifications are two arrays (`fundamentalCertifications`, `aiCertifications`) at the top of [src/pages/Certifications.tsx](src/pages/Certifications.tsx), tab-switched in the UI. Each entry points to a PDF in `public/certifications/` (via `filePath`) or an external `link`.

**Hero is a self-contained carousel.** It manages a 3-slide carousel (`currentSlide`), a typewriter role animation (driven by refs + `setInterval`, only active on slide 0), a rotating tech-stack panel (`activeTechGroup`), a portrait with a fallback placeholder on image error, and a project detail modal (`selectedProject`). All state is local `useState`/`useRef`.

## Styling conventions

- **Tailwind only** — no CSS modules or styled-components. The `@tailwind` directives appear in both [src/index.css](src/index.css) and [src/styles/globals.css](src/styles/globals.css) (both imported in [src/index.tsx](src/index.tsx)); custom keyframes/global styles also live in those files and [src/styles/theme.css](src/styles/theme.css).
- **Design language is fixed and should be matched in new UI:** dark slate background (`bg-slate-950`), amber/gold accent (`amber-300`–`amber-600`), emerald for "available/status" badges. Cards use `rounded-2xl`/`rounded-3xl`, `border-slate-700/800`, subtle gradients (`bg-gradient-to-br from-slate-950 ...`), blurred glow blobs (absolutely-positioned `blur-[120px]` divs), and amber hover states (`hover:border-amber-400`, `hover:shadow-amber-400/20`).
- **Custom animations:** `animate-fadeIn` is defined in [tailwind.config.js](tailwind.config.js); `.tech-stack-slide` is a hand-written keyframe in [src/styles/globals.css](src/styles/globals.css). Add reusable animations to the Tailwind config, one-offs to globals.css.

## Static assets

Files in `public/` are served from the site root. Hero expects a portrait at `public/portrait.jpg` (falls back to an "MJC" placeholder if missing). Certificate PDFs live in `public/certifications/` and are referenced by absolute path (e.g. `/certifications/GIT-TRAINING.pdf`). The CV "Download CV" / "LinkedIn" links in Hero currently both point to the LinkedIn profile, not `public/resume.pdf`.
