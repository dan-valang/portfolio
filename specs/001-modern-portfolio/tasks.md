---

description: "Task list for Modern Portfolio feature implementation"
---

# Tasks: Modern Portfolio

**Input**: Design documents from `/specs/001-modern-portfolio/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/
**Tests**: Included as specified in quickstart.md and research.md
**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Hybrid Architecture**: `src/` (Astro), `blog/` (TanStack Start), `shared/` (common types)
- **Astro Site**: `src/pages/`, `src/components/`, `src/layouts/`
- **TanStack Blog**: `blog/app/`, `blog/server/`, `blog/components/`
- **Shared**: `shared/types/`, `shared/utils/`, `shared/components/`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Create hybrid project structure with Astro and TanStack Start workspaces
- [ ] T002 Initialize TypeScript 5.x project with React 18+ dependencies
- [ ] T003 [P] Configure oxlint for fast Rust-based linting
- [ ] T004 [P] Configure Prettier for code formatting
- [ ] T005 [P] Setup pnpm workspaces for monorepo structure using pnpm-workspace.yaml

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T006 Setup Astro configuration with hybrid output (SSG + opt-in SSR)
- [ ] T007 [P] Setup TanStack Start configuration for server-side rendering
- [ ] T008 [P] Configure Tailwind CSS with shadcn/ui components
- [ ] T009 [P] Setup Jotai for state management in React islands
- [ ] T010 [P] Setup TanStack Query for server state management
- [ ] T011 [P] Configure react-i18next for internationalization
- [ ] T012 [P] Setup Zod for runtime validation
- [ ] T013 [P] Configure Framer Motion for animations
- [ ] T014 Setup environment configuration management
- [ ] T015 Configure error handling and logging infrastructure
- [ ] T016 [P] Setup Vitest for unit/integration testing
- [ ] T017 [P] Setup Playwright for E2E testing
- [ ] T018 [P] Configure Sentry for error tracking and performance monitoring

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Portfolio Value Proposition (Priority: P1) 🎯 MVP

**Goal**: User learns about my value and how to contact me

**Independent Test**: Navigate to homepage, view hero section, understand value proposition, and access contact information

### Tests for User Story 1 ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T019 [P] [US1] E2E test for homepage hero section in tests/e2e/homepage.spec.ts
- [ ] T020 [P] [US1] E2E test for contact form accessibility in tests/e2e/contact.spec.ts
- [ ] T021 [P] [US1] Unit test for hero component in tests/unit/components/Hero.test.tsx
- [ ] T022 [P] [US1] Integration test for contact form in tests/integration/contact.test.tsx

### Implementation for User Story 1

- [ ] T023 [P] [US1] Create base layout component in src/layouts/BaseLayout.astro
- [ ] T024 [P] [US1] Create hero section component in src/components/Hero.astro
- [ ] T025 [P] [US1] Create contact form component in src/components/ContactForm.astro
- [ ] T026 [US1] Implement homepage in src/pages/index.astro (depends on T023, T024, T025)
- [ ] T027 [US1] Create contact page in src/pages/contact.astro
- [ ] T028 [US1] Add navigation component in src/components/Navigation.astro
- [ ] T029 [US1] Add responsive design with Tailwind CSS
- [ ] T030 [US1] Add accessibility features (ARIA labels, keyboard navigation)
- [ ] T031 [US1] Add internationalization support for hero and contact sections
- [ ] T032 [US1] Add animations with Framer Motion
- [ ] T033 [US1] Add error handling for contact form submission
- [ ] T034 [US1] Add logging for user interactions
- [ ] T034b [P] [US1] Create resume component in src/components/Resume.astro
- [ ] T034c [P] [US1] Add resume download endpoint in src/pages/api/resume/download.ts
- [ ] T034d [US1] Integrate resume link in hero section and navigation
- [ ] T034e [P] [US1] E2E test for resume download in tests/e2e/resume.spec.ts
- [ ] T034f [P] [US1] Create About page in src/pages/[lang]/about.astro
- [ ] T034g [P] [US1] Create career timeline component in src/components/CareerTimeline.astro
- [ ] T034h [US1] Add LinkedIn profile integration to About page
- [ ] T034i [P] [US1] E2E test for About page content in tests/e2e/about.spec.ts

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Case Studies & Expertise (Priority: P2)

**Goal**: User evaluates my case studies and expertise

**Independent Test**: Navigate to case studies section, view project details, filter by technology, and assess expertise

### Tests for User Story 2 ⚠️

- [ ] T035 [P] [US2] E2E test for case studies filtering in tests/e2e/case-studies.spec.ts
- [ ] T036 [P] [US2] Unit test for case study card component in tests/unit/components/CaseStudyCard.test.tsx
- [ ] T037 [P] [US2] Integration test for case studies data fetching in tests/integration/case-studies.test.tsx

### Implementation for User Story 2

- [ ] T038 [P] [US2] Create CaseStudy model in shared/types/CaseStudy.ts
- [ ] T039 [P] [US2] Create Skill model in shared/types/Skill.ts
- [ ] T040 [P] [US2] Create case study card component in src/components/CaseStudyCard.astro
- [ ] T041 [P] [US2] Create skills visualization component in src/components/SkillsVisualization.astro
- [ ] T042 [US2] Implement case studies page in src/pages/case-studies.astro (depends on T038, T039, T040, T041)
- [ ] T043 [US2] Create case study detail page in src/pages/case-studies/[slug].astro
- [ ] T044 [US2] Add filtering functionality for case studies
- [ ] T045 [US2] Add search functionality for case studies
- [ ] T046 [US2] Add pagination for case studies
- [ ] T047 [US2] Add internationalization for case studies
- [ ] T048 [US2] Integrate with User Story 1 navigation

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Trust & Social Proof (Priority: P3)

**Goal**: User builds trust via my skills and testimonials

**Independent Test**: View testimonials, verify LinkedIn profile integration, and assess credibility indicators

### Tests for User Story 3 ⚠️

- [ ] T049 [P] [US3] E2E test for testimonials section in tests/e2e/testimonials.spec.ts
- [ ] T050 [P] [US3] Unit test for testimonial component in tests/unit/components/Testimonial.test.tsx
- [ ] T051 [P] [US3] Integration test for LinkedIn profile sync in tests/integration/linkedin.test.tsx

### Implementation for User Story 3

- [ ] T052 [P] [US3] Create Testimonial model in shared/types/Testimonial.ts
- [ ] T053 [P] [US3] Create LinkedInProfile model in shared/types/LinkedInProfile.ts
- [ ] T054 [P] [US3] Create testimonial component in src/components/Testimonial.astro
- [ ] T055 [P] [US3] Create LinkedIn profile component in src/components/LinkedInProfile.astro
- [ ] T056 [US3] Implement testimonials section in src/pages/testimonials.astro (depends on T052, T053, T054, T055)
- [ ] T057 [US3] Add LinkedIn OAuth integration in src/pages/api/auth/linkedin/init.ts
- [ ] T058 [US3] Add LinkedIn OAuth callback handler in src/pages/api/auth/linkedin/callback.ts
- [ ] T059 [US3] Create LinkedIn profile sync endpoint in netlify/edge-functions/linkedin-profile.ts
- [ ] T060 [US3] Add testimonials management interface
- [ ] T061 [US3] Add credibility indicators (certifications, awards)
- [ ] T062 [US3] Integrate with User Story 1 and 2 components

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: Blog Implementation (Astro Content Collections)

**Purpose**: Blog functionality using Astro's native content system

### Tests for Blog Implementation ⚠️

- [ ] T063 [P] [Blog] E2E test for blog listing in tests/e2e/blog.spec.ts
- [ ] T064 [P] [Blog] Unit test for blog MDX component in tests/unit/components/BlogPost.test.tsx
- [ ] T065 [P] [Blog] Integration test for blog content loading in tests/integration/blog-content.test.tsx

### Implementation for Blog

- [ ] T066 [P] [Blog] Configure Astro Content Collections for blog in src/content/config.ts
- [ ] T067 [P] [Blog] Create blog post schema with Zod validation in src/content/config.ts
- [ ] T068 [P] [Blog] Create blog listing page in src/pages/[lang]/blog/index.astro
- [ ] T069 [P] [Blog] Create blog post detail page in src/pages/[lang]/blog/[slug].astro
- [ ] T070 [P] [Blog] Create MDX components provider in src/components/mdx/MDXComponents.astro
- [ ] T071 [Blog] Implement blog search using Pagefind in src/pages/[lang]/blog/search.astro
- [ ] T072 [Blog] Add blog tagging and filtering in src/components/BlogFilters.astro
- [ ] T073 [Blog] Create RSS feed generation in src/pages/[lang]/rss.xml.ts
- [ ] T074 [Blog] Implement LinkedIn cross-posting function in netlify/functions/linkedin-crosspost.ts
- [ ] T075 [Blog] Add blog comment system using Netlify Functions in netlify/functions/comments.ts
- [ ] T076 [Blog] Integrate blog with main site navigation in src/components/Navigation.astro

---

## Phase 7: LinkedIn Integration APIs

**Purpose**: LinkedIn messaging and profile integration

### Tests for LinkedIn Integration ⚠️

- [ ] T081 [P] [LinkedIn] E2E test for LinkedIn messaging in tests/e2e/linkedin-messaging.spec.ts
- [ ] T082 [P] [LinkedIn] Unit test for LinkedIn API client in tests/unit/lib/LinkedInClient.test.ts
- [ ] T083 [P] [LinkedIn] Integration test for LinkedIn OAuth flow in tests/integration/linkedin-oauth.test.tsx

### Implementation for LinkedIn Integration

- [ ] T084 [P] [LinkedIn] Create LinkedInMessage model in shared/types/LinkedInMessage.ts
- [ ] T085 [P] [LinkedIn] Create LinkedIn API client in src/lib/LinkedInClient.ts
- [ ] T086 [P] [LinkedIn] Create LinkedIn OAuth service in src/lib/LinkedInOAuth.ts
- [ ] T087 [LinkedIn] Implement LinkedIn send message endpoint in netlify/edge-functions/linkedin-send-message.ts
- [ ] T088 [LinkedIn] Implement LinkedIn share endpoint in netlify/edge-functions/linkedin-share.ts
- [ ] T089 [LinkedIn] Add LinkedIn message composition interface
- [ ] T090 [LinkedIn] Add LinkedIn profile synchronization
- [ ] T091 [LinkedIn] Add rate limiting for LinkedIn APIs
- [ ] T092 [LinkedIn] Add error handling for LinkedIn integration
- [ ] T093 [LinkedIn] Add logging for LinkedIn operations
- [ ] T093k [P] [LinkedIn] Implement LinkedIn Recommendations fetch in src/lib/LinkedInClient.ts
- [ ] T093l [P] [LinkedIn] Create recommendations display component in src/components/LinkedInRecommendations.astro
- [ ] T093m [LinkedIn] Add recommendations section to testimonials page in src/pages/[lang]/testimonials.astro
- [ ] T093n [P] [LinkedIn] Add recommendation caching with 7-day TTL
- [ ] T093o [P] [LinkedIn] E2E test for recommendations display in tests/e2e/linkedin-recommendations.spec.ts

---

## Phase 7b: Google Calendar Integration (FR-017)

**Purpose**: "Schedule a Call" button with Google Calendar appointment booking

### Tests ⚠️

- [ ] T093b [P] [Calendar] E2E test for calendar booking flow in tests/e2e/calendar.spec.ts
- [ ] T093c [P] [Calendar] Unit test for Google Calendar API client in tests/unit/lib/GoogleCalendar.test.ts

### Implementation

- [ ] T093d [P] [Calendar] Setup Google Calendar API OAuth in netlify/edge-functions/google-oauth.ts
- [ ] T093e [P] [Calendar] Create calendar availability checker in netlify/functions/calendar-availability.ts
- [ ] T093f [P] [Calendar] Implement appointment booking in netlify/functions/calendar-book.ts
- [ ] T093g [P] [Calendar] Create "Schedule a Call" UI component in src/components/ScheduleCall.astro
- [ ] T093h [Calendar] Add calendar booking to contact page in src/pages/[lang]/contact.astro
- [ ] T093i [P] [Calendar] Configure time zone handling for multi-region bookings
- [ ] T093j [P] [Calendar] Add booking confirmation emails via Netlify Forms

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

### Internationalization (i18n) Subtasks

- [ ] T094 [P] [i18n] Configure react-i18next namespaces in shared/i18n/config.ts
- [ ] T095 [P] [i18n] Create English translations file in shared/i18n/locales/en/common.json
- [ ] T096 [P] [i18n] Create Spanish translations file in shared/i18n/locales/es/common.json
- [ ] T097 [P] [i18n] Add language switcher component in src/components/LanguageSwitcher.astro
- [ ] T098 [i18n] Configure Astro i18n routing in astro.config.mjs (defaultLocale: 'en', locales: ['en', 'es'])
- [ ] T099 [i18n] Add hreflang tags to BaseLayout in src/layouts/BaseLayout.astro
- [ ] T100 [P] [i18n] Create translation helper utilities in shared/utils/i18n.ts
- [ ] T101 [P] [i18n] Add locale detection middleware in netlify/edge-functions/locale-detection.ts
- [ ] T102 [i18n] Update navigation component with translated menu items in src/components/Navigation.astro
- [ ] T103 [i18n] Add language-specific SEO meta tags in src/components/SEO.astro
- [ ] T104 [P] [i18n] E2E test for language switching in tests/e2e/i18n.spec.ts
- [ ] T105 [i18n] Configure TanStack Start i18n for blog in blog/app/i18n.ts

### Animation & Interaction Subtasks

- [ ] T106 [P] [Animation] Configure Framer Motion variants in shared/animations/variants.ts (fadeIn, slideIn, stagger)
- [ ] T106b [P] [Animation] Configure Framer Motion lazy loading strategy in shared/animations/lazy-loader.ts
- [ ] T106c [P] [Animation] Implement animation performance monitoring (FPS, CLS) in shared/utils/animation-metrics.ts
- [ ] T107 [P] [Animation] Add prefers-reduced-motion detection in shared/hooks/useReducedMotion.ts
- [ ] T108 [P] [Animation] Create animated page transitions in src/components/PageTransition.astro
- [ ] T109 [Animation] Add scroll-triggered animations using Framer Motion's viewport feature in src/components/AnimatedSection.astro
- [ ] T110 [P] [Animation] Add micro-interactions for buttons and cards in src/components/InteractiveCard.astro
- [ ] T111 [Animation] Configure loading animations for async content in src/components/LoadingSpinner.astro
- [ ] T112 [P] [Animation] Add parallax scrolling effects for hero section in src/components/Hero.astro
- [ ] T113 [Animation] Implement smooth scroll behavior in src/styles/global.css
- [ ] T114 [P] [Animation] Unit test for animation variants in tests/unit/animations/variants.test.ts
- [ ] T115 [P] [Animation] E2E test for reduced motion compliance in tests/e2e/accessibility.spec.ts
- [ ] T115b [P] [Animation] Add animation bundle size test (≤15KB total) in tests/performance/animation-bundle.spec.ts

### Dark Mode Implementation Subtasks

- [ ] T116 [P] [DarkMode] Configure Tailwind CSS dark mode in tailwind.config.js (strategy: 'class')
- [ ] T117 [P] [DarkMode] Create theme provider using Jotai in shared/store/theme.ts
- [ ] T118 [P] [DarkMode] Add theme toggle component in src/components/ThemeToggle.astro
- [ ] T119 [DarkMode] Implement system theme detection in shared/hooks/useSystemTheme.ts
- [ ] T120 [DarkMode] Add theme persistence to localStorage in shared/utils/theme.ts
- [ ] T121 [P] [DarkMode] Create dark mode color tokens in src/styles/tokens.css
- [ ] T122 [DarkMode] Update all components with dark: variants in src/components/
- [ ] T123 [DarkMode] Add theme transition animations in src/styles/theme-transitions.css
- [ ] T124 [P] [DarkMode] Prevent flash of unstyled content (FOUC) with inline script in src/layouts/BaseLayout.astro
- [ ] T125 [P] [DarkMode] Unit test for theme store in tests/unit/store/theme.test.ts
- [ ] T126 [P] [DarkMode] E2E test for theme persistence in tests/e2e/theme.spec.ts

### SEO Optimization Subtasks

- [ ] T127 [P] [SEO] Create SEO component with meta tags in src/components/SEO.astro
- [ ] T128 [P] [SEO] Add Open Graph meta tags for social sharing in src/components/OpenGraph.astro
- [ ] T129 [P] [SEO] Add Twitter Card meta tags in src/components/TwitterCard.astro
- [ ] T130 [P] [SEO] Add structured data (JSON-LD) in src/components/StructuredData.astro
- [ ] T131 [SEO] Generate dynamic sitemap.xml in src/pages/sitemap.xml.ts
- [ ] T132 [P] [SEO] Create robots.txt in public/robots.txt
- [ ] T133 [SEO] Add canonical URLs to all pages in src/layouts/BaseLayout.astro
- [ ] T134 [P] [SEO] Configure RSS feed for blog in blog/app/routes/rss.xml.ts
- [ ] T135 [P] [SEO] Add image alt text validation in shared/utils/seo-validation.ts
- [ ] T136 [SEO] Implement breadcrumb navigation with schema.org markup in src/components/Breadcrumbs.astro
- [ ] T137 [P] [SEO] Add page metadata configuration in shared/config/seo.ts
- [ ] T138 [P] [SEO] Unit test for SEO component in tests/unit/components/SEO.test.tsx
- [ ] T139 [P] [SEO] E2E test for meta tags presence in tests/e2e/seo.spec.ts

### Performance Optimization Subtasks

- [ ] T140 [P] [Perf] Configure code splitting in astro.config.mjs (output: 'hybrid')
- [ ] T141 [P] [Perf] Add image optimization with Astro Image in src/components/OptimizedImage.astro
- [ ] T142 [P] [Perf] Implement lazy loading for images with loading="lazy"
- [ ] T143 [Perf] Add route-based code splitting for TanStack Start in blog/app/router.tsx
- [ ] T144 [P] [Perf] Configure bundle analysis with vite-plugin-bundle-stats in vite.config.ts
- [ ] T145 [P] [Perf] Implement virtual scrolling for long lists in src/components/VirtualList.tsx
- [ ] T146 [P] [Perf] Add resource hints (preload, prefetch) in src/layouts/BaseLayout.astro
- [ ] T147 [P] [Perf] Configure font optimization with font-display: swap in src/styles/fonts.css
- [ ] T148 [Perf] Implement service worker for offline support in public/sw.js
- [ ] T149 [P] [Perf] Add performance monitoring with Web Vitals in shared/utils/web-vitals.ts
- [ ] T150 [P] [Perf] Configure Lighthouse CI in .github/workflows/lighthouse.yml
- [ ] T151 [P] [Perf] Add compression middleware in netlify/edge-functions/compression.ts
- [ ] T152 [P] [Perf] Implement cache headers configuration in netlify.toml
- [ ] T153 [P] [Perf] Add critical CSS extraction in astro.config.mjs
- [ ] T154 [P] [Perf] Configure asset optimization (minify, compress) in vite.config.ts
- [ ] T155 [P] [Perf] Performance test for Core Web Vitals in tests/performance/core-web-vitals.spec.ts
- [ ] T156 [P] [Perf] Bundle size test (≤200KB gzipped) in tests/performance/bundle-size.spec.ts
- [ ] T156b [Perf] Configure per-route bundle size limits in vite.config.ts (Astro routes: 100KB, Blog routes: 200KB)
- [ ] T156c [Perf] Add bundle size regression test in CI that fails if limits exceeded

### General Polish & Documentation

- [ ] T157 [P] Update documentation in docs/
- [ ] T158 [P] Code cleanup and refactoring
- [ ] T159 [P] Additional unit tests in tests/unit/
- [ ] T160 [P] Additional integration tests in tests/integration/
- [ ] T161 Security hardening (CSRF protection, XSS prevention)
- [ ] T162 [P] Accessibility audit with axe-core in tests/e2e/accessibility.spec.ts
- [ ] T163 Run quickstart.md validation
- [ ] T164 [P] Add error boundaries for React components in src/components/ErrorBoundary.tsx
- [ ] T165 [P] Add loading states and skeleton screens in src/components/Skeleton.astro
- [ ] T166 [P] [Analytics] Add analytics tracking with Plausible in netlify/edge-functions/analytics.ts
- [ ] T166b [P] [Analytics] Setup Plausible Analytics account and script tag
- [ ] T166c [P] [Analytics] Configure Plausible proxy through Netlify Edge Functions in netlify/edge-functions/analytics-proxy.ts
- [ ] T166d [Analytics] Add Plausible tracking script to BaseLayout in src/layouts/BaseLayout.astro
- [ ] T166e [P] [Analytics] Implement custom event tracking for portfolio interactions in shared/utils/track-event.ts
- [ ] T166f [P] [Analytics] Add GDPR-compliant analytics notice to privacy policy
- [ ] T166g [P] [Analytics] Configure analytics fallback to Google Analytics if Plausible unavailable
- [ ] T167 [P] Add deployment configuration for Netlify in netlify.toml
- [ ] T168 [P] Configure environment variables in .env.example

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-5)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Blog Implementation (Phase 6)**: Depends on Foundational phase completion
- **LinkedIn Integration (Phase 7)**: Depends on Foundational phase completion
- **Polish (Phase 8)**: Depends on all desired features being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - May integrate with US1 but should be independently testable
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - May integrate with US1/US2 but should be independently testable

### Within Each User Story

- Tests (if included) MUST be written and FAIL before implementation
- Models before services
- Services before endpoints
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- All tests for a user story marked [P] can run in parallel
- Models within a story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members
- Blog implementation and LinkedIn integration can proceed in parallel after foundational phase

---

## Parallel Example: User Story 1

```bash
# Launch all tests for User Story 1 together:
Task: "E2E test for homepage hero section in tests/e2e/homepage.spec.ts"
Task: "E2E test for contact form accessibility in tests/e2e/contact.spec.ts"
Task: "Unit test for hero component in tests/unit/components/Hero.test.tsx"
Task: "Integration test for contact form in tests/integration/contact.test.tsx"

# Launch all components for User Story 1 together:
Task: "Create base layout component in src/layouts/BaseLayout.astro"
Task: "Create hero section component in src/components/Hero.astro"
Task: "Create contact form component in src/components/ContactForm.astro"
Task: "Create navigation component in src/components/Navigation.astro"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Add Blog Implementation → Test independently → Deploy/Demo
6. Add LinkedIn Integration → Test independently → Deploy/Demo
7. Each feature adds value without breaking previous features

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1
   - Developer B: User Story 2
   - Developer C: User Story 3
   - Developer D: Blog Implementation
   - Developer E: LinkedIn Integration
3. Features complete and integrate independently

---

## MVP Scope Recommendation

**MVP (Minimum Viable Product)**: User Story 1 (Portfolio Value Proposition)

This includes:

- Homepage with hero section
- Contact form and page
- Basic navigation
- Responsive design
- Accessibility features
- Internationalization support
- Error handling and logging

**Rationale**: User Story 1 delivers the core value proposition - helping users understand who you are and how to contact you. This is the fundamental requirement for a portfolio website and can be deployed independently as a functional MVP.

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
- Hybrid architecture requires careful coordination between Astro and TanStack Start deployments
- LinkedIn integration requires proper OAuth flow implementation and security considerations
- Performance targets: Lighthouse score ≥ 90, Core Web Vitals compliance
- Accessibility targets: WCAG 2.1 AA compliance
- Bundle size targets: ≤ 200KB gzipped per route
