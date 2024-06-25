import { Console, log } from "console";
import { NextResponse } from "next/server";
import { auth } from "./lib/auth";

// export function middleware(req: Request) {
//   console.log(`Request: ${req.method} ${req.url}`);
//   return NextResponse.next();
// }

export default auth;

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
