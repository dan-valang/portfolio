 /**
 * LinkedIn API Integration Contract
 * 
 * Covers OAuth 2.0 flow, API endpoints, rate limits, and caching strategy
 * for FR-020 through FR-023, FR-036, FR-037
 */

import { z } from 'zod';

// OAuth 2.0 Configuration
export const LinkedInOAuthConfig = z.object({
  clientId: z.string().min(1),
  clientSecret: z.string().min(1),
  redirectUri: z.string().url(),
  scope: z.array(z.enum([
    'r_liteprofile',      // Basic profile (name, photo)
    'r_emailaddress',     // Email
    'r_fullprofile',      // Full profile (experience, skills)
    'w_member_social',    // Post updates (for blog cross-posting)
    'r_organization_social', // Read company pages
  ])),
  state: z.string().min(16), // CSRF protection
});

// Profile Data (FR-020)
export const LinkedInProfile = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  headline: z.string().optional(),
  profilePicture: z.string().url().optional(),
  experience: z.array(z.object({
    title: z.string(),
    company: z.string(),
    companyLinkedInId: z.string().optional(),
    startDate: z.object({ month: z.number(), year: z.number() }),
    endDate: z.object({ month: z.number(), year: z.number() }).optional(),
    description: z.string().optional(),
    location: z.string().optional(),
  })),
  skills: z.array(z.object({
    name: z.string(),
    endorsementCount: z.number().optional(),
  })),
  recommendations: z.array(z.object({
    recommenderName: z.string(),
    recommenderHeadline: z.string().optional(),
    text: z.string(),
    date: z.string().datetime(),
  })),
});

// Caching Strategy (FR-021)
export const LinkedInCacheConfig = z.object({
  ttl: z.number().default(86400), // 24 hours in seconds
  storageBackend: z.enum(['netlify-kv', 'dynamodb', 'redis']),
  invalidationStrategy: z.enum(['ttl', 'webhook', 'manual']),
});

// Rate Limiting (FR-022 fallback)
export const LinkedInRateLimits = z.object({
  profile: z.object({
    requestsPerDay: z.number().default(100),
    requestsPerHour: z.number().default(25),
  }),
  posting: z.object({
    requestsPerDay: z.number().default(25),
    requestsPerHour: z.number().default(10),
  }),
});

// Article Cross-Posting (FR-036, FR-037)
export const LinkedInArticlePost = z.object({
  title: z.string().max(200),
  content: z.string().max(110000), // LinkedIn limit
  canonicalUrl: z.string().url(),
  publishedAt: z.string().datetime(),
  visibility: z.enum(['PUBLIC', 'CONNECTIONS']).default('PUBLIC'),
});

// API Endpoints
export const LinkedInEndpoints = {
  oauth: {
    authorize: 'https://www.linkedin.com/oauth/v2/authorization',
    token: 'https://www.linkedin.com/oauth/v2/accessToken',
  },
  api: {
    profile: 'https://api.linkedin.com/v2/me',
    email: 'https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))',
    experience: 'https://api.linkedin.com/v2/positions',
    skills: 'https://api.linkedin.com/v2/skills',
    share: 'https://api.linkedin.com/v2/ugcPosts', // For article cross-posting
  },
} as const;

// Fallback Strategy (FR-022)
export const LinkedInFallbackUI = z.object({
  showPlaceholder: z.boolean(),
  cacheOnly: z.boolean(),
  errorMessage: z.string(),
  retryAfter: z.number().optional(), // seconds
});

export type LinkedInOAuthConfig = z.infer<typeof LinkedInOAuthConfig>;
export type LinkedInProfile = z.infer<typeof LinkedInProfile>;
export type LinkedInCacheConfig = z.infer<typeof LinkedInCacheConfig>;
export type LinkedInArticlePost = z.infer<typeof LinkedInArticlePost>;
export type LinkedInFallbackUI = z.infer<typeof LinkedInFallbackUI>;