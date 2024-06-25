import NextAuth, { NextAuthConfig } from "next-auth";

const config = {
  pages: {
    signIn: "/login",
  },
  //   session: {
  //     maxAge: 60 * 60 * 24 * 30,
  //     strategy: "jwt",
  //   },
  providers: [],
  callbacks: {
    authorized: ({ request }) => {
      const isTryingtoAccessApp = request.nextUrl.pathname.includes("/app");

      if (isTryingtoAccessApp) {
        return false;
      } else return true;
    },
  },
} satisfies NextAuthConfig;

export const { auth } = NextAuth(config);
