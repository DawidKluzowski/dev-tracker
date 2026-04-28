import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/dist/server/web/spec-extension/request";
import { NextResponse } from "next/dist/server/web/spec-extension/response";

export async function proxy(request: NextRequest) {
    const token = await getToken({ req: request });
    const path = request.nextUrl.pathname;

    if (path === "/login" || path === "/register") {
        return NextResponse.next();
    }

    if (!token) {
        return NextResponse.redirect(new URL("/login", request.url));
    }
}

export const config = {
    matcher: ["/((?!login|api|_next/static|_next/image|favicon.ico).*)"],
};
