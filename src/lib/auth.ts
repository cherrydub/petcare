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
      if (isLoggedIn && !isTryingtoAccessApp) {
        return Response.redirect(new URL("/app/dashboard", request.nextUrl));
      }
      if (!isLoggedIn && !isTryingtoAccessApp) {
        return true;
      }
      return false;
    },
    async jwt({ token, user }) {
      if (user) {
        // on sign in
        token.userId = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.userId;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;

export const { auth, signIn, signOut } = NextAuth(config);
