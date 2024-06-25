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
    authorized: () => {
      return false;
    },
  },
} satisfies NextAuthConfig;

export const { auth } = NextAuth(config);
