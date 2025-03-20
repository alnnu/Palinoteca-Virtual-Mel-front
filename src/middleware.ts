import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const publicRoutes = [
	{
		path: "/login",
		whenAuthenticated: "redirect",
	},
	{
		path: "/register",
		whenAuthenticated: "redirect",
	},
	{
		path: "/pricing",
		whenAuthenticated: "next",
	},
	{
		path: "/resetPassword",
		whenAuthenticated: "redirect",
	},
] as const;

export async function middleware(request: NextRequest) {
	const token = await getToken({ req: request });

	const path = request.nextUrl.pathname;
	const publicRoute = publicRoutes.find((route) => route.path === path);

	if (!token && publicRoute) {
		return NextResponse.next();
	}

	if (!token && !publicRoute) {
		return NextResponse.redirect(new URL("/login", request.url));
	}

	if (token && publicRoute && publicRoute.whenAuthenticated === "redirect") {
		return NextResponse.redirect(new URL("/dashboard", request.url));
	}

	if (token && !publicRoute) {
		// Check if token is expired then remove coockie and redirect to login
		// Or use refresh token
		return NextResponse.next();
	}

	return NextResponse.next();
}

export const config = {
	// matcher: ["/dashboard/:path*", "/"],
	// matcher: ["/:path*"],
	matcher: [
		"/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
	],
};
