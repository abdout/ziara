import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { i18n } from "@/components/local/config";
import { CustomJwtSessionClaims } from "@/types";

// Define public routes that don't require authentication
const isPublicRoute = createRouteMatcher([
  "/",
  "/:lang",
  "/:lang/products(.*)",
  "/:lang/sign-in(.*)",
  "/:lang/sign-up(.*)",
  "/:lang/unauthorized(.*)",
  "/api/products(.*)",
  "/api/categories(.*)",
]);

// Define admin-only routes
const isAdminRoute = createRouteMatcher([
  "/:lang/admin(.*)",
  "/api/products/:method(POST|PUT|DELETE)",
  "/api/categories/:method(POST|PUT|DELETE)",
  "/api/users(.*)",
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

export default clerkMiddleware(async (auth, req) => {
  const pathname = req.nextUrl.pathname;

  // Skip locale handling for API routes and static files
  if (pathname.startsWith("/api") || pathname.startsWith("/_next")) {
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

  // Handle authentication
  if (!isPublicRoute(req)) {
    await auth.protect();

    // Check admin routes
    if (isAdminRoute(req)) {
      const { userId, sessionClaims } = await auth();

      if (userId && sessionClaims) {
        const userRole = (sessionClaims as CustomJwtSessionClaims).metadata?.role;

        if (userRole !== "admin") {
          return NextResponse.redirect(new URL(`/${locale}/unauthorized`, req.url));
        }
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
    // Skip Next.js internals and all static files
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    // Always run for API routes
    "/api/(.*)",
  ],
};