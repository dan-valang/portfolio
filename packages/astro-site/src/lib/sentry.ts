import * as Sentry from '@sentry/astro'

/**
 * Sentry error tracking initialization
 * Only initializes if ENABLE_ERROR_TRACKING is true and SENTRY_DSN is set
 */

export interface SentryConfig {
  dsn?: string
  environment?: string
  enabled?: boolean
}

export function initSentry(config: SentryConfig) {
  // Only initialize if explicitly enabled and DSN is provided
  if (!config.enabled || !config.dsn) {
    console.log('[Sentry] Error tracking disabled')
    return
  }

  // Sentry initialization will be implemented when the package is added
  // This is a placeholder for the basic configuration structure
  console.log('[Sentry] Error tracking initialized for environment:', config.environment)
}

// Extend ImportMeta interface for environment variables
interface ImportMetaEnv {
  DEV: boolean
  PUBLIC_SENTRY_DSN?: string
}

declare global {
  interface ImportMeta {
    env: ImportMetaEnv
  }
}

// Mock Sentry implementation for development
export function captureException(error: Error, context?: any) {
  if (import.meta.env.DEV) {
    console.error('Development mode - Error captured:', error, context)
    return
  }
  
  // TODO: Implement actual Sentry integration
  console.error('Production mode - Error captured:', error, context)
}

export function captureMessage(message: string, level: 'info' | 'warning' | 'error' = 'info') {
  if (import.meta.env.DEV) {
    console.log(`Development mode - Message: ${message} (${level})`)
    return
  }
  
  // TODO: Implement actual Sentry integration
  console.log(`Production mode - Message: ${message} (${level})`)
}