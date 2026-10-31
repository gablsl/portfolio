import { NextRequest, NextResponse } from 'next/server';
import { langs } from './app/lib/schemas';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Redirect legacy /projetos paths to /pt/projects for compatibility
  if (pathname.startsWith('/projetos')) {
    const newPath = pathname.replace('/projetos', '/pt/projects');
    return NextResponse.redirect(new URL(newPath, request.url));
  }

  // Check if the pathname already has a supported locale
  const pathnameHasLang = langs.some(
    (lang) => pathname.startsWith(`/${lang}/`) || pathname === `/${lang}`,
  );

  if (pathnameHasLang) return NextResponse.next();

  // Default redirect to /en
  request.nextUrl.pathname = `/en${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|images|pdf).*)'],
};
