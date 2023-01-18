import { NextRequest, NextResponse } from "next/server";

const signedInPages = ["/", "/playlists", "/library", "/account"];

export default function middleware(req: NextRequest) {
  if (signedInPages.find((p) => req.nextUrl)) {
    const token = req.cookies.NAPSTIFY_ACCESS_TOKEN;

    if (!token) {
      NextResponse.redirect("/signup");
    }
  }
}
