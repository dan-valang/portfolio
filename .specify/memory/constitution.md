<!--
Sync Impact Report
Version change: 1.0.0 → 1.1.0
Modified principles:
- II. Performance-Oriented — add Core Web Vitals thresholds (LCP ≤ 2.5s, INP < 200ms, CLS < 0.1)
Added sections:
- None
Removed sections:
- None
Templates requiring updates:
- .specify/templates/plan-template.md — ✅ verified alignment
- .specify/templates/spec-template.md — ✅ verified alignment
- .specify/templates/tasks-template.md — ✅ verified alignment
Follow-up TODOs:
- None
-->

# Personal Portfolio Constitution

## Core Principles

### I. Minimalist & Content-First
The portfolio MUST present work and skills clearly, using restrained visuals and whitespace.
- MUST prioritize readable typography and content hierarchy over decorative elements.
- SHOULD limit color palette and components to reduce cognitive load.
- Rationale: Minimalism focuses user attention on your work, improving comprehension.

### II. Performance-Oriented
The site MUST be fast and responsive across devices.
- MUST target Lighthouse Performance ≥ 90 on mobile in production.
- MUST meet Core Web Vitals thresholds at p75 (mobile): LCP ≤ 2.5s, INP < 200ms, CLS < 0.1.
- MUST keep total JS ≤ 200KB gzipped per route.
- Rationale: Speed improves UX and SEO, directly affecting conversion.

### III. Showcase-Driven Development
All decisions MUST serve showcasing projects and skills.
- MUST ensure every page traces back to a portfolio goal: discover, evaluate, contact.
- SHOULD favor layouts that highlight outcomes, roles, and impact first.
- Rationale: The portfolio’s purpose is evaluation; form follows demonstration.

### IV. Modern & Maintainable Codebase
Use a modern, documented stack that is easy to evolve.
- MUST use React with TanStack where applicable.
- MUST organize code for clarity and refactoring; prefer composition over inheritance.
- Rationale: Maintainability reduces future cost and enables rapid updates.

### V. Continuous Deployment
Automate reliable delivery via Netlify.
- MUST use continuous deployment to publish main branch after checks pass.
- SHOULD use preview deploys for PR review.
- Rationale: Frequent, safe releases keep the portfolio current.

### VI. Code Quality and Maintainability
Keep the codebase clean and self-documenting.
- MUST enforce linting and formatting in CI (e.g., ESLint, Prettier).
- SHOULD keep modules single-responsibility with clear naming.
- Rationale: Consistency prevents drift and speeds iteration.

## Additional Constraints
- Accessibility: SHOULD meet WCAG 2.1 AA for key flows.
- SEO: SHOULD provide metadata, Open Graph, and sitemap.
- Observability: SHOULD enable basic runtime error reporting.
- Internationalization: OPTIONAL; prepare copy for future localization.

## Development Workflow & Quality Gates
- Workflow: Follow Spec Kit phases: Constitution → Spec → Plan → Tasks → Implementation.
- Constitution Check: Plans MUST list gates derived from this constitution.
- CI gates:
  - Lint/format pass required.
  - Performance budget assertions where applicable.
- Reviews: At least one review; preview deploy link required for UI changes.
- Deployment: Netlify CD on main after CI success.

## Governance
This constitution supersedes other practices for this repository.

Amendment process:
- Propose change via PR updating this file and Sync Impact Report header.
- Document rationale, version bump type, and migration impact.
- Require approval before merge.

Versioning policy:
- MAJOR: Backward-incompatible governance/principle removal or redefinition.
- MINOR: New principle/section or materially expanded guidance.
- PATCH: Clarifications, wording, or non-semantic refinements.

Compliance:
- All PRs and reviews MUST verify constitution compliance.
- Non-compliance requires documented justification in plan complexity tracking.

**Version**: 1.1.0 | **Ratified**: 2025-10-31 | **Last Amended**: 2025-10-31
