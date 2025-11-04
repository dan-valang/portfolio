import { createRootRoute, Outlet } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: () => (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Portfolio Blog</title>
      </head>
      <body>
        <div className="min-h-screen bg-white dark:bg-gray-900">
          <Outlet />
        </div>
      </body>
    </html>
  ),
})