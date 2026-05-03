export const unstable_settings = {
  matcher: {
    // Only run on GET requests
    methods: ['GET'],
    // Only run on API routes and specific paths
    patterns: ['/api/hello', '/admin/[...path]'],
  },
}

export default function middleware(request: Request) {
  console.log(`Middleware executed for: ${request.url}`)
//   return Response.json({ error: 'Unauthorized' }, { status: 401 })
  // Your middleware logic goes here
}
