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
- [ ] T005 [P] Setup package.json workspaces for monorepo structure

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
- [ ] T041 [P] [US2] Create skills showcase component in src/components/SkillsShowcase.astro
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

## Phase 6: Blog Implementation (TanStack Start)

**Purpose**: Dynamic blog functionality with server-side rendering

### Tests for Blog Implementation ⚠️

- [ ] T063 [P] [Blog] E2E test for blog listing in tests/e2e/blog.spec.ts
- [ ] T064 [P] [Blog] Unit test for blog post component in tests/unit/components/BlogPost.test.tsx
- [ ] T065 [P] [Blog] Integration test for blog server functions in tests/integration/blog.test.tsx

### Implementation for Blog

- [ ] T066 [P] [Blog] Create BlogPost model in shared/types/BlogPost.ts
- [ ] T067 [P] [Blog] Create BlogComment model in shared/types/BlogComment.ts
- [ ] T068 [P] [Blog] Setup TanStack Start project structure in blog/
- [ ] T069 [P] [Blog] Create blog post listing component in blog/components/BlogPostList.tsx
- [ ] T070 [P] [Blog] Create blog post detail component in blog/components/BlogPostDetail.tsx
- [ ] T071 [P] [Blog] Create comment component in blog/components/CommentSection.tsx
- [ ] T072 [Blog] Implement blog server functions in blog/server/blog.ts
- [ ] T073 [Blog] Implement comment server functions in blog/server/comments.ts
- [ ] T074 [Blog] Create blog routes in blog/app/routes/blog.tsx
- [ ] T075 [Blog] Create blog post routes in blog/app/routes/blog.$slug.tsx
- [ ] T076 [Blog] Add MDX support for blog content
- [ ] T077 [Blog] Add blog search functionality
- [ ] T078 [Blog] Add blog categorization and tagging
- [ ] T079 [Blog] Add comment moderation system
- [ ] T080 [Blog] Integrate blog with main site navigation

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

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T094 [P] Update documentation in docs/
- [ ] T095 [P] Code cleanup and refactoring
- [ ] T096 Performance optimization across all stories
- [ ] T097 [P] Additional unit tests in tests/unit/
- [ ] T098 [P] Additional integration tests in tests/integration/
- [ ] T099 Security hardening (CSRF protection, XSS prevention)
- [ ] T100 [P] Accessibility audit and improvements
- [ ] T101 SEO optimization for all pages
- [ ] T102 [P] Add sitemap generation
- [ ] T103 [P] Add robots.txt configuration
- [ ] T104 Run quickstart.md validation
- [ ] T105 [P] Add error boundaries for React components
- [ ] T106 [P] Add loading states and skeleton screens
- [ ] T107 [P] Add offline support with service workers
- [ ] T108 [P] Add analytics tracking
- [ ] T109 [P] Add performance monitoring
- [ ] T110 [P] Add deployment configuration for Netlify
- [ ] T111 [P] Add deployment configuration for SST (blog)

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