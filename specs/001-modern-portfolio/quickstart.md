# Modern Portfolio - Implementation Quickstart Guide

**Feature ID**: 001-modern-portfolio  
**Version**: 1.0.0  
**Last Updated**: 2025-11-03  
**Status**: Planning Phase Complete

---

## 📋 Overview

This quickstart guide provides step-by-step implementation guidance for building the Modern Portfolio website using a hybrid Astro + TanStack Start architecture.

### Architecture Summary

- **Main Site**: Astro (static portfolio pages)
- **Blog**: TanStack Start (dynamic blog with SSR)
- **Deployment**: Netlify (static) + SST v3 (blog on AWS)
- **Integration**: LinkedIn OAuth Messaging API

---

## 🎯 Prerequisites

### Required Knowledge

- TypeScript fundamentals
- React 18+ (JSX, hooks, components)
- Modern CSS (Tailwind CSS utility classes)
- Git workflow and branching
- Basic understanding of SSR vs SSG

### Development Environment

```bash
# Node.js LTS (v20+)
node --version  # Should be v20.x or higher

# Package manager
npm --version   # npm 10+ or pnpm 8+

# Git
git --version   # 2.x+
```

### Required Accounts

1. **LinkedIn Developer Account** - For OAuth API access
2. **Netlify Account** - For static site deployment
3. **AWS Account** (optional) - For SST v3 blog deployment
4. **Sentry Account** - For error monitoring

---

## 🚀 Quick Start

### 1. Project Initialization

```bash
# Clone the repository
git clone <repository-url>
cd portfolio

# Checkout the feature branch
git checkout 001-modern-portfolio

# Install dependencies (from project root)
npm install
```

### 2. Environment Setup

Create environment files for both Astro and TanStack Start:

**`.env` (Astro - root directory)**
```env
# LinkedIn OAuth Configuration
PUBLIC_LINKEDIN_CLIENT_ID=your_client_id_here
LINKEDIN_CLIENT_SECRET=your_client_secret_here
PUBLIC_LINKEDIN_REDIRECT_URI=http://localhost:4321/api/auth/linkedin/callback

# Sentry Configuration
PUBLIC_SENTRY_DSN=your_sentry_dsn_here
SENTRY_AUTH_TOKEN=your_sentry_auth_token_here

# Feature Flags
PUBLIC_ENABLE_LINKEDIN_OAUTH=true
PUBLIC_ENABLE_BLOG_COMMENTS=false
```

**`blog/.env` (TanStack Start - blog directory)**
```env
# Server Configuration
NODE_ENV=development
PORT=3000

# LinkedIn OAuth (if needed for blog)
LINKEDIN_CLIENT_ID=your_client_id_here
LINKEDIN_CLIENT_SECRET=your_client_secret_here

# Database (if implementing comments)
DATABASE_URL=your_database_url_here

# Sentry
SENTRY_DSN=your_sentry_dsn_here
```

### 3. Development Workflow

```bash
# Terminal 1: Run Astro dev server (main portfolio)
npm run dev

# Terminal 2: Run TanStack Start dev server (blog)
cd blog
npm run dev

# Access the sites:
# Main portfolio: http://localhost:4321
# Blog: http://localhost:3000
```

---

## 📁 Project Structure

```
portfolio/
├── src/                          # Astro source code
│   ├── components/              # React components for Astro
│   │   ├── Hero.tsx            # Landing hero section
│   │   ├── Projects.tsx        # Projects showcase
│   │   ├── Skills.tsx          # Skills matrix
│   │   ├── Contact.tsx         # LinkedIn integration
│   │   └── LanguageSwitcher.tsx # i18n selector
│   ├── layouts/                 # Page layouts
│   │   └── MainLayout.astro    # Base layout with header/footer
│   ├── pages/                   # Astro pages (file-based routing)
│   │   ├── index.astro         # Homepage
│   │   ├── projects.astro      # Projects page
│   │   ├── about.astro         # About page
│   │   └── api/                # API routes (Netlify Functions)
│   │       └── auth/
│   │           └── linkedin/
│   │               ├── authorize.ts    # Initiate OAuth flow
│   │               └── callback.ts     # Handle OAuth callback
│   ├── content/                 # MDX content (Astro Content Collections)
│   │   ├── config.ts           # Content collection schemas
│   │   └── projects/           # Project markdown files
│   │       ├── project-1.mdx
│   │       └── project-2.mdx
│   ├── i18n/                    # Internationalization
│   │   ├── config.ts           # i18next configuration
│   │   └── locales/            # Translation files
│   │       ├── en.json
│   │       └── es.json
│   └── styles/                  # Global styles
│       └── global.css          # Tailwind imports + custom CSS
├── blog/                         # TanStack Start application
│   ├── app/                     # Application source
│   │   ├── routes/             # TanStack Router routes
│   │   │   ├── __root.tsx      # Root layout
│   │   │   ├── index.tsx       # Blog home
│   │   │   └── posts/
│   │   │       └── $slug.tsx   # Dynamic blog post page
│   │   ├── components/         # Blog-specific components
│   │   │   ├── PostCard.tsx
│   │   │   ├── CommentForm.tsx
│   │   │   └── Sidebar.tsx
│   │   ├── server/             # Server functions
│   │   │   ├── posts.ts        # Post data fetching
│   │   │   └── comments.ts     # Comment handling
│   │   └── content/            # Blog post MDX files
│   │       └── posts/
│   │           ├── post-1.mdx
│   │           └── post-2.mdx
│   └── public/                 # Static assets
├── public/                       # Astro static assets
│   ├── images/
│   └── resume.pdf
├── specs/                        # Feature specifications
│   └── 001-modern-portfolio/
│       ├── spec.md             # Feature specification
│       ├── plan.md             # Implementation plan
│       ├── research.md         # Technical decisions
│       ├── data-model.md       # Data structures
│       ├── quickstart.md       # This file
│       └── contracts/          # API contracts
│           ├── api-contracts.md
│           ├── openapi.json
│           └── openapi.yaml
└── astro.config.mjs             # Astro configuration
```

---

## 🔧 Implementation Phases

### Phase 1: Core Astro Setup (Week 1)

**Goal**: Establish the main portfolio structure with Astro

#### Tasks

1. **Initialize Astro Project**
   ```bash
   # Already done, verify configuration
   cat astro.config.mjs
   ```

2. **Configure Integrations**
   
   Update `astro.config.mjs`:
   ```typescript
   import { defineConfig } from 'astro/config';
   import react from '@astrojs/react';
   import tailwind from '@astrojs/tailwind';
   import mdx from '@astrojs/mdx';
   import netlify from '@astrojs/netlify';

   export default defineConfig({
     output: 'hybrid', // SSG with opt-in SSR
     adapter: netlify(),
     integrations: [
       react(),
       tailwind(),
       mdx(),
     ],
     i18n: {
       defaultLocale: 'en',
       locales: ['en', 'es'],
       routing: {
         prefixDefaultLocale: false,
       },
     },
   });
   ```

3. **Create Base Layout**
   
   File: `src/layouts/MainLayout.astro`
   ```astro
   ---
   import { ViewTransitions } from 'astro:transitions';
   import '../styles/global.css';

   interface Props {
     title: string;
     description?: string;
   }

   const { title, description } = Astro.props;
   ---

   <!DOCTYPE html>
   <html lang={Astro.currentLocale || 'en'}>
     <head>
       <meta charset="UTF-8" />
       <meta name="viewport" content="width=device-width" />
       <title>{title}</title>
       {description && <meta name="description" content={description} />}
       <ViewTransitions />
     </head>
     <body class="min-h-screen bg-white dark:bg-gray-900">
       <slot />
     </body>
   </html>
   ```

4. **Set Up Internationalization**
   
   File: `src/i18n/config.ts`
   ```typescript
   import i18n from 'i18next';
   import { initReactI18next } from 'react-i18next';
   import en from './locales/en.json';
   import es from './locales/es.json';

   i18n
     .use(initReactI18next)
     .init({
       resources: {
         en: { translation: en },
         es: { translation: es },
       },
       lng: 'en',
       fallbackLng: 'en',
       interpolation: {
         escapeValue: false,
       },
     });

   export default i18n;
   ```

5. **Create Translation Files**
   
   File: `src/i18n/locales/en.json`
   ```json
   {
     "nav": {
       "home": "Home",
       "projects": "Projects",
       "about": "About",
       "contact": "Contact"
     },
     "hero": {
       "title": "Full-Stack Developer",
       "subtitle": "Building modern web experiences"
     }
   }
   ```

#### Validation Checklist

- [ ] Astro dev server runs without errors
- [ ] View transitions work between pages
- [ ] Dark mode toggle functions correctly
- [ ] Language switcher changes UI text
- [ ] Tailwind utilities compile properly

---

### Phase 2: React Components (Week 1-2)

**Goal**: Build reusable React components for Astro islands

#### Key Components

1. **Hero Component**
   
   File: `src/components/Hero.tsx`
   ```typescript
   import { useTranslation } from 'react-i18next';
   import { motion } from 'framer-motion';

   export function Hero() {
     const { t } = useTranslation();

     return (
       <motion.section
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.6 }}
         className="min-h-screen flex items-center justify-center"
       >
         <div className="text-center">
           <h1 className="text-5xl font-bold mb-4">
             {t('hero.title')}
           </h1>
           <p className="text-xl text-gray-600 dark:text-gray-400">
             {t('hero.subtitle')}
           </p>
         </div>
       </motion.section>
     );
   }
   ```

2. **Projects Showcase**
   
   File: `src/components/Projects.tsx`
   ```typescript
   import { motion } from 'framer-motion';
   import type { CollectionEntry } from 'astro:content';

   interface Props {
     projects: CollectionEntry<'projects'>[];
   }

   export function Projects({ projects }: Props) {
     return (
       <section className="py-16">
         <h2 className="text-4xl font-bold mb-8">Featured Projects</h2>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {projects.map((project, index) => (
             <motion.article
               key={project.slug}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: index * 0.1 }}
               className="border rounded-lg p-6 hover:shadow-lg transition-shadow"
             >
               <h3 className="text-2xl font-semibold mb-2">
                 {project.data.title}
               </h3>
               <p className="text-gray-600 dark:text-gray-400 mb-4">
                 {project.data.description}
               </p>
               <div className="flex flex-wrap gap-2">
                 {project.data.technologies.map((tech) => (
                   <span
                     key={tech}
                     className="px-3 py-1 bg-blue-100 dark:bg-blue-900 rounded-full text-sm"
                   >
                     {tech}
                   </span>
                 ))}
               </div>
             </motion.article>
           ))}
         </div>
       </section>
     );
   }
   ```

3. **Contact with LinkedIn Integration**
   
   File: `src/components/Contact.tsx`
   ```typescript
   import { useState } from 'react';
   import { useTranslation } from 'react-i18next';

   export function Contact() {
     const { t } = useTranslation();
     const [isAuthorizing, setIsAuthorizing] = useState(false);

     const handleLinkedInAuth = async () => {
       setIsAuthorizing(true);
       try {
         // Initiate OAuth flow
         window.location.href = '/api/auth/linkedin/authorize';
       } catch (error) {
         console.error('LinkedIn auth error:', error);
         setIsAuthorizing(false);
       }
     };

     return (
       <section className="py-16">
         <h2 className="text-4xl font-bold mb-8">{t('contact.title')}</h2>
         <div className="max-w-md mx-auto">
           <button
             onClick={handleLinkedInAuth}
             disabled={isAuthorizing}
             className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
           >
             {isAuthorizing ? t('contact.connecting') : t('contact.linkedin')}
           </button>
         </div>
       </section>
     );
   }
   ```

#### Integration in Astro Pages

File: `src/pages/index.astro`
```astro
---
import MainLayout from '../layouts/MainLayout.astro';
import { Hero } from '../components/Hero';
import { Projects } from '../components/Projects';
import { Contact } from '../components/Contact';
import { getCollection } from 'astro:content';

const projects = await getCollection('projects');
---

<MainLayout title="Portfolio - Home">
  <Hero client:load />
  <Projects projects={projects} client:visible />
  <Contact client:visible />
</MainLayout>
```

#### Validation Checklist

- [ ] All components render without hydration errors
- [ ] Framer Motion animations work smoothly
- [ ] i18n translations load correctly
- [ ] Client directives (client:load, client:visible) work as expected
- [ ] Components are responsive across devices

---

### Phase 3: LinkedIn OAuth Integration (Week 2)

**Goal**: Implement secure LinkedIn Messaging API integration

#### Implementation Steps

1. **Create OAuth State Management**
   
   File: `src/utils/oauth-state.ts`
   ```typescript
   import { z } from 'zod';

   const OAuthStateSchema = z.object({
     state: z.string(),
     codeVerifier: z.string(),
     timestamp: z.number(),
   });

   export function generateOAuthState() {
     const state = crypto.randomUUID();
     const codeVerifier = generateCodeVerifier();
     const timestamp = Date.now();

     return {
       state,
       codeVerifier,
       timestamp,
     };
   }

   function generateCodeVerifier(): string {
     const array = new Uint8Array(32);
     crypto.getRandomValues(array);
     return base64UrlEncode(array);
   }

   function base64UrlEncode(buffer: Uint8Array): string {
     return btoa(String.fromCharCode(...buffer))
       .replace(/\+/g, '-')
       .replace(/\//g, '_')
       .replace(/=+$/, '');
   }
   ```

2. **Authorization Endpoint**
   
   File: `src/pages/api/auth/linkedin/authorize.ts`
   ```typescript
   import type { APIRoute } from 'astro';
   import { generateOAuthState } from '../../../../utils/oauth-state';

   export const GET: APIRoute = async ({ redirect, cookies }) => {
     const { state, codeVerifier } = generateOAuthState();

     // Store state in secure HTTP-only cookie
     cookies.set('oauth_state', state, {
       httpOnly: true,
       secure: import.meta.env.PROD,
       sameSite: 'lax',
       maxAge: 600, // 10 minutes
     });

     cookies.set('oauth_verifier', codeVerifier, {
       httpOnly: true,
       secure: import.meta.env.PROD,
       sameSite: 'lax',
       maxAge: 600,
     });

     // Build authorization URL
     const authUrl = new URL('https://www.linkedin.com/oauth/v2/authorization');
     authUrl.searchParams.set('response_type', 'code');
     authUrl.searchParams.set('client_id', import.meta.env.PUBLIC_LINKEDIN_CLIENT_ID);
     authUrl.searchParams.set('redirect_uri', import.meta.env.PUBLIC_LINKEDIN_REDIRECT_URI);
     authUrl.searchParams.set('state', state);
     authUrl.searchParams.set('scope', 'openid profile w_member_social');

     return redirect(authUrl.toString());
   };
   ```

3. **Callback Handler**
   
   File: `src/pages/api/auth/linkedin/callback.ts`
   ```typescript
   import type { APIRoute } from 'astro';
   import { z } from 'zod';

   const CallbackSchema = z.object({
     code: z.string(),
     state: z.string(),
   });

   export const GET: APIRoute = async ({ url, cookies, redirect }) => {
     try {
       // Validate callback parameters
       const params = CallbackSchema.parse({
         code: url.searchParams.get('code'),
         state: url.searchParams.get('state'),
       });

       // Verify state
       const storedState = cookies.get('oauth_state')?.value;
       if (params.state !== storedState) {
         throw new Error('Invalid state parameter');
       }

       // Exchange code for access token
       const codeVerifier = cookies.get('oauth_verifier')?.value;
       const tokenResponse = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/x-www-form-urlencoded',
         },
         body: new URLSearchParams({
           grant_type: 'authorization_code',
           code: params.code,
           redirect_uri: import.meta.env.PUBLIC_LINKEDIN_REDIRECT_URI,
           client_id: import.meta.env.PUBLIC_LINKEDIN_CLIENT_ID,
           client_secret: import.meta.env.LINKEDIN_CLIENT_SECRET,
           code_verifier: codeVerifier!,
         }),
       });

       if (!tokenResponse.ok) {
         throw new Error('Failed to exchange code for token');
       }

       const { access_token } = await tokenResponse.json();

       // Store access token securely
       cookies.set('linkedin_token', access_token, {
         httpOnly: true,
         secure: import.meta.env.PROD,
         sameSite: 'strict',
         maxAge: 3600, // 1 hour
       });

       // Clean up OAuth cookies
       cookies.delete('oauth_state');
       cookies.delete('oauth_verifier');

       return redirect('/?linkedin_auth=success');
     } catch (error) {
       console.error('OAuth callback error:', error);
       return redirect('/?linkedin_auth=error');
     }
   };
   ```

#### Security Considerations

- **State Parameter**: Prevents CSRF attacks
- **Code Verifier**: PKCE flow for additional security
- **HTTP-Only Cookies**: Prevents XSS token theft
- **Secure Flag**: HTTPS-only in production
- **SameSite**: Prevents CSRF
- **Short Expiry**: Limits token exposure window

#### Validation Checklist

- [ ] OAuth flow completes successfully
- [ ] State validation prevents CSRF
- [ ] Tokens stored securely in HTTP-only cookies
- [ ] Error cases handled gracefully
- [ ] User redirected correctly after auth

---

### Phase 4: TanStack Start Blog (Week 3)

**Goal**: Build dynamic blog with SSR using TanStack Start

#### Blog Initialization

```bash
# Create blog directory
mkdir blog && cd blog

# Initialize TanStack Start project
npm create @tanstack/start@latest

# Install additional dependencies
npm install @tanstack/react-router zod react-i18next
npm install -D @tanstack/router-devtools
```

#### Configuration

File: `blog/app.config.ts`
```typescript
import { defineConfig } from '@tanstack/start/config';

export default defineConfig({
  server: {
    preset: 'node-server',
  },
  routers: {
    ssr: true,
  },
});
```

#### Root Layout with Router

File: `blog/app/routes/__root.tsx`
```typescript
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="min-h-screen flex flex-col">
        <header className="border-b">
          <nav className="container mx-auto px-4 py-4">
            <a href="/" className="text-xl font-bold">Blog</a>
          </nav>
        </header>
        <main className="flex-1 container mx-auto px-4 py-8">
          <Outlet />
        </main>
        <footer className="border-t py-4 text-center">
          <p>© 2025 Portfolio Blog</p>
        </footer>
      </div>
      <TanStackRouterDevtools />
    </>
  ),
});
```

#### Blog Post Route with Server Function

File: `blog/app/routes/posts/$slug.tsx`
```typescript
import { createFileRoute } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/start';
import { getPostBySlug } from '../../server/posts';
import { z } from 'zod';

const PostParamsSchema = z.object({
  slug: z.string(),
});

// Server function to fetch post data
const getPost = createServerFn('GET', async (slug: string) => {
  const post = await getPostBySlug(slug);
  if (!post) {
    throw new Error('Post not found');
  }
  return post;
});

export const Route = createFileRoute('/posts/$slug')({
  loader: async ({ params }) => {
    const { slug } = PostParamsSchema.parse(params);
    return getPost(slug);
  },
  component: PostPage,
});

function PostPage() {
  const post = Route.useLoaderData();

  return (
    <article className="prose lg:prose-xl mx-auto">
      <h1>{post.title}</h1>
      <div className="text-gray-600 mb-8">
        <time dateTime={post.publishedAt}>
          {new Date(post.publishedAt).toLocaleDateString()}
        </time>
      </div>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}
```

#### Server Function for Posts

File: `blog/app/server/posts.ts`
```typescript
import { z } from 'zod';
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

const PostSchema = z.object({
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  publishedAt: z.string(),
  tags: z.array(z.string()),
  content: z.string(),
});

export type Post = z.infer<typeof PostSchema>;

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const postsDir = path.join(process.cwd(), 'app/content/posts');
    const filePath = path.join(postsDir, `${slug}.mdx`);
    const fileContent = await fs.readFile(filePath, 'utf-8');
    
    const { data, content } = matter(fileContent);
    const htmlContent = await marked(content);

    return PostSchema.parse({
      slug,
      ...data,
      content: htmlContent,
    });
  } catch (error) {
    console.error(`Error loading post ${slug}:`, error);
    return null;
  }
}

export async function getAllPosts(): Promise<Post[]> {
  const postsDir = path.join(process.cwd(), 'app/content/posts');
  const files = await fs.readdir(postsDir);
  
  const posts = await Promise.all(
    files
      .filter((file) => file.endsWith('.mdx'))
      .map(async (file) => {
        const slug = file.replace('.mdx', '');
        return getPostBySlug(slug);
      })
  );

  return posts.filter((post): post is Post => post !== null);
}
```

#### Validation Checklist

- [ ] TanStack Start dev server runs without errors
- [ ] Server functions execute on the server
- [ ] MDX posts render correctly
- [ ] Dynamic routing works for blog posts
- [ ] SEO metadata renders properly

---

### Phase 5: State Management with Jotai (Week 3-4)

**Goal**: Implement lightweight state management for Astro React islands

#### Jotai Setup

```bash
npm install jotai
```

#### Create Atoms

File: `src/store/atoms.ts`
```typescript
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

// Theme atom (persisted to localStorage)
export const themeAtom = atomWithStorage<'light' | 'dark'>('theme', 'light');

// Locale atom (persisted to localStorage)
export const localeAtom = atomWithStorage<'en' | 'es'>('locale', 'en');

// LinkedIn auth status
export const linkedInAuthAtom = atom<{
  isAuthenticated: boolean;
  expiresAt?: number;
}>({
  isAuthenticated: false,
});

// Derived atom for theme class
export const themeClassAtom = atom((get) => {
  const theme = get(themeAtom);
  return theme === 'dark' ? 'dark' : '';
});
```

#### Theme Switcher Component

File: `src/components/ThemeSwitcher.tsx`
```typescript
import { useAtom } from 'jotai';
import { themeAtom } from '../store/atoms';
import { useEffect } from 'react';

export function ThemeSwitcher() {
  const [theme, setTheme] = useAtom(themeAtom);

  useEffect(() => {
    // Apply theme class to document
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggleTheme = () => {
    setTheme((current) => (current === 'light' ? 'dark' : 'light'));
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
}
```

#### Validation Checklist

- [ ] Theme persists across page reloads
- [ ] Locale changes update all translated text
- [ ] Atoms work across different React islands
- [ ] No hydration mismatches

---

### Phase 6: Testing Strategy (Week 4)

**Goal**: Implement comprehensive testing coverage

#### Testing Setup

```bash
# Install testing dependencies
npm install -D vitest @testing-library/react @testing-library/jest-dom
npm install -D @playwright/test
```

#### Vitest Configuration

File: `vitest.config.ts`
```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    globals: true,
  },
});
```

#### Example Component Test

File: `src/components/__tests__/Hero.test.tsx`
```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Hero } from '../Hero';

describe('Hero Component', () => {
  it('renders hero title', () => {
    render(<Hero />);
    expect(screen.getByText(/Full-Stack Developer/i)).toBeInTheDocument();
  });

  it('animates on mount', () => {
    const { container } = render(<Hero />);
    const section = container.querySelector('section');
    expect(section).toHaveStyle({ opacity: 0 });
    // Motion animation would trigger opacity: 1
  });
});
```

#### Playwright E2E Test

File: `tests/e2e/navigation.spec.ts`
```typescript
import { test, expect } from '@playwright/test';

test.describe('Portfolio Navigation', () => {
  test('should navigate between pages', async ({ page }) => {
    await page.goto('http://localhost:4321');
    
    // Check homepage loads
    await expect(page.getByRole('heading', { name: /Full-Stack Developer/i })).toBeVisible();
    
    // Navigate to projects page
    await page.getByRole('link', { name: /Projects/i }).click();
    await expect(page).toHaveURL(/\/projects/);
    
    // Check projects load
    await expect(page.getByRole('heading', { name: /Featured Projects/i })).toBeVisible();
  });

  test('should handle LinkedIn OAuth flow', async ({ page }) => {
    await page.goto('http://localhost:4321');
    
    // Click LinkedIn connect button
    await page.getByRole('button', { name: /Connect on LinkedIn/i }).click();
    
    // Should redirect to LinkedIn OAuth (or mock in test)
    await expect(page).toHaveURL(/linkedin\.com/);
  });
});
```

#### Run Tests

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Coverage report
npm run test:coverage
```

#### Validation Checklist

- [ ] All component tests pass
- [ ] E2E tests cover critical user flows
- [ ] Test coverage above 80%
- [ ] OAuth flow tested (mocked)
- [ ] Accessibility tests included

---

### Phase 7: Deployment Configuration (Week 4-5)

**Goal**: Configure deployment for both Astro and TanStack Start

#### Netlify Configuration (Astro)

File: `netlify.toml`
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/blog/*"
  to = "https://blog.yourportfolio.com/:splat"
  status = 200
  force = true

[build.environment]
  NODE_VERSION = "20"

[[plugins]]
  package = "@netlify/plugin-lighthouse"

[context.production.environment]
  PUBLIC_LINKEDIN_CLIENT_ID = "production_client_id"
  PUBLIC_ENABLE_LINKEDIN_OAUTH = "true"

[context.deploy-preview.environment]
  PUBLIC_ENABLE_LINKEDIN_OAUTH = "false"
```

#### SST v3 Configuration (Blog)

File: `blog/sst.config.ts`
```typescript
/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: 'portfolio-blog',
      removal: input?.stage === 'production' ? 'retain' : 'remove',
      home: 'aws',
    };
  },
  async run() {
    new sst.aws.Astro('PortfolioBlog', {
      domain: 'blog.yourportfolio.com',
      environment: {
        LINKEDIN_CLIENT_ID: process.env.LINKEDIN_CLIENT_ID!,
        LINKEDIN_CLIENT_SECRET: process.env.LINKEDIN_CLIENT_SECRET!,
      },
    });
  },
});
```

#### Deployment Commands

```bash
# Deploy Astro to Netlify
netlify deploy --prod

# Deploy Blog to AWS via SST
cd blog
npx sst deploy --stage production
```

#### Validation Checklist

- [ ] Astro site deploys to Netlify successfully
- [ ] Blog deploys to AWS via SST
- [ ] Environment variables configured correctly
- [ ] Custom domains configured
- [ ] HTTPS certificates active
- [ ] Edge functions work (if applicable)

---

## 🔍 Key Implementation Patterns

### 1. Hybrid Rendering Strategy

**Astro Pages**: Use `output: 'hybrid'` for mostly static with selective SSR

```astro
---
// Static page (default)
export const prerender = true;
---

---
// Server-rendered page (opt-in)
export const prerender = false;
---
```

### 2. React Island Hydration

Choose appropriate hydration strategy:

- `client:load` - Hydrate immediately on page load
- `client:idle` - Hydrate when browser is idle
- `client:visible` - Hydrate when component enters viewport
- `client:media` - Hydrate based on media query
- `client:only` - Skip SSR, client-only rendering

```astro
<Hero client:load />           <!-- Critical, immediate -->
<Projects client:visible />    <!-- Below fold, lazy -->
<Contact client:idle />        <!-- Not immediately needed -->
```

### 3. Data Validation with Zod

Always validate external data:

```typescript
import { z } from 'zod';

const ProjectSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().max(500),
  technologies: z.array(z.string()),
  githubUrl: z.string().url().optional(),
});

// Validate data
const project = ProjectSchema.parse(rawData);
```

### 4. Error Boundaries

Wrap components in error boundaries:

```typescript
import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ error }: { error: Error }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
    </div>
  );
}

<ErrorBoundary FallbackComponent={ErrorFallback}>
  <Projects projects={projects} client:visible />
</ErrorBoundary>
```

### 5. Accessibility Best Practices

```typescript
// Semantic HTML
<nav aria-label="Main navigation">
  <ul>
    <li><a href="/">Home</a></li>
  </ul>
</nav>

// Focus management
<button
  onClick={handleClick}
  aria-label="Open menu"
  aria-expanded={isOpen}
>
  Menu
</button>

// Skip to content
<a href="#main-content" className="sr-only focus:not-sr-only">
  Skip to main content
</a>
```

---

## 🚨 Common Issues & Solutions

### Issue 1: Hydration Mismatch

**Symptom**: React hydration errors in console

**Solution**:
```typescript
// Use useEffect for client-only code
useEffect(() => {
  // Client-only logic here
}, []);

// Or use client:only directive
<Component client:only="react" />
```

### Issue 2: OAuth State Mismatch

**Symptom**: "Invalid state parameter" error

**Solution**:
- Ensure cookies are properly set with correct domain
- Check SameSite and Secure flags
- Verify state is stored before redirect

### Issue 3: TanStack Router 404s

**Symptom**: Routes not matching correctly

**Solution**:
```typescript
// Ensure route files match naming convention
routes/
  __root.tsx        // Root layout
  index.tsx         // /
  posts/
    index.tsx       // /posts
    $slug.tsx       // /posts/:slug
```

### Issue 4: Build Performance

**Symptom**: Slow Astro builds

**Solution**:
```javascript
// Use selective prerendering
export const prerender = true; // Only for truly static pages

// Optimize images
import { Image } from 'astro:assets';
<Image src={heroImage} alt="Hero" width={1200} height={600} />

// Lazy load heavy components
<HeavyComponent client:visible />
```

---

## 📚 Additional Resources

### Documentation

- [Astro Documentation](https://docs.astro.build)
- [TanStack Start Docs](https://tanstack.com/start/latest)
- [TanStack Router Docs](https://tanstack.com/router/latest)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [LinkedIn OAuth](https://learn.microsoft.com/en-us/linkedin/shared/authentication/authentication)
- [Jotai Documentation](https://jotai.org/docs/introduction)
- [Vitest Documentation](https://vitest.dev)
- [Playwright Documentation](https://playwright.dev)

### Reference Files

Within this feature specification:

- [`spec.md`](spec.md:1) - Full feature specification
- [`research.md`](research.md:1) - Technology decisions and justifications
- [`data-model.md`](data-model.md:1) - Entity schemas and validation rules
- [`contracts/api-contracts.md`](contracts/api-contracts.md:1) - Detailed API documentation
- [`contracts/openapi.json`](contracts/openapi.json:1) - OpenAPI 3.1.0 specification (JSON)
- [`contracts/openapi.yaml`](contracts/openapi.yaml:1) - OpenAPI 3.1.0 specification (YAML)

---

## ✅ Implementation Checklist

### Phase 1: Foundation
- [ ] Astro project configured with integrations
- [ ] Base layout created with View Transitions
- [ ] i18n configured and tested
- [ ] Tailwind CSS working with dark mode
- [ ] Development environment validated

### Phase 2: Components
- [ ] Hero component with animations
- [ ] Projects showcase with MDX content
- [ ] Skills matrix component
- [ ] Contact component with LinkedIn integration
- [ ] Language switcher functional
- [ ] All components tested

### Phase 3: OAuth
- [ ] LinkedIn Developer app configured
- [ ] OAuth flow implemented
- [ ] Token management secure
- [ ] Error handling complete
- [ ] Security audit passed

### Phase 4: Blog
- [ ] TanStack Start initialized
- [ ] Server functions working
- [ ] MDX posts rendering
- [ ] Blog navigation functional
- [ ] SEO metadata complete

### Phase 5: State Management
- [ ] Jotai atoms defined
- [ ] Theme switcher working
- [ ] Locale switcher working
- [ ] State persistence verified

### Phase 6: Testing
- [ ] Unit tests written and passing
- [ ] E2E tests covering main flows
- [ ] Test coverage > 80%
- [ ] Accessibility tests passing

### Phase 7: Deployment
- [ ] Netlify configuration complete
- [ ] SST configuration complete
- [ ] Environment variables set
- [ ] Production deployments successful
- [ ] Performance monitoring active

---

## 🎯 Success Criteria

Implementation is considered complete when:

1. ✅ All Astro pages render correctly with proper hydration
2. ✅ LinkedIn OAuth flow works end-to-end
3. ✅ Blog posts load dynamically with TanStack Start
4. ✅ Internationalization switches languages correctly
5. ✅ Dark mode persists across sessions
6. ✅ All tests pass with >80% coverage
7. ✅ Lighthouse scores: Performance >90, Accessibility 100, Best Practices 100, SEO 100
8. ✅ Both main site and blog deployed successfully
9. ✅ No console errors in production
10. ✅ Responsive design works on mobile, tablet, and desktop

---

## 📞 Support & Questions

For questions or issues during implementation:

1. Review the [`research.md`](research.md:1) for architectural decisions
2. Check the [`api-contracts.md`](contracts/api-contracts.md:1) for API specifications
3. Consult the [`data-model.md`](data-model.md:1) for data structures
4. Review official framework documentation (linked above)

---

**Document Status**: ✅ Complete and Ready for Implementation  
**Next Phase**: Switch to Code mode for implementation  
**Estimated Implementation Time**: 4-5 weeks (full-time equivalent)