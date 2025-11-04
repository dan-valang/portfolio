# Implementation Plan: Modern Portfolio Website

**Branch**: `001-modern-portfolio` | **Date**: 2025-11-03 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-modern-portfolio/spec.md`

**Note**: This document tracks the implementation planning phase (`/speckit.plan`) for the Modern Portfolio Website feature.

## Summary

Build a performance-optimized, bilingual (English/Spanish) personal portfolio website for a full-stack developer showcasing 14+ years of experience with emphasis on serverless architecture, security design, and architectural leadership. The site features case studies with metrics, interactive skills visualization, LinkedIn API integration, blog with cross-posting, and comprehensive animation system. Built with React, TypeScript, TanStack Router, Tailwind CSS, Framer Motion, and deployed on Netlify with serverless functions. Must achieve Lighthouse Performance ≥90, Core Web Vitals compliance (LCP ≤2.5s, INP <200ms, CLS <0.1), and WCAG 2.1 AA accessibility standards.

## Technical Context

**Language/Version**: TypeScript 5.x with React 18+

**Architecture**: Unified Astro-based site with selective React islands

**DECISION**: Single-platform deployment (Netlify only) chosen for simplicity, cost, and maintainability over hybrid multi-cloud approach.

**Primary Framework**: Astro 4.x (SSG with opt-in SSR via Edge Functions)

**Primary Dependencies**:

*Core Framework:*
- **Framework**: Astro 4.x with React integration for interactive islands
- **Styling**: Tailwind CSS v3+ with shadcn/ui component library
- **State Management**: Jotai (atomic state for React islands)
- **Routing**: Astro file-based routing with i18n support
- **Animations**: Framer Motion (~30KB gzipped) for micro-interactions
- **i18n**: Built-in Astro i18n routing + react-i18next for React islands
- **Content**: Astro Content Collections for MDX blog posts
- **Build**: Vite 5+ (integrated)
- **Deployment**: Netlify (static + Edge Functions + Netlify Functions)

*Blog Implementation:*
- **Approach**: Astro Content Collections with MDX
- **Dynamic Features**: Netlify Functions for comments, search, cross-posting
- **SSR**: Astro hybrid mode for dynamic blog routes

*Shared/Cross-Cutting:*
- **Linting**: oxlint (Rust-based, 50-100x faster than ESLint)
- **Formatting**: Prettier (compatible with oxlint via separate pass)
- **Validation**: Zod (TypeScript-first schemas for all data)
- **HTTP Client**: TanStack Query (LinkedIn API, server state)
- **Testing**: Vitest + React Testing Library (unit), Playwright (E2E)
- **Observability**: Sentry (error tracking across both apps)

**Storage**:
- **Astro Content**: MDX files via Astro Content Collections
- **TanStack Start Content**: MDX files with custom loader
- **Structured Data**: JSON files for case studies, skills, testimonials
- **Client-side**: localStorage (theme, language preferences)
- **LinkedIn Data**: Server-side caching (Netlify KV or AWS DynamoDB)
- **No traditional database**: Fully static generation with API routes

**Testing**:
- **Unit/Integration**: Vitest + React Testing Library
- **E2E**: Playwright (multi-browser, accessibility checks)
- **Visual Regression**: Playwright snapshots
- **Performance**: Lighthouse CI in GitHub Actions

**Target Platform**:
- **Astro Site**: Netlify (static hosting + Edge Functions for LinkedIn OAuth)
- **TanStack Start Blog**: SST v3 (AWS Lambda@Edge + CloudFront) OR Netlify
- **Runtime**: Node.js 20+ (Astro server functions, TanStack Start SSR)
- **Browsers**: Modern evergreen (Chrome, Firefox, Safari, Edge) with graceful degradation

**Project Type**: Full-stack web application (SSR/SSG hybrid with serverless API routes)

**Performance Goals**:
- Lighthouse Performance ≥ 90 (mobile)
- Core Web Vitals at p75: LCP ≤ 2.5s, INP < 200ms, CLS < 0.1
- JavaScript bundle ≤ 200KB gzipped per route
- First Contentful Paint (FCP) < 1.8s
- Time to Interactive (TTI) < 3.8s on mobile 4G

**Constraints**:
- Mobile-first responsive design (320px to 1920px)
- WCAG 2.1 AA accessibility compliance
- Support for `prefers-reduced-motion` and `prefers-color-scheme`
- SEO-optimized (meta tags, Open Graph, sitemaps, hreflang)
- No horizontal scroll at any breakpoint
- Progressive enhancement (core content accessible without JavaScript)

**Scale/Scope**:
- ~10 primary pages/routes (home, about, projects, skills, blog listing, blog posts, contact)
- 4+ case study detail pages
- 10-20 blog posts initially (scalable to 100+)
- Bilingual content (English/Spanish) with path-based routing
- Expected traffic: <10K monthly visitors initially
- Content update frequency: Weekly blog posts, quarterly portfolio updates

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Post-Phase 1 Constitutional Compliance

| Principle | Requirement | Status | Notes |
|-----------|-------------|--------|-------|
| **I. Minimalist & Content-First** | Prioritize readable typography and content hierarchy | ✅ PASS | Astro's content-first approach + Tailwind CSS + shadcn/ui support minimalist design; MDX for rich content |
| **I. Minimalist & Content-First** | Limit color palette and components | ✅ PASS | Shared Tailwind config across Astro/TanStack Start; shadcn/ui provides cohesive system |
| **II. Performance-Oriented** | Lighthouse Performance ≥ 90 mobile | ✅ PASS | Astro's zero-JS default + partial hydration (islands) + TanStack Start SSR optimized for Core Web Vitals |
| **II. Performance-Oriented** | Core Web Vitals: LCP ≤2.5s, INP <200ms, CLS <0.1 | ✅ PASS | Astro static generation ensures fast LCP; Framer Motion with `prefers-reduced-motion`; image optimization via Astro Image |
| **II. Performance-Oriented** | Total JS ≤ 200KB gzipped per route | ✅ PASS | Astro islands: minimal React hydration (~20-40KB/island); TanStack Start: React (45KB) + Router (15KB) + Framer Motion (30KB) ≈ 90KB base |
| **III. Showcase-Driven Development** | Every page serves portfolio goals | ✅ PASS | Hybrid architecture optimized for showcase: Astro for static content, TanStack Start for interactive blog |
| **IV. Modern & Maintainable Codebase** | React with TanStack | ✅ PASS | Hybrid: Astro 4.x (modern MPA) + TanStack Start (modern SPA); shared TypeScript, Tailwind, Zod schemas |
| **IV. Modern & Maintainable Codebase** | Composition over inheritance | ✅ PASS | React islands in Astro + TanStack Start components; shadcn/ui composable primitives; Jotai atomic state |
| **V. Continuous Deployment** | Netlify CD on main after checks | ✅ PASS | Astro: Netlify adapter; TanStack Start: SST v3 (AWS) or Netlify; both with automated deployment |
| **V. Continuous Deployment** | Preview deploys for PRs | ✅ PASS | Netlify automatic previews (Astro); AWS CDK/SST preview environments (TanStack Start) |
| **VI. Code Quality** | Linting and formatting in CI | ✅ PASS | oxlint (ultra-fast linting) + Prettier (formatting) with compatible configurations; TypeScript strict mode |
| **Additional: Accessibility** | WCAG 2.1 AA for key flows | ✅ PASS | shadcn/ui accessible primitives; ARIA labels; keyboard navigation; Playwright accessibility tests |
| **Additional: SEO** | Metadata, Open Graph, sitemap | ✅ PASS | Astro SSG with SEO components; TanStack Start SSR for dynamic pages; hreflang for i18n |
| **Additional: Observability** | Runtime error reporting | ✅ PASS | Sentry integration across both Astro and TanStack Start; error boundaries; source maps |

### Constitutional Violations Requiring Justification

**None identified.** The hybrid Astro + TanStack Start architecture **enhances** constitutional compliance:

1. **Performance**: Astro's zero-JS default beats single-framework approach
2. **Maintainability**: Demonstrates broader technical skills while maintaining clean separation
3. **Showcase-Driven**: Architecture itself showcases modern multi-framework competency

**Constitution Compliance Results (Post-Design Evaluation)**

| Principle | Status | Evidence Source |
|------------|---------|----------------|
| Minimalist & Content-First | ✅ | `design.md` §1, §6 |
| Performance-Oriented (Core Web Vitals ≥90) | ✅ | `design.md` §9 |
| Showcase-Driven Development | ✅ | `design.md` §2, §7 |
| Modern & Maintainable Codebase | ✅ | `design.md` §1, §5, §10 |
| Continuous Deployment Readiness | ✅ | `design.md` §9, §10 |
| Code Quality & Testability | ✅ | `design.md` §10 |

**Post-Design Verdict:**  
All six constitutional principles verified. The technical design satisfies the constitution's mandates for simplicity, accessibility, and maintainability. Approved for progression to Phase 2 (Implementation).

✅ Constitution verification complete — Phase 1 Technical Design Approved.

### Risk Areas and Mitigations (Post-Design)

1. **Multi-Framework Complexity** ✅ MITIGATED
   - **Risk**: Increased cognitive load, deployment complexity
   - **Mitigation**: Clear separation (Astro = static, TanStack = dynamic); shared configs; comprehensive quickstart guide

2. **Performance Budget** ✅ MITIGATED
   - **Risk**: Hybrid architecture could bloat bundle sizes
   - **Mitigation**: Astro islands minimize hydration; TanStack Start code splitting; shared dependencies deduplicated

3. **LinkedIn API Integration** ✅ MITIGATED
   - **Risk**: OAuth flow complexity, rate limiting, stale data
   - **Mitigation**: Hybrid OAuth (Messaging API primary, Share API fallback); server-side caching (Netlify KV/DynamoDB); error boundaries

4. **Deployment Coordination** ✅ MITIGATED
   - **Risk**: Two separate deployments to coordinate
   - **Mitigation**: Monorepo structure; shared CI/CD pipeline; Netlify _redirects for routing between apps

### Architectural Strengths vs. Constitution

| Constitutional Goal | Architectural Advantage |
|---------------------|-------------------------|
| **Performance** | Astro's zero-JS default + islands architecture achieves best-in-class performance |
| **Minimalism** | Static generation for content-heavy pages reduces complexity |
| **Showcase Skills** | Multi-framework proficiency demonstrates architectural thinking |
| **Maintainability** | Clear separation of concerns; each framework used for its strengths |
| **Modern Stack** | Cutting-edge: Astro 4.x, TanStack Start, Jotai, SST v3 |

### Performance Budget Compliance Strategy

**Constitutional Requirement**: Total JS ≤ 200KB gzipped per route

**Current Base Bundle Estimate**:
- Astro: ~5KB (runtime)
- React islands: ~20-40KB per island (React 18 ~45KB shared)
- TanStack Start base: React 45KB + Router 15KB + Framer Motion 30KB = ~90KB
- **Total base**: ~110-135KB before feature code

**Mitigation Strategy**:
1. **Lazy Load Framer Motion**: Import animations on-demand using dynamic imports
   - Hero animations: ~10KB
   - Skills animations: ~8KB
   - Blog animations: ~7KB
   - Total potential savings: ~15-20KB by not loading all at once

2. **Code Splitting by Route**:
   - Home route: Astro (static) + minimal React island ~30KB
   - Case studies: Astro + React island ~35KB
   - Contact: Astro + form validation ~25KB
   - Blog (TanStack): Separate bundle ~120KB (within budget for blog-only routes)

3. **Bundle Monitoring**:
   - Add bundle size CI check in Phase 8 (T156)
   - Fail build if any route exceeds 200KB gzipped
   - Use vite-plugin-bundle-analyzer for profiling

4. **Acceptable Trade-offs**:
   - Blog routes may approach 180KB due to TanStack Start base
   - Static portfolio routes will stay under 100KB due to Astro's zero-JS default
   - Overall site performance target (Lighthouse ≥90) remains achievable

**Decision**: Proceed with hybrid architecture with monitoring; constitutional compliance validated per-route rather than globally.

## Project Structure

### Documentation (this feature)

```text
specs/001-modern-portfolio/
├── spec.md              # Feature specification (already exists)
├── plan.md              # This file (implementation plan)
├── research.md          # Phase 0: Technology decisions and rationale
├── data-model.md        # Phase 1: Entity definitions and relationships
├── quickstart.md        # Phase 1: Implementation guide for developers
├── contracts/           # Phase 1: API contracts and schemas
│   ├── contact-form.openapi.yml
│   ├── linkedin-api.schema.ts
│   └── blog-post.schema.ts
└── tasks.md             # Phase 2: Task breakdown (NOT created by /speckit.plan)
```

### Monorepo Structure (Hybrid Astro + TanStack Start)

**Selected Structure**: Monorepo with two separate applications and shared utilities

```text
/home/dan/code/personal/portfolio/
├── .github/
│   └── workflows/
│       ├── ci.yml                    # Lint, test, build
│       ├── lighthouse-ci.yml         # Performance checks
│       └── deploy.yml                # Netlify + SST deployment
│
├── packages/                         # Monorepo workspaces
│   ├── astro-site/                   # Main portfolio (Astro 4.x)
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── Hero.astro
│   │   │   │   ├── CaseStudyCard.astro
│   │   │   │   ├── SkillsVisualization.astro
│   │   │   │   ├── LanguageSwitcher.astro
│   │   │   │   ├── ThemeToggle.tsx    # React island
│   │   │   │   └── ui/                # shadcn/ui components
│   │   │   ├── layouts/
│   │   │   │   └── BaseLayout.astro
│   │   │   ├── pages/
│   │   │   │   ├── index.astro        # Redirect to /en or /es
│   │   │   │   ├── en/
│   │   │   │   │   ├── index.astro    # EN homepage
│   │   │   │   │   ├── about.astro
│   │   │   │   │   ├── case-studies/
│   │   │   │   │   │   ├── index.astro
│   │   │   │   │   │   └── [slug].astro
│   │   │   │   │   ├── skills.astro
│   │   │   │   │   └── contact.astro
│   │   │   │   ├── es/                # ES pages (same structure)
│   │   │   │   ├── sitemap.xml.ts
│   │   │   │   ├── sitemap-[lang].xml.ts
│   │   │   │   └── api/               # Astro API routes
│   │   │   │       └── contact.ts     # Contact form handler
│   │   │   ├── i18n/
│   │   │   │   ├── config.ts
│   │   │   │   ├── locales/
│   │   │   │   │   ├── en/
│   │   │   │   │   │   ├── common.json
│   │   │   │   │   │   ├── hero.json
│   │   │   │   │   │   └── about.json
│   │   │   │   │   └── es/            # Spanish translations
│   │   │   │   └── schemas.ts         # Zod validation
│   │   │   ├── lib/
│   │   │   │   ├── animations/
│   │   │   │   │   ├── config.ts
│   │   │   │   │   ├── variants.ts
│   │   │   │   │   ├── useScrollParallax.ts
│   │   │   │   │   └── usePrefersReducedMotion.ts
│   │   │   │   └── utils/
│   │   │   ├── store/                 # Jotai atoms
│   │   │   │   └── theme.ts
│   │   │   ├── styles/
│   │   │   │   ├── global.css
│   │   │   │   └── themes.css         # Dark mode CSS variables
│   │   │   └── content/               # Astro Content Collections
│   │   │       ├── config.ts
│   │   │       ├── case-studies/      # MDX files
│   │   │       └── testimonials/      # JSON files
│   │   ├── public/
│   │   │   ├── images/
│   │   │   ├── og/                    # Open Graph images
│   │   │   ├── fonts/
│   │   │   └── robots.txt
│   │   ├── astro.config.mjs           # Astro config with i18n
│   │   ├── tailwind.config.mjs
│   │   └── package.json
│   │
│   ├── blog/                          # TanStack Start blog
│   │   ├── app/
│   │   │   ├── routes/
│   │   │   │   ├── __root.tsx         # Root layout
│   │   │   │   ├── index.tsx          # Blog listing
│   │   │   │   ├── $lang/
│   │   │   │   │   └── blog/
│   │   │   │   │       ├── index.tsx  # Blog listing by lang
│   │   │   │   │       └── $slug.tsx  # Blog post
│   │   │   │   └── api/
│   │   │   │       ├── linkedin/
│   │   │   │       │   ├── auth.ts    # OAuth flow
│   │   │   │       │   └── cross-post.ts
│   │   │   │       └── rss/
│   │   │   │           └── [lang].xml.ts
│   │   │   └── components/
│   │   │       ├── BlogPostList.tsx
│   │   │       ├── BlogPostDetail.tsx
│   │   │       └── MDXProvider.tsx
│   │   ├── server/                    # Server-side logic
│   │   │   ├── linkedin.ts
│   │   │   └── mdx-loader.ts
│   │   ├── content/
│   │   │   └── blog/
│   │   │       ├── en/                # English blog posts (MDX)
│   │   │       └── es/                # Spanish blog posts (MDX)
│   │   ├── sst.config.ts              # SST deployment config
│   │   └── package.json
│   │
│   └── shared/                        # Shared utilities
│       ├── types/
│       │   ├── CaseStudy.ts
│       │   ├── Skill.ts
│       │   ├── Testimonial.ts
│       │   ├── BlogPost.ts
│       │   ├── LinkedInProfile.ts
│       │   └── index.ts
│       ├── utils/
│       │   ├── validation.ts          # Zod schemas
│       │   └── date.ts
│       ├── components/                # Shared React components
│       │   └── ui/                    # shadcn/ui (used by both apps)
│       └── package.json
│
├── specs/                             # Feature specifications
│   └── 001-modern-portfolio/
│       ├── spec.md
│       ├── plan.md
│       ├── tasks.md
│       ├── research.md
│       ├── data-model.md
│       ├── quickstart.md
│       └── contracts/
│
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
├── package.json                       # Root package.json (workspace)
├── pnpm-workspace.yaml                # Workspace config
├── turbo.json                         # Turborepo config (optional)
└── netlify.toml                       # Netlify config with redirects
```

## Unified Deployment Architecture

**Deployment Platform**: Netlify (single platform)

**Rationale**:
1. **Simplicity**: One deployment target, one domain, one CI/CD pipeline
2. **Cost**: Netlify free tier sufficient; avoids AWS minimum costs
3. **Performance**: Edge Functions + CDN adequate for portfolio scale
4. **Maintenance**: Fewer moving parts, simpler troubleshooting

**Architecture Details**:
- **Static Pages**: Astro SSG for home, about, case studies, skills (pre-rendered at build)
- **Dynamic Blog**: Astro hybrid mode with Edge Functions for SSR
- **API Routes**: Netlify Functions for contact form, LinkedIn OAuth, blog operations
- **Content**: All managed via Astro Content Collections (single source of truth)

**URL Structure**:
- `/` → Static homepage (Astro)
- `/en/`, `/es/` → Localized routes (Astro i18n)
- `/en/case-studies/[slug]` → Static case study pages
- `/en/blog/[slug]` → Dynamic blog posts (Astro hybrid SSR)
- `/api/contact` → Netlify Function
- `/api/linkedin/*` → Netlify Edge Functions (OAuth, sync)

**Bundle Strategy**:
- Static routes: <100KB JS (Astro zero-JS default + minimal React islands)
- Blog routes: <180KB JS (Astro + MDX + interactive features)
- Separate bundles per route via Vite code splitting

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
