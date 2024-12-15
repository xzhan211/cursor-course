import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(request) {
  const token = await getToken({ req: request });
  
  // Protect dashboard routes
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    if (!token) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"]
}; 