'use server';

import { NextRequest, NextResponse } from 'next/server';
import { getSession } from './lib/session';
import { authRoutes, DEFAULT_LOGIN_REDIRECT, publicRoute } from './routes';

export default async function middleware(req: NextRequest) {
  console.log('Middleware invoked');

  const session = await getSession();
  const user = session?.user;
  const nextUrl = req.nextUrl;
  const currentPath = nextUrl.pathname;

  const isPublicRoute = publicRoute.includes(currentPath);
  const isAuthRoute = authRoutes.includes(currentPath);

  if (!user) {
    if (!isPublicRoute && !isAuthRoute) {
      return redirectToIfDifferent('/login', nextUrl);
    }
  }

  if (user && (isAuthRoute || isPublicRoute)) {
    return redirectToIfDifferent(DEFAULT_LOGIN_REDIRECT, nextUrl);
  }

  return NextResponse.next();
}

function redirectToIfDifferent(path: string, nextUrl: URL) {
  const url = new URL(path, nextUrl);
  return url.href !== nextUrl.href
    ? NextResponse.redirect(url)
    : NextResponse.next();
}

export const config = {
  matcher: ['/((?!.*\\.[\\w]+$|_next|api|trpc).*)'],
};
