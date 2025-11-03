# API Contracts - Modern Portfolio

This directory contains API contracts and specifications for the Modern Portfolio project's hybrid architecture.

## Architecture Overview

The project uses a hybrid architecture:

- **Astro (Static Portfolio)**: Main portfolio site with static pages and server endpoints for LinkedIn integration
- **TanStack Start (Dynamic Blog)**: Separate blog section with SSR and server functions

## Contract Organization

### `/linkedin/`
LinkedIn integration APIs used by the Astro portfolio site:
- OAuth 2.0 authentication flow
- LinkedIn Messaging API integration
- Profile data synchronization
- Share API fallback

### `/blog/`
TanStack Start server functions for the dynamic blog:
- Blog post retrieval and rendering
- Comment management (CRUD operations)
- Comment moderation
- Blog metadata and search

## Technology Standards

- **Schema Definition**: JSON Schema (OpenAPI 3.1.0)
- **Validation**: Zod schemas (TypeScript runtime validation)
- **Authentication**: OAuth 2.0 for LinkedIn, JWT for blog admin
- **Data Format**: JSON
- **Date Format**: ISO 8601 (UTC)
- **Error Format**: RFC 7807 Problem Details

## Versioning

All APIs follow semantic versioning. Breaking changes require a new major version.

Current versions:
- LinkedIn APIs: `v1`
- Blog APIs: `v1`

## API Overview

The Modern Portfolio API provides:

### Authentication & LinkedIn Integration
- **OAuth 2.0 LinkedIn authentication** with CSRF protection
- **LinkedIn Messaging API** integration for direct messaging
- **Profile synchronization** with edge caching (24-hour TTL)

### Blog Management
- **TanStack Start server functions** for blog post management
- **MDX content rendering** with SEO optimization
- **Pagination and filtering** capabilities

### Comment System
- **Moderated comment system** with reCAPTCHA v3 protection
- **Threaded replies** and voting system
- **Rate limiting** and spam prevention

## Validation

### OpenAPI Specification Validation

Validate the OpenAPI specification using:

```bash
# Using swagger-cli
npx swagger-cli validate specs/001-modern-portfolio/contracts/openapi.yaml

# Using Redocly CLI
npx @redocly/cli lint specs/001-modern-portfolio/contracts/openapi.yaml

# Using OpenAPI Generator
npx @openapitools/openapi-generator-cli validate -i specs/001-modern-portfolio/contracts/openapi.yaml
```

### Code Generation

Generate client code from the OpenAPI specification:

```bash
# TypeScript client
npx openapi-typescript specs/001-modern-portfolio/contracts/openapi.yaml --output src/types/api.ts

# React Query hooks
npx openapi-react-query specs/001-modern-portfolio/contracts/openapi.yaml --output src/hooks/api.ts

# Mock server
npx prism mock specs/001-modern-portfolio/contracts/openapi.yaml
```

## Deployment Considerations

### Environment Variables
- `LINKEDIN_CLIENT_ID` - LinkedIn OAuth client ID
- `LINKEDIN_CLIENT_SECRET` - LinkedIn OAuth client secret
- `RECAPTCHA_SECRET_KEY` - reCAPTCHA v3 secret key
- `DATABASE_URL` - PostgreSQL connection string

### Rate Limiting
- LinkedIn API: 100 messages/day per user, 10 messages/hour
- Comment submission: 5 comments/hour per IP address
- Blog post views: No rate limiting (cached at edge)

### Security Headers
- CORS configured for portfolio domain
- CSRF protection for OAuth flows
- Content Security Policy for MDX rendering

## Testing

### Contract Testing

```bash
# Generate test cases from OpenAPI spec
npx dredd specs/001-modern-portfolio/contracts/openapi.yaml http://localhost:3000

# Run API tests
npm test -- --testPathPattern="api"
```

### Integration Testing
- OAuth flow simulation
- LinkedIn API mocking
- Comment moderation workflow testing

## Monitoring

### Key Metrics
- OAuth success/failure rates
- LinkedIn message delivery status
- Comment submission and moderation rates
- API response times and error rates

### Alerting
- LinkedIn API quota exhaustion
- Comment spam detection thresholds
- Authentication failure patterns