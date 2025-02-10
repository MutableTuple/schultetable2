import { NextResponse } from "next/server";

export function middleware(request) {
  // Get the "sb-access-token" from cookies
  const token = request.cookies.get("sb-access-token")?.value;
  const { pathname } = request.nextUrl;

  if (token) {
    console.log("SESSION EXISTS:", token);

    // If user is logged in, prevent access to /login and /register, redirect to home
    if (pathname === "/login" || pathname === "/register") {
      return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next(); // Allow other authenticated routes
  } else {
    console.log("SESSION DOESN'T EXIST");

    // If user is NOT logged in and trying to access protected routes, redirect to login
    if (pathname === "/account" || pathname === "/profile") {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next(); // Allow unauthenticated users to access public pages
  }
}

// Apply middleware to account, login, and register routes
export const config = {
  matcher: ["/account", "/login", "/register", "/profile"],
};
