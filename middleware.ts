// https://medium.com/@yokohailemariam/conquering-auth-v5-and-next-intl-middleware-in-next-js-14-app-55f59d40afb4
import { NextRequest, NextResponse } from "next/server"
import createIntlMiddleware from "next-intl/middleware";
import { auth } from "@/auth";

const locales = ["en", "de"]

const apiAuthPrefix: string = "/api/auth";
const authRoutes = ["/api/auth", "/en/api/auth", "de/api/auth"];
const DEFAULT_LOGIN_REDIRECT: string = "/login";
const publicRoutes: Array<string> = [];
const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale: "en",
});

const authMiddleware = auth((req: any) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname) ?? [];
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  // Handle different route scenarios
  if (isApiAuthRoute) return; // Don't modify API authentication routes

  if (isAuthRoute) {
    if (isLoggedIn) {
      // Redirect logged-in users from auth routes
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return; // Don't modify behavior for auth routes
  }

  if (!isLoggedIn && !isPublicRoute) {
    // Redirect unauthorized users to login for non-public routes
    return Response.redirect(new URL("/login", nextUrl));
  }

  if (isLoggedIn) {
    return intlMiddleware(req); // Apply internationalization for logged-in users
  }
});

export default async function middleware(req: NextRequest) {
  // const publicPathnameRegex = RegExp(
  //   `^(/(<span class="math-inline">\{locales\.join\("\|"\)\}\)\)?\(</span>{publicPages
  //     .flatMap((p) => (p === "/" ? ["", "/"] : p))
  //     .join("|")})/?$`,
  //   "i"
  // );

  // const session = await auth();
  // if (!session?.user) {
  //   return NextResponse.redirect('http://localhost:3000/en/login');
  // }

  const excludePattern = "^(/(" + locales.join("|") + "))?/admin/?.*?$";
  const publicPathnameRegex = RegExp(excludePattern, "i");
  const isPublicPage = !publicPathnameRegex.test(req.nextUrl.pathname);

  //const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);

  if (isPublicPage) {
    return intlMiddleware(req); // Apply internationalization for public pages
  } else {

    return (authMiddleware as any)(req); // Apply authentication logic for non-public pages
  }
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};


// import NextAuth from "next-auth";
// import { authConfig } from "./auth.config";
// import { NextRequest, NextResponse } from "next/server";
//
//
// const { auth } = NextAuth(authConfig);
// export async function middleware(req: NextRequest) {
//   const session = await auth();
//   if (!session?.user) {
//     return NextResponse.redirect('http://localhost:3000/login');
//   }
// }
//
// export const config = {
//   matcher: ['/api/attendance/:id*', '/attendance/:id*'],
// }
