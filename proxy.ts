import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function proxy(req: NextRequest) {

  const { pathname } = req.nextUrl

  if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {

    const auth = req.headers.get("authorization")

    if (!auth) {
      return new NextResponse("Authentication required", {
        status: 401,
        headers: {
          "WWW-Authenticate": "Basic realm=\"Admin\"",
        },
      })
    }

    const base64Credentials = auth.split(" ")[1]
    const credentials = atob(base64Credentials)

    const [username, password] = credentials.split(":")

    if (
      username !== process.env.ADMIN_USERNAME ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return new NextResponse("Access denied", { status: 401 })
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/admin/:path*"
  ],
}