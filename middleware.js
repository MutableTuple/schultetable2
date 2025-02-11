import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("sb-access-token")?.value;
  const { pathname } = request.nextUrl;

  if (token) {
    console.log("SESSION EXISTS:", token);

    // ✅ Fix: Ensure we are not redirecting users already at home or other allowed pages
    if (
      (pathname === "/login" || pathname === "/register") &&
      pathname !== "/"
    ) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
  } else {
    console.log("SESSION DOESN'T EXIST");

    // ✅ Fix: Avoid redirect loops by checking if already on /login
    if (
      (pathname === "/account" || pathname === "/profile") &&
      pathname !== "/login"
    ) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/account", "/login", "/register", "/profile"],
};
