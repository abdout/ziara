import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { i18n } from "@/components/local/config";

// Define public routes that don't require authentication
const isPublicRoute = createRouteMatcher([
  "/",
  "/:lang",
  "/:lang/products(.*)",
  "/:lang/categories(.*)",
  "/:lang/cart(.*)",
  "/:lang/sign-in(.*)",
  "/:lang/sign-up(.*)",
  "/:lang/unauthorized(.*)",
  "/:lang/api-test(.*)",
  // API routes that should be public
  "/api/products(.*)",
  "/api/categories(.*)",
  "/api/test(.*)",
  "/api/webhooks(.*)",
]);

// Define admin-only routes
const isAdminRoute = createRouteMatcher([
  "/:lang/admin(.*)",
]);

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

export default clerkMiddleware(async (auth, req) => {
  const pathname = req.nextUrl.pathname;

  // For API routes, skip authentication entirely for public endpoints
  if (pathname.startsWith("/api")) {
    // Public API endpoints - no auth needed
    if (
      pathname.startsWith("/api/products") ||
      pathname.startsWith("/api/categories") ||
      pathname.startsWith("/api/test") ||
      pathname.startsWith("/api/webhooks")
    ) {
      return NextResponse.next();
    }

    // Other API routes might need auth
    await auth.protect();
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

  // Check if route requires authentication
  if (!isPublicRoute(req)) {
    await auth.protect();

    // Check admin routes
    if (isAdminRoute(req)) {
      const { sessionClaims } = await auth();
      const userRole = (sessionClaims as any)?.metadata?.role;

      if (userRole !== "admin") {
        return NextResponse.redirect(new URL(`/${locale}/unauthorized`, req.url));
      }
    }
  }

  // Create response
  const response = NextResponse.next();

  // Set locale cookie for persistence
  response.cookies.set("NEXT_LOCALE", locale, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 365, // 1 year
  });

  return response;
});

export const config = {
  matcher: [
    // Match all pathnames except for
    // - ... if they start with `/_next` or `/_vercel`
    // - ... the ones containing a dot (e.g. `favicon.ico`)
    "/((?!_next|_vercel|.*\\..*).*)",
    // Always run for API routes
    "/api/(.*)",
  ],
};