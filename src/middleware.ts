import { NextRequest, NextResponse } from "next/server";

const MOBILE_USER_AGENT_REGEX =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hostname = request.headers.get("host") ?? "";

  // m. 서브도메인으로 접속한 경우 → /mobile 경로로 내부 rewrite
  if (hostname.startsWith("m.")) {
    // 이미 /mobile 경로면 pass
    if (pathname.startsWith("/mobile")) {
      return NextResponse.next();
    }
    const url = request.nextUrl.clone();
    url.pathname = "/mobile" + (pathname === "/" ? "" : pathname);
    return NextResponse.rewrite(url);
  }

  // 메인 도메인에서 모바일 User-Agent 감지 → m. 서브도메인으로 redirect
  const userAgent = request.headers.get("user-agent") ?? "";
  const isMobile = MOBILE_USER_AGENT_REGEX.test(userAgent);

  if (isMobile) {
    const url = request.nextUrl.clone();
    // 현재 hostname에서 m. 붙이기 (localhost:3000 → m.localhost:3000)
    url.host = "m." + hostname;
    url.pathname = pathname;
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
