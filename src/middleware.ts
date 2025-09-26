import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { i18n } from "@/components/local/config";

// Helper function to check if pathname has locale
function pathnameHasLocale(pathname: string) {
  return i18n.locales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
}

// Helper function to get locale from request
function getLocale(request: NextRequest): string {
  // Check cookie first
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
  if (cookieLocale && i18n.locales.includes(cookieLocale as any)) {
    return cookieLocale;
  }

  // Check Accept-Language header
  const acceptLang = request.headers.get("accept-language");
  if (acceptLang) {
    // Try to match ar or en from the Accept-Language header
    const languages = acceptLang.toLowerCase();

    if (languages.includes("ar")) {
      return "ar";
    }
    if (languages.includes("en")) {
      return "en";
    }
  }

  return i18n.defaultLocale;
}

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // IMPORTANT: Skip all API routes completely
  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // Skip static files
  if (pathname.startsWith("/_next") || pathname.includes(".")) {
    return NextResponse.next();
  }

  // Handle locale redirect for non-API routes
  if (!pathnameHasLocale(pathname)) {
    const locale = getLocale(req);
    const newUrl = new URL(`/${locale}${pathname}`, req.url);
    newUrl.search = req.nextUrl.search;

    const response = NextResponse.redirect(newUrl);

    // Set locale cookie
    response.cookies.set("NEXT_LOCALE", locale, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 365, // 1 year
    });

    return response;
  }

  // Extract locale from pathname
  const locale = pathname.split('/')[1] || i18n.defaultLocale;

  // Create response
  const response = NextResponse.next();

  // Set locale cookie for persistence
  response.cookies.set("NEXT_LOCALE", locale, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 365, // 1 year
  });

  return response;
}

export const config = {
  matcher: [
    // Match all pathnames except for
    // - ... if they start with `/api`, `/_next` or `/_vercel`
    // - ... the ones containing a dot (e.g. `favicon.ico`)
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};