# Implementation Research: Modern Portfolio Website

**Feature**: 001-modern-portfolio  
**Phase**: Planning  
**Last Updated**: 2025-11-03

---

## Executive Summary

This document consolidates research findings and technical decisions for implementing a modern, bilingual portfolio website. All decisions are backed by current best practices (2024), performance benchmarks, and architectural considerations aligned with our constitutional principles.

**Key Architecture Decisions:**
- **Hybrid Framework Architecture**: Astro (static portfolio) + TanStack Start (dynamic blog/contact)
- **State Management**: Jotai for React component state in dynamic sections
- **Contact Mechanism**: LinkedIn Messaging API (OAuth) with Share API fallback
- **Internationalization**: react-i18next with SSR/SSG support
- **Testing Strategy**: Vitest + React Testing Library + Playwright
- **Deployment**: Netlify (primary) with SST v3 as AWS infrastructure alternative

---

## 1. Hybrid Framework Architecture: Astro + TanStack Start

### Decision
Use **Astro for the main portfolio site** with **TanStack Start as a separate subdomain/path for the blog** to showcase full-stack capabilities.

### Rationale

**Why This Specific Hybrid:**

1. **Skill Showcase**: Using both Astro and TanStack Start demonstrates expertise with multiple modern frameworks
2. **Optimal Architecture**: Static content (portfolio) on Astro, dynamic blog features (comments, search, auth) on TanStack Start
3. **Performance + Interactivity**: Best Lighthouse scores for portfolio, full React capabilities for blog
4. **Deployment Flexibility**: Independent deployments allow separate optimization strategies

**Architectural Pattern:**

```
Portfolio Ecosystem
├── Main Site (Astro) - portfolio.com
│   ├── Home page (static)
│   ├── About page (static)
│   ├── Projects showcase (static)
│   ├── Resume (static)
│   └── React Islands for:
│       ├── LinkedIn contact widget
│       └── Language switcher
│
└── Blog (TanStack Start) - blog.portfolio.com OR portfolio.com/blog/*
    ├── Blog listing (SSR)
    ├── Blog posts (SSR + hydration)
    ├── Search functionality (client-side)
    ├── Comments system (server functions)
    ├── Auth for admin (OAuth)
    └── Draft preview (server-side)
```

**Integration Strategy:**

```typescript
// Method 1: Subdomain (recommended for independent deployment)
// portfolio.com -> Astro site
// blog.portfolio.com -> TanStack Start app

// Method 2: Path-based (unified deployment)
// portfolio.com/* -> Astro site (static)
// portfolio.com/blog/* -> TanStack Start app (proxied or integrated)
```

### Technology Benefits Comparison

| Feature | Astro (Portfolio) | TanStack Start (Blog) |
|---------|------------------|---------------------|
| **Performance** | Zero JS by default, 100 Lighthouse | Full SSR with streaming, 95+ Lighthouse |
| **SEO** | Perfect for static content | Great with SSR, dynamic meta tags |
| **Content Management** | MDX with type-safe collections | Server functions + MDX |
| **Interactivity** | React islands where needed | Full React app with client-side routing |
| **Data Fetching** | Build-time static data | TanStack Query for real-time data |
| **Auth/Admin** | Not needed | Built-in server functions for auth |
| **Comments/Dynamic** | Limited (third-party widgets) | Native server-side implementation |
| **Skill Showcase** | Modern static site generation | Full-stack React development |

### Why TanStack Start for Blog

**Full-Stack Capabilities Demonstrated:**
1. **Server Functions**: Type-safe API endpoints without separate backend
2. **SSR + Streaming**: Server-side rendering with progressive enhancement
3. **Data Loading**: TanStack Router loaders for data fetching
4. **Form Handling**: Server actions for blog post creation/editing
5. **Authentication**: OAuth integration for admin dashboard
6. **Real-time Features**: Comments, search, draft previews
7. **SEO Optimization**: Dynamic meta tags, sitemaps, RSS feeds

### Architecture Alternatives Considered

| Option | Pros | Cons | Decision |
|--------|------|------|----------|
| **TanStack Start Only** | Unified codebase, full React | Larger bundles for static content, overkill for portfolio | Rejected: Over-engineered for static pages |
| **Astro Only** | Simplest, best performance | Limited for complex blog features (comments, auth, search) | Rejected: Doesn't showcase full-stack skills |
| **Next.js for Everything** | Mature ecosystem, App Router | Vendor lock-in, RSC learning curve, larger bundles | Rejected: Too opinionated, performance trade-offs |
| **Astro + TanStack Start Hybrid** | Best performance + full-stack showcase | Two separate deployments to manage | **SELECTED**: Optimal for skill demonstration + UX |

### Implementation Strategy

**1. Astro Site Configuration:**
```typescript
// portfolio/astro.config.mjs
import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import tailwind from '@astrojs/tailwind'

export default defineConfig({
  integrations: [
    react(), // Enable React islands for contact/language switcher
    tailwind()
  ],
  output: 'static',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    routing: { prefixDefaultLocale: false }
  }
})
```

**2. TanStack Start Blog Configuration:**
```typescript
// blog/app.config.ts
import { defineConfig } from '@tanstack/start/config'
import tsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  vite: {
    plugins: [tsConfigPaths()]
  },
  server: {
    preset: 'netlify' // or 'node-server' for SST
  }
})
```

**3. Blog with TanStack Start:**
```typescript
// blog/app/routes/__root.tsx
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { Meta, Scripts } from '@tanstack/start'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <html lang="en">
      <head>
        <Meta />
      </head>
      <body>
        <Outlet />
        <Scripts />
      </body>
    </html>
  )
}

// blog/app/routes/posts/$postId.tsx
import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/start'

// Server function for data fetching
const getPost = createServerFn('GET', async (postId: string) => {
  const post = await db.posts.findOne({ id: postId })
  return post
})

export const Route = createFileRoute('/posts/$postId')({
  loader: ({ params }) => getPost(params.postId),
  component: BlogPost
})

function BlogPost() {
  const post = Route.useLoaderData()
  
  return (
    <article>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
      <CommentSection postId={post.id} />
    </article>
  )
}

// Server function for comments
const addComment = createServerFn('POST', async (data: CommentData) => {
  // Server-side validation and storage
  await db.comments.create(data)
  return { success: true }
})
```

**4. Cross-Site Integration:**
```astro
---
// portfolio/src/pages/index.astro - Link to blog
---
<Layout>
  <nav>
    <a href="https://blog.portfolio.com">Read My Blog</a>
  </nav>
</Layout>
```

```typescript
// blog/app/routes/index.tsx - Back to portfolio
export const Route = createFileRoute('/')({
  component: () => (
    <div>
      <a href="https://portfolio.com">← Back to Portfolio</a>
      <h1>Blog Posts</h1>
    </div>
  )
})
```

### Performance & Deployment Comparison

**Portfolio Site (Astro):**
- Initial JS Bundle: ~50-80 KB (only for islands)
- Time to Interactive: < 1s
- Lighthouse Score: 100 (Performance, Accessibility, Best Practices, SEO)
- Build Time: ~10-20s
- Deployment: Netlify static hosting

**Blog (TanStack Start):**
- Initial JS Bundle: ~180-250 KB (full React hydration)
- Time to Interactive: 1.5-2s
- Lighthouse Score: 95+ (slight trade-off for interactivity)
- Build Time: ~20-30s
- Deployment: Netlify Functions or SST v3 Lambda

**Combined User Experience:**
- Portfolio pages: Instant loading, perfect SEO
- Blog pages: Fast SSR, rich interactivity, real-time features
- Best of both worlds: Static performance + dynamic capabilities

### References
- [Astro Official Documentation](https://docs.astro.build/)
- [TanStack Start Official Documentation](https://tanstack.com/start/latest)
- [Astro vs Next.js Performance](https://www.contentful.com/blog/astro-next-js-compared/)
- [TanStack Start Server Functions](https://tanstack.com/router/latest/docs/framework/react/guide/server-functions)
- [Hybrid Architecture Pattern](https://github.com/sookmax/astro-tanstack-router)

---

## 2. State Management: Jotai

### Decision
Use **Jotai** for React component state management within interactive islands.

### Rationale

**Why Jotai for This Architecture:**

1. **Atoms-First Design**: Perfect for isolated React islands that don't share complex state
2. **Minimal Bundle Size**: ~3KB gzipped (vs Redux ~40KB, Zustand ~5KB)
3. **React Suspense Native**: Built-in async atom support
4. **TypeScript-First**: Excellent type inference
5. **No Provider Hell**: Atomic state updates without deep component trees
6. **React 18+ Optimized**: Leverages concurrent features

**When to Use:**
- Language preference state
- LinkedIn auth state
- Form state in contact component
- UI state (modals, tooltips)

### Implementation

**Setup:**
```typescript
// lib/state/atoms.ts
import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

// Language preference (persisted to localStorage)
export const languageAtom = atomWithStorage<'en' | 'es'>('language', 'en')

// LinkedIn auth state
export const linkedInAuthAtom = atom<{
  isAuthenticated: boolean
  accessToken: string | null
  expiresAt: number | null
}>({
  isAuthenticated: false,
  accessToken: null,
  expiresAt: null
})

// Derived atom (computed value)
export const isLinkedInTokenValidAtom = atom(
  (get) => {
    const auth = get(linkedInAuthAtom)
    if (!auth.accessToken || !auth.expiresAt) return false
    return Date.now() < auth.expiresAt
  }
)

// Async atom for LinkedIn profile
export const linkedInProfileAtom = atom(async (get) => {
  const auth = get(linkedInAuthAtom)
  if (!get(isLinkedInTokenValidAtom)) return null
  
  const response = await fetch('/api/linkedin/profile', {
    headers: { 'Authorization': `Bearer ${auth.accessToken}` }
  })
  return response.json()
})
```

**Usage in Components:**
```tsx
// components/LanguageSwitcher.tsx
import { useAtom } from 'jotai'
import { languageAtom } from '@/lib/state/atoms'

export function LanguageSwitcher() {
  const [language, setLanguage] = useAtom(languageAtom)
  
  return (
    <select
      value={language}
      onChange={(e) => setLanguage(e.target.value as 'en' | 'es')}
    >
      <option value="en">English</option>
      <option value="es">Español</option>
    </select>
  )
}

// components/LinkedInAuth.tsx
import { useAtom } from 'jotai'
import { linkedInAuthAtom, isLinkedInTokenValidAtom } from '@/lib/state/atoms'

export function LinkedInAuth() {
  const [auth, setAuth] = useAtom(linkedInAuthAtom)
  const [isValid] = useAtom(isLinkedInTokenValidAtom)
  
  const handleLogin = async () => {
    const { accessToken, expiresIn } = await initiateLinkedInOAuth()
    setAuth({
      isAuthenticated: true,
      accessToken,
      expiresAt: Date.now() + (expiresIn * 1000)
    })
  }
  
  return (
    <div>
      {isValid ? (
        <LinkedInMessaging />
      ) : (
        <button onClick={handleLogin}>Connect LinkedIn</button>
      )}
    </div>
  )
}
```

**Async Data with Suspense:**
```tsx
// components/LinkedInProfile.tsx
import { useAtomValue } from 'jotai'
import { Suspense } from 'react'
import { linkedInProfileAtom } from '@/lib/state/atoms'

function ProfileData() {
  const profile = useAtomValue(linkedInProfileAtom) // Suspends while loading
  
  return (
    <div>
      <img src={profile.profilePicture} alt={profile.name} />
      <h3>{profile.name}</h3>
      <p>{profile.headline}</p>
    </div>
  )
}

export function LinkedInProfile() {
  return (
    <Suspense fallback={<div>Loading profile...</div>}>
      <ProfileData />
    </Suspense>
  )
}
```

### Alternative: TanStack Store

**Note**: TanStack Store was considered but is still in early beta (v0.x). If it reaches stable status during implementation, it could be evaluated as it offers:
- Deep integration with TanStack Router
- Built-in persistence
- DevTools integration
- Similar API to Jotai

**Current Status**: TanStack Store is pre-1.0, so Jotai is the safer choice for production use.

### References
- [Jotai Official Documentation](https://jotai.org/)
- [Jotai vs Zustand vs Redux Comparison](https://blog.logrocket.com/jotai-vs-zustand-managing-state-react/)
- [TanStack Store Documentation](https://tanstack.com/store/latest)

---

## 3. LinkedIn Integration Strategy

### Decision
Implement **hybrid LinkedIn messaging approach**:
1. **Primary**: LinkedIn Messaging API with OAuth 2.0 (requires backend)
2. **Fallback**: LinkedIn Share API for pre-populated messages (client-side only)

### Rationale

**Why Hybrid Approach:**
1. **OAuth API** (Primary):
   - Enables direct in-app messaging
   - Stores conversation history
   - Professional user experience
   - Better analytics and tracking

2. **Share API** (Fallback):
   - No backend authentication required
   - Works for users without OAuth setup
   - Simpler implementation
   - Opens LinkedIn app/website with pre-filled message

**User Flow:**
```mermaid
graph TD
    A[User clicks Contact] --> B{OAuth Available?}
    B -->|Yes| C[Show OAuth Login]
    C --> D[Authenticate via LinkedIn]
    D --> E[Send Message via API]
    E --> F[Show Success + Store History]
    
    B -->|No| G[Use Share API]
    G --> H[Open LinkedIn with Pre-filled Message]
    H --> I[User completes on LinkedIn]
```

### Primary: LinkedIn Messaging API

**OAuth 2.0 Implementation:**

```typescript
// lib/linkedin/oauth.ts
interface LinkedInOAuthConfig {
  clientId: string
  clientSecret: string
  redirectUri: string
  scopes: ['w_member_social', 'r_basicprofile']
}

export async function initiateLinkedInAuth() {
  const authUrl = new URL('https://www.linkedin.com/oauth/v2/authorization')
  authUrl.searchParams.set('response_type', 'code')
  authUrl.searchParams.set('client_id', config.clientId)
  authUrl.searchParams.set('redirect_uri', config.redirectUri)
  authUrl.searchParams.set('scope', config.scopes.join(' '))
  
  window.location.href = authUrl.toString()
}
```

**Messaging API:**
```typescript
// lib/linkedin/messaging.ts
interface SendMessageParams {
  accessToken: string
  recipientId: string
  message: string
  subject?: string
}

export async function sendLinkedInMessage(params: SendMessageParams) {
  const response = await fetch('https://api.linkedin.com/v2/messages', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${params.accessToken}`,
      'Content-Type': 'application/json',
      'X-Restli-Protocol-Version': '2.0.0'
    },
    body: JSON.stringify({
      recipients: [params.recipientId],
      subject: params.subject,
      body: { text: params.message }
    })
  })
  
  return response.json()
}
```

### Fallback: LinkedIn Share API

**Implementation:**
```typescript
// lib/linkedin/share.ts
interface ShareParams {
  url: string
  title: string
  summary: string
}

export function openLinkedInShare(params: ShareParams) {
  const shareUrl = new URL('https://www.linkedin.com/sharing/share-offsite/')
  shareUrl.searchParams.set('url', params.url)
  shareUrl.searchParams.set('title', params.title)
  shareUrl.searchParams.set('summary', params.summary)
  
  window.open(shareUrl.toString(), '_blank', 'width=600,height=600')
}

// Pre-populate message for contact
export function openLinkedInMessage(message: string) {
  const linkedInUrl = `https://www.linkedin.com/messaging/compose?message=${encodeURIComponent(message)}`
  window.open(linkedInUrl, '_blank')
}
```

### Security Considerations

1. **OAuth Tokens**: Store securely in httpOnly cookies, never localStorage
2. **CSRF Protection**: Implement state parameter in OAuth flow
3. **Rate Limiting**: LinkedIn API has rate limits (100 requests/hour for messaging)
4. **Token Refresh**: Implement automatic token refresh before expiration
5. **Scope Minimization**: Request only required permissions

### Storage Strategy

```typescript
// Database schema for LinkedIn messages
interface LinkedInMessage {
  id: string
  userId: string
  recipientId: string
  subject: string
  message: string
  sentAt: Date
  status: 'sent' | 'delivered' | 'read' | 'failed'
  metadata: {
    conversationId?: string
    errorMessage?: string
  }
}
```

### References
- [LinkedIn OAuth 2.0 Documentation](https://learn.microsoft.com/en-us/linkedin/shared/authentication/authentication)
- [LinkedIn Messaging API](https://learn.microsoft.com/en-us/linkedin/consumer/integrations/self-serve/share-on-linkedin)
- [LinkedIn Share API Guide](https://www.linkedin.com/developers/apps)

---

## 3a. LinkedIn Blog Cross-Posting Strategy

### Decision
Use the **UGC Posts API (Share API)** for blog cross-posting, focusing on sharing a link to the canonical blog post with a title, a short excerpt (≤280 characters), and relevant hashtags.

### Rationale

1.  **API Simplification & Stability**: The UGC Posts API is a stable, well-documented endpoint for sharing content. The Articles API, which allows for publishing full native articles, has stricter access requirements and is more complex to implement. Focusing on the UGC Posts API is a more robust and achievable initial goal.

2.  **SEO & Canonical Source**: Driving traffic back to the portfolio website is a primary goal. Sharing a link to the blog post ensures the portfolio remains the canonical source, which is beneficial for SEO. Native articles on LinkedIn would create duplicate content, potentially harming search rankings.

3.  **User Experience**: A link share with a compelling preview is a common and effective pattern on LinkedIn. Users can click through to the full article, providing a better reading experience with custom styling, components, and code blocks that are not possible in LinkedIn's native article editor.

4.  **Content Ownership**: Keeping the full content on the personal blog ensures complete ownership and control over the material.

### Implementation Strategy

**API Endpoint**: `https://api.linkedin.com/v2/ugcPosts`

**Request Body Structure**:
```json
{
    "author": "urn:li:person:{personId}",
    "lifecycleState": "PUBLISHED",
    "specificContent": {
        "com.linkedin.ugc.ShareContent": {
            "shareCommentary": {
                "text": "New blog post: {Blog Post Title} - {Excerpt, max 280 chars} #hashtag1 #hashtag2"
            },
            "shareMediaCategory": "ARTICLE",
            "media": [
                {
                    "status": "READY",
                    "description": {
                        "text": "{Blog post meta description}"
                    },
                    "originalUrl": "{Canonical URL of the blog post}",
                    "title": {
                        "text": "{Blog Post Title}"
                    }
                }
            ]
        }
    },
    "visibility": {
        "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"
    }
}
```

**Fallback/Error Handling**:

*   If the API call fails, the system should log the error and queue the post for a retry (e.g., in a Netlify KV store).
*   A manual "Share on LinkedIn" button will be available in the blog admin interface as a fallback, which will open a `linkedin.com/sharing/share-offsite/` URL with pre-populated content.

### Alternatives Considered

| Option | Pros | Cons | Decision |
| :--- | :--- | :--- | :--- |
| **Articles API** | Publishes full native articles on LinkedIn. | Stricter API access, complex implementation, creates duplicate content. | Rejected: Overly complex for initial implementation and negative SEO impact. |
| **Manual Sharing** | No API integration needed. | Inefficient, error-prone, doesn't showcase automation skills. | Rejected: Fails to meet the project's goal of demonstrating technical capabilities. |
| **UGC Posts API (Link Share)** | Drives traffic to the canonical source, simpler API, good for SEO. | Doesn't provide the full reading experience directly on LinkedIn. | **SELECTED**: Aligns with project goals of demonstrating skill while maintaining content ownership and SEO. |

### References

*   [Official UGC Posts API Documentation](https://learn.microsoft.com/en-us/linkedin/consumer/integrations/self-serve/share-on-linkedin#create-a-share-on-linkedin)
*   [Postman Collection for LinkedIn APIs](https://www.postman.com/linkedin-developer-apis/linkedin-marketing-solutions-versioned-apis)

---

## 3. Internationalization (i18n): react-i18next

### Decision
Use **react-i18next** with SSR support for bilingual English/Spanish portfolio.

### Rationale

1. **SSR/SSG Compatible**: Works seamlessly with server-side rendering
2. **Path-Based Routing**: SEO-friendly language routes (/en/about, /es/about)
3. **Performance**: Load only required language bundles
4. **Developer Experience**: TypeScript support, powerful interpolation
5. **Ecosystem**: Large community, extensive plugins

**Key Features:**
- Server-side translation loading
- Language detection (navigator, path, cookie)
- Namespace organization for code splitting
- Format-js integration for dates/numbers/currency

### Implementation Strategy

**Configuration:**
```typescript
// lib/i18n/config.ts
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import Backend from 'i18next-fs-backend'
import { resolve } from 'path'

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    supportedLngs: ['en', 'es'],
    defaultNS: 'common',
    ns: ['common', 'projects', 'blog', 'resume'],
    
    backend: {
      loadPath: resolve('./public/locales/{{lng}}/{{ns}}.json')
    },
    
    interpolation: {
      escapeValue: false // React already escapes
    },
    
    detection: {
      order: ['path', 'cookie', 'navigator'],
      caches: ['cookie'],
      cookieName: 'i18next'
    }
  })

export default i18n
```

**SSR Integration:**
```typescript
// app/entry-server.tsx
import { I18nextProvider } from 'react-i18next'
import i18n from './lib/i18n/config'

export async function render(url: string) {
  const language = url.startsWith('/es') ? 'es' : 'en'
  
  await i18n.changeLanguage(language)
  
  // Load translations server-side
  const initialI18nStore = {
    [language]: i18n.store.data[language]
  }
  
  return {
    html: renderToString(
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    ),
    initialI18nStore,
    initialLanguage: language
  }
}
```

**Client Hydration:**
```typescript
// app/entry-client.tsx
import { useSSR } from 'react-i18next'

function App({ initialI18nStore, initialLanguage }) {
  useSSR(initialI18nStore, initialLanguage)
  
  return <Router />
}
```

**Routing Structure:**
```typescript
// app/routes/__root.tsx
import { createRootRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

export const Route = createRootRoute({
  beforeLoad: ({ location }) => {
    const lang = location.pathname.startsWith('/es') ? 'es' : 'en'
    i18n.changeLanguage(lang)
  }
})

// Language switcher component
function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const currentLang = i18n.language
  
  return (
    <select 
      value={currentLang}
      onChange={(e) => {
        const newLang = e.target.value
        const newPath = location.pathname.replace(`/${currentLang}/`, `/${newLang}/`)
        navigate(newPath)
      }}
    >
      <option value="en">English</option>
      <option value="es">Español</option>
    </select>
  )
}
```

**Translation File Structure:**
```
public/
└── locales/
    ├── en/
    │   ├── common.json       # Nav, footer, buttons
    │   ├── projects.json     # Project descriptions
    │   ├── blog.json         # Blog content
    │   └── resume.json       # Work experience, skills
    └── es/
        ├── common.json
        ├── projects.json
        ├── blog.json
        └── resume.json
```

**Usage Example:**
```tsx
import { useTranslation } from 'react-i18next'

function ProjectCard({ project }) {
  const { t } = useTranslation('projects')
  
  return (
    <div>
      <h3>{t('project.title', { name: project.name })}</h3>
      <p>{t('project.description', { 
        count: project.features.length,
        defaultValue: project.description 
      })}</p>
      <time>{t('project.date', { 
        date: new Date(project.completedAt),
        formatParams: { date: { year: 'numeric', month: 'long' } }
      })}</time>
    </div>
  )
}
```

### SEO Considerations

```tsx
// components/SeoHead.tsx
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'

function SeoHead({ titleKey, descriptionKey }) {
  const { t, i18n } = useTranslation()
  const currentLang = i18n.language
  const alternateUrl = currentLang === 'en' ? '/es' : '/en'
  
  return (
    <Helmet>
      <html lang={currentLang} />
      <title>{t(titleKey)}</title>
      <meta name="description" content={t(descriptionKey)} />
      
      {/* Alternate language links for SEO */}
      <link 
        rel="alternate" 
        hrefLang={currentLang === 'en' ? 'es' : 'en'}
        href={`${window.location.origin}${alternateUrl}`}
      />
      <link 
        rel="alternate" 
        hrefLang="x-default"
        href={`${window.location.origin}/en`}
      />
    </Helmet>
  )
}
```

### References
- [react-i18next SSR Documentation](https://react.i18next.com/latest/ssr)
- [i18next Official Docs](https://www.i18next.com/)
- [Path-based i18n with Next.js (applicable pattern)](https://devcodelight.com/en/adding-path-based-internationalization-with-i18next-in-react-and-next-js-server-side-ssr/)

---

## 4. Code Quality: oxlint + Prettier

### Decision
Use **oxlint** (Rust-based linter) with **Prettier** for code quality and formatting.

### Rationale

**oxlint Performance Benefits:**
- **50-100x faster** than ESLint (Rust vs JavaScript)
- Instant feedback in IDE (< 10ms lint time)
- Catches common errors and anti-patterns
- TypeScript-native understanding
- Zero configuration required

**Prettier Compatibility:**
- Separate concerns: linting (oxlint) vs formatting (Prettier)
- No rule conflicts (oxlint focuses on logic, Prettier on style)
- Industry standard for code formatting
- Automatic code formatting on save

### Implementation

**Package Installation:**
```json
{
  "devDependencies": {
    "oxlint": "^0.10.0",
    "prettier": "^3.3.0",
    "@typescript-eslint/parser": "^7.0.0"
  }
}
```

**Configuration:**

```json
// .oxlintrc.json
{
  "rules": {
    "no-console": "warn",
    "no-debugger": "error",
    "no-unused-vars": "error",
    "prefer-const": "warn"
  },
  "env": {
    "browser": true,
    "es2024": true,
    "node": true
  }
}
```

```json
// .prettierrc
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 80,
  "arrowParens": "avoid"
}
```

**Scripts:**
```json
{
  "scripts": {
    "lint": "oxlint",
    "lint:fix": "oxlint --fix",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "check": "npm run lint && npm run format:check",
    "pre-commit": "npm run check"
  }
}
```

**CI/CD Integration:**
```yaml
# .github/workflows/quality.yml
name: Code Quality
on: [push, pull_request]

jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npm run lint
      - run: npm run format:check
      - run: npm run type-check
```

### Alternatives Considered

| Tool | Pros | Cons | Why Rejected |
|------|------|------|--------------|
| **ESLint** | Mature, extensive plugins | Slow (JavaScript-based), complex config | Performance concerns for large projects |
| **Biome** | Fast (Rust), all-in-one | Young ecosystem, fewer rules | Less mature than oxlint |
| **Standard JS** | Zero config | Opinionated, no customization | Too restrictive for team preferences |

### References
- [oxlint Official Documentation](https://oxc.rs/)
- [Prettier Official Docs](https://prettier.io/)
- [Why Rust-based tooling is the future](https://news.ycombinator.com/item?id=38466577)

---

## 5. Testing Strategy: Vitest + RTL + Playwright

### Decision
Implement **three-tier testing strategy**:
1. **Unit/Integration**: Vitest + React Testing Library
2. **Component**: Vitest Browser Mode + Playwright
3. **E2E**: Playwright

### Rationale

**Vitest Advantages:**
- Native Vite integration (same config, instant HMR)
- Jest-compatible API (easy migration)
- 10x faster than Jest
- Built-in TypeScript support
- Browser mode for real DOM testing

**React Testing Library:**
- User-centric testing (test behavior, not implementation)
- Excellent accessibility testing
- Encourages best practices
- Industry standard

**Playwright:**
- Cross-browser testing (Chromium, Firefox, WebKit)
- Auto-wait for elements (no flaky tests)
- Parallel execution
- Visual regression testing
- Network mocking

### Implementation

**Vitest Configuration:**
```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./test/setup.ts'],
    globals: true,
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'test/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/dist/**'
      ]
    }
  }
})
```

**Test Setup:**
```typescript
// test/setup.ts
import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, vi } from 'vitest'

// Cleanup after each test
afterEach(() => {
  cleanup()
})

// Mock environment variables
vi.mock('import.meta.env', () => ({
  VITE_API_URL: 'http://localhost:3000',
  VITE_LINKEDIN_CLIENT_ID: 'test-client-id'
}))
```

**Unit Test Example:**
```typescript
// components/ProjectCard.test.tsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ProjectCard } from './ProjectCard'

describe('ProjectCard', () => {
  it('renders project information correctly', () => {
    const project = {
      title: 'Modern Portfolio',
      description: 'A stunning portfolio website',
      technologies: ['React', 'TypeScript']
    }
    
    render(<ProjectCard project={project} />)
    
    expect(screen.getByRole('heading', { name: /modern portfolio/i }))
      .toBeInTheDocument()
    expect(screen.getByText(/stunning portfolio/i)).toBeInTheDocument()
  })
  
  it('displays all technologies as badges', () => {
    const project = {
      title: 'Test Project',
      technologies: ['React', 'TypeScript', 'Tailwind']
    }
    
    render(<ProjectCard project={project} />)
    
    project.technologies.forEach(tech => {
      expect(screen.getByText(tech)).toBeInTheDocument()
    })
  })
})
```

**Playwright E2E Test:**
```typescript
// e2e/contact.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Contact via LinkedIn', () => {
  test('opens LinkedIn messaging with pre-filled message', async ({ page, context }) => {
    await page.goto('/')
    
    // Click contact button
    await page.getByRole('button', { name: /contact me/i }).click()
    
    // Wait for modal
    await expect(page.getByRole('dialog')).toBeVisible()
    
    // Enter message
    await page.getByLabel(/your message/i).fill('Hello! I would like to discuss...')
    
    // Mock LinkedIn auth popup
    const [popup] = await Promise.all([
      context.waitForEvent('page'),
      page.getByRole('button', { name: /send via linkedin/i }).click()
    ])
    
    // Verify LinkedIn URL
    expect(popup.url()).toContain('linkedin.com')
    
    await popup.close()
  })
  
  test('validates required fields', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: /contact me/i }).click()
    
    // Try to submit empty form
    await page.getByRole('button', { name: /send/i }).click()
    
    // Check for validation errors
    await expect(page.getByText(/message is required/i)).toBeVisible()
  })
})
```

**Test Scripts:**
```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest run --coverage",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:e2e:debug": "playwright test --debug"
  }
}
```

### Coverage Requirements

- **Unit Tests**: ≥80% coverage for utilities, hooks, components
- **Integration Tests**: Critical user flows (navigation, i18n switching)
- **E2E Tests**: Happy paths and error scenarios for contact flow

### References
- [Vitest Official Documentation](https://vitest.dev/)
- [React Testing Library Best Practices](https://testing-library.com/docs/react-testing-library/intro/)
- [Playwright Documentation](https://playwright.dev/)
- [Unit Testing React with Vitest (MakePath, 2024)](https://makepath.com/unit-testing-a-react-application-with-vitest-msw-and-playwright/)
- [Mastering Unit Testing in React (Medium, 2024)](https://medium.com/@victorrillo/mastering-unit-testing-in-react-best-practices-for-efficient-tests)

---

## 6. Deployment & Infrastructure: Netlify

### Decision
Deploy on **Netlify** with Edge Functions for API caching and server-side operations.

### Rationale

1. **Zero Configuration**: Git-based deployment out of the box
2. **Edge Functions**: Run server code globally distributed (deno runtime)
3. **Cache API**: Netlify's caching primitives for API responses
4. **Instant Rollbacks**: One-click deployment history
5. **Analytics**: Built-in performance and visitor analytics
6. **CDN**: Global content delivery network included
7. **Cost**: Free tier sufficient for portfolio site

### Implementation

**Netlify Configuration:**
```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = "dist"
  functions = "netlify/functions"

[build.environment]
  NODE_VERSION = "20"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Permissions-Policy = "camera=(), microphone=(), geolocation=()"

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

**Edge Function for LinkedIn Caching:**
```typescript
// netlify/edge-functions/linkedin-profile.ts
import type { Context } from "@netlify/edge-functions"

const CACHE_TTL = 3600 // 1 hour

export default async (request: Request, context: Context) => {
  const cache = await caches.open('linkedin-api')
  const cacheKey = new Request(request.url)
  
  // Check cache first
  const cached = await cache.match(cacheKey)
  if (cached) {
    return new Response(cached.body, {
      status: 200,
      headers: {
        ...cached.headers,
        'X-Cache': 'HIT',
        'Cache-Control': `public, max-age=${CACHE_TTL}`
      }
    })
  }
  
  // Fetch from LinkedIn API
  const response = await fetch('https://api.linkedin.com/v2/me', {
    headers: {
      'Authorization': `Bearer ${Netlify.env.get('LINKEDIN_ACCESS_TOKEN')}`
    }
  })
  
  if (response.ok) {
    // Cache the response
    await cache.put(cacheKey, response.clone())
  }
  
  return new Response(response.body, {
    status: response.status,
    headers: {
      ...response.headers,
      'X-Cache': 'MISS',
      'Cache-Control': `public, max-age=${CACHE_TTL}`
    }
  })
}

export const config = {
  path: "/api/linkedin/profile"
}
```

**Environment Variables:**
```bash
# .env.production
VITE_API_URL=https://yoursite.netlify.app
VITE_LINKEDIN_CLIENT_ID=your_client_id
LINKEDIN_CLIENT_SECRET=your_secret # Only in Netlify env
```

**Build Optimization:**
```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'router': ['@tanstack/react-router'],
          'i18n': ['react-i18next', 'i18next'],
          'ui': ['framer-motion']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
})
```

### Cache Strategy

**Static Assets**: Immutable, 1 year cache  
**API Responses**: 1 hour cache with stale-while-revalidate  
**HTML Pages**: SSR on-demand, 5 minute cache  
**Images**: CDN edge cache, WebP conversion

### Monitoring

```typescript
// lib/monitoring/performance.ts
export function reportWebVitals(metric: Metric) {
  // Send to Netlify Analytics
  if (window.netlifyIdentity) {
    fetch('/.netlify/functions/analytics', {
      method: 'POST',
      body: JSON.stringify({
        name: metric.name,
        value: metric.value,
        id: metric.id,
        rating: metric.rating
      })
    })
  }
}

// Usage in app
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals'

getCLS(reportWebVitals)
getFID(reportWebVitals)
getFCP(reportWebVitals)
getLCP(reportWebVitals)
getTTFB(reportWebVitals)
```

### References
- [Netlify Edge Functions Documentation](https://docs.netlify.com/edge-functions/overview/)
- [Netlify Cache API](https://docs.netlify.com/build/caching/cache-api/)
- [Cache Tags and Purge API](https://github.com/netlify-labs/cache-tags-and-purge-api)

---

## 7. Content Management: MDX

### Decision
Use **MDX** (Markdown + JSX) for blog posts and case study content.

### Rationale

1. **Component Integration**: Embed React components in Markdown
2. **Type Safety**: TypeScript support for frontmatter
3. **Flexibility**: Custom components for code blocks, callouts, diagrams
4. **SEO**: Static generation with full metadata control
5. **Developer Experience**: Write content in familiar Markdown syntax

### Implementation

**Vite Plugin Configuration:**
```typescript
// vite.config.ts
import mdx from '@mdx-js/rollup'
import remarkGfm from 'remark-gfm'
import remarkFrontmatter from 'remark-frontmatter'
import rehypeHighlight from 'rehype-highlight'

export default defineConfig({
  plugins: [
    mdx({
      remarkPlugins: [remarkGfm, remarkFrontmatter],
      rehypePlugins: [rehypeHighlight],
      providerImportSource: '@mdx-js/react'
    })
  ]
})
```

**MDX Components:**
```tsx
// components/mdx/MDXComponents.tsx
import { MDXProvider } from '@mdx-js/react'
import { CodeBlock } from './CodeBlock'
import { Callout } from './Callout'
import { ImageWithCaption } from './ImageWithCaption'

const components = {
  code: CodeBlock,
  Callout,
  Image: ImageWithCaption,
  // Override default elements
  h1: (props) => <h1 className="text-4xl font-bold mb-4" {...props} />,
  h2: (props) => <h2 className="text-3xl font-semibold mt-8 mb-3" {...props} />,
  p: (props) => <p className="mb-4 leading-relaxed" {...props} />,
  a: (props) => <a className="text-blue-600 hover:underline" {...props} />
}

export function MDXProvider({ children }) {
  return <MDXProvider components={components}>{children}</MDXProvider>
}
```

**Blog Post Example:**
```mdx
---
title: Building a Modern Portfolio with TanStack Start
date: 2025-11-03
author: Your Name
tags: [react, typescript, tanstack]
excerpt: Learn how I built a blazing-fast portfolio website using the latest React tools
---

import { Callout } from '@/components/mdx/Callout'
import { CodeComparison } from '@/components/mdx/CodeComparison'

# Building a Modern Portfolio with TanStack Start

<Callout type="info">
  This post covers the architectural decisions behind my portfolio rebuild.
</Callout>

## Why TanStack Start?

I chose TanStack Start for several reasons:

1. **Performance**: SSR with streaming
2. **Type Safety**: End-to-end TypeScript
3. **Developer Experience**: File-based routing

<CodeComparison 
  before={`// Old approach with separate API\nfetch('/api/projects')`}
  after={`// TanStack Start server function\nimport { getProjects } from '@/server/projects'`}
/>

## Conclusion

The results speak for themselves: 95+ Lighthouse scores across the board.
```

**Frontmatter Type Safety:**
```typescript
// types/mdx.ts
export interface BlogPostFrontmatter {
  title: string
  date: string
  author: string
  tags: string[]
  excerpt: string
  coverImage?: string
  published?: boolean
}

// Auto-generated types from MDX files
declare module '*.mdx' {
  import type { MDXProps } from 'mdx/types'
  export const frontmatter: BlogPostFrontmatter
  export default function MDXContent(props: MDXProps): JSX.Element
}
```

**Loading MDX Files:**
```typescript
// lib/mdx/loader.ts
export async function getBlogPosts() {
  const modules = import.meta.glob<{ frontmatter: BlogPostFrontmatter }>(
    '/content/blog/*.mdx',
    { eager: true }
  )
  
  return Object.entries(modules)
    .map(([path, module]) => ({
      slug: path.replace('/content/blog/', '').replace('.mdx', ''),
      ...module.frontmatter
    }))
    .filter(post => post.published !== false)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}
```

### References
- [MDX Official Documentation](https://mdxjs.com/)
- [Vite MDX Plugin](https://github.com/mdx-js/mdx/tree/main/packages/rollup)
- [Remark/Rehype Plugins](https://github.com/remarkjs/remark/blob/main/doc/plugins.md)

---

## 8. Performance Monitoring: Sentry

### Decision
Use **Sentry** for error tracking and performance monitoring.

### Rationale

1. **Error Tracking**: Automatic error capture with stack traces
2. **Performance**: Transaction monitoring and bottleneck identification
3. **Release Tracking**: Associate errors with deployments
4. **User Context**: Track errors by user, session, environment
5. **Source Maps**: Readable production error traces
6. **Free Tier**: Generous limits for personal portfolio

### Implementation

```typescript
// lib/monitoring/sentry.ts
import * as Sentry from '@sentry/react'
import { useEffect } from 'react'
import { createBrowserRouter, useLocation, useNavigationType } from 'react-router-dom'

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.MODE,
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration({
      maskAllText: true,
      blockAllMedia: true
    })
  ],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  beforeSend(event) {
    // Filter out dev errors
    if (import.meta.env.DEV) return null
    return event
  }
})

// React Router integration
export function useSentryRouterInstrumentation() {
  const location = useLocation()
  const navigationType = useNavigationType()
  
  useEffect(() => {
    Sentry.getCurrentScope().setContext('router', {
      location: location.pathname,
      navigationType
    })
  }, [location, navigationType])
}
```

**Error Boundary:**
```tsx
// components/ErrorBoundary.tsx
import { ErrorBoundary as SentryErrorBoundary } from '@sentry/react'

export function ErrorBoundary({ children }) {
  return (
    <SentryErrorBoundary
      fallback={({ error, resetError }) => (
        <div className="error-page">
          <h1>Something went wrong</h1>
          <p>{error.message}</p>
          <button onClick={resetError}>Try again</button>
        </div>
      )}
      showDialog
      beforeCapture={(scope) => {
        scope.setTag('error-boundary', true)
      }}
    >
      {children}
    </SentryErrorBoundary>
  )
}
```

### References
- [Sentry React Documentation](https://docs.sentry.io/platforms/javascript/guides/react/)
- [Performance Monitoring Guide](https://docs.sentry.io/product/performance/)

---

## 9. Accessibility Standards

### Decision
Implement **WCAG 2.1 AA** compliance with keyboard navigation and screen reader support.

### Implementation Checklist

- [ ] Semantic HTML5 elements
- [ ] ARIA labels where needed
- [ ] Keyboard navigation (Tab, Enter, Esc)
- [ ] Focus management and visible indicators
- [ ] Color contrast ≥ 4.5:1 for normal text
- [ ] Alt text for images
- [ ] Skip to main content link
- [ ] Respect prefers-reduced-motion
- [ ] Form labels and error messages
- [ ] Landmark regions (header, nav, main, footer)

**Implementation:**
```tsx
// components/SkipToContent.tsx
export function SkipToContent() {
  return (
    <a 
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
    >
      Skip to main content
    </a>
  )
}

// hooks/usePreferReducedMotion.ts
export function usePreferReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    
    const handler = () => setPrefersReducedMotion(mediaQuery.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])
  
  return prefersReducedMotion
}

// Usage with Framer Motion
function AnimatedComponent() {
  const prefersReducedMotion = usePreferReducedMotion()
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
    />
  )
}
```

### References
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [React Accessibility Guide](https://react.dev/learn/accessibility)

---

## Summary of All Decisions

| Area | Decision | Rationale | Alternatives Rejected |
|------|----------|-----------|----------------------|
| **Framework** | TanStack Start | Modern SSR, type-safe, performant | Next.js (too opinionated), Remix (smaller ecosystem) |
| **Contact** | LinkedIn Messaging API + Share API fallback | OAuth for full experience, Share API for simplicity | Traditional form (outdated), email links (poor UX) |
| **i18n** | react-i18next | SSR support, path-based routing, established | react-intl (complex setup), next-i18next (Next.js only) |
| **Linting** | oxlint + Prettier | 50-100x faster, modern tooling | ESLint (slow), Biome (immature) |
| **Testing** | Vitest + RTL + Playwright | Vite-native, fast, comprehensive | Jest (slower), Cypress (heavier) |
| **Deployment** | Netlify | Zero config, Edge Functions, Cache API | Vercel (vendor lock-in), AWS (complexity) |
| **Content** | MDX | Component integration, flexibility | Pure Markdown (limited), CMS (overkill) |
| **Monitoring** | Sentry | Error tracking, performance insights | LogRocket (expensive), custom solution (time-consuming) |

---

## Constitutional Compliance

✅ **Test-First Development**: Vitest + Playwright setup ready  
✅ **Library-First Approach**: Using established libraries (react-i18next, Framer Motion)  
✅ **Performance Focus**: SSR, caching, bundle optimization  
✅ **Accessibility**: WCAG 2.1 AA compliance planned  
✅ **Type Safety**: TypeScript throughout, strict mode enabled  
✅ **Modern Tooling**: Rust-based linter, latest framework versions  
✅ **Progressive Enhancement**: Works without JavaScript (SSR)  

---

## Next Steps

1. Generate API contracts in `/contracts/` directory
2. Create `data-model.md` with detailed entity schemas
3. Write `quickstart.md` implementation guide
4. Update `AGENTS.md` via `update-agent-context.sh`
5. Validate all artifacts against constitutional principles

---

**Research Completed**: 2025-11-03  
**Total External References**: 25+  
**Constitutional Compliance**: ✅ Verified
