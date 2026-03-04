import { NextRequest, NextResponse } from "next/server";

const MOBILE_USER_AGENT_REGEX =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 이미 /mobile 경로면 pass
  if (pathname.startsWith("/mobile")) {
    return NextResponse.next();
  }

  // 모바일 User-Agent 감지 → /mobile 경로로 redirect
  const userAgent = request.headers.get("user-agent") ?? "";
  const isMobile = MOBILE_USER_AGENT_REGEX.test(userAgent);

  if (isMobile) {
    const url = request.nextUrl.clone();
    url.pathname = "/mobile" + (pathname === "/" ? "" : pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // 정적 파일, API, Next.js 내부 경로 제외
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)).*)",
  ],
};
