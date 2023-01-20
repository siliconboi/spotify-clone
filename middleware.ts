import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("NAPSTIFY_ACCESS_TOKEN");
  if (!token) {
    return NextResponse.redirect(new URL("/signup", req.url));
  }
}

export const config = {
  matcher: ["/", "/playlists", "/library"],
};
