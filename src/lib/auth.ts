import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "./db";
import bcrypt from "bcryptjs";

const config = {
  pages: {
    signIn: "/login",
  },
  //   session: {
  //     maxAge: 60 * 60 * 24 * 30,
  //     strategy: "jwt",
  //   },
  providers: [
    Credentials({
      async authorize(credentials) {
        // runs on login
        const { email, password } = credentials;

        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });
        if (!user) {
          console.log("User not found");
          return null;
        }
        const passworsdMatch = await bcrypt.compare(
          password,
          user.hashedPassword
        );

        if (!passworsdMatch) {
          console.log("Invalid credentials");
          return null;
        }
        return user;
      },
    }),
  ],
  callbacks: {
    authorized: ({ auth, request }) => {
      // runs on every request with middleware
      const isTryingtoAccessApp = request.nextUrl.pathname.includes("/app");
      //objec to a boolean !!
      const isLoggedIn = !!auth?.user;

      if (!isLoggedIn && isTryingtoAccessApp) {
        return false;
      }
      if (isLoggedIn && isTryingtoAccessApp) {
        return true;
      }
      if (!isTryingtoAccessApp) {
        return true;
      }
    },
  },
} satisfies NextAuthConfig;

export const { auth, signIn, signOut } = NextAuth(config);
