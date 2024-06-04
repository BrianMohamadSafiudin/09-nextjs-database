import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import { NextRequest, NextResponse } from 'next/server';

const auth = NextAuth(authConfig).auth;

export default function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  // Check if the request is for the root URL
  if (url.pathname === '/') {
    // Redirect to the login page
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // Call the NextAuth middleware for other requests
  return auth(req);
}

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
