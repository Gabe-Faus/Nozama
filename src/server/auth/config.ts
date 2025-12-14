import { PrismaAdapter } from "@auth/prisma-adapter";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

import { db } from "@/server/db";
//import { env } from "process"; ESSE NÃO ESTAVA FUNCIONANDO, TIVE QUE FAZER COMO ESTA NA LINHA ABAIXO
import { env } from "@/env";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      isAdmin?: boolean;
    } & DefaultSession["user"];
  }

  interface User {
    isAdmin?: boolean; 
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
  adapter: PrismaAdapter(db),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const email = credentials.email as string;
        const password = credentials.password as string;

        const user = await db.user.findUnique({
          where: { email: email }
        });

        if (!user || user.password !== password) {
          return null;
        }

        return {
          id: user.id.toString(),
          email: user.email,
          name: user.name || email.split('@')[0], 
          image: user.image ?? undefined, 
          isAdmin: user.isAdmin || false, 
        };
      }
    })
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
  callbacks: {

    async jwt({ token, user, account }) {
      // Se é login pela primeira vez
      if (user) {
        token.id = user.id;
        token.isAdmin = (user as any).isAdmin || false;
      }
      // Login com Google e Admin
      else if (account?.provider === "google") {
        const dbUser = await db.user.findUnique({
          where: { email: token.email as string }
        });
        if (dbUser) {
          token.isAdmin = dbUser.isAdmin || false;
        }
      }
      return token;
    },
    
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.isAdmin = token.isAdmin as boolean;
        if (!session.user.name && token.email) {
          session.user.name = token.email.split('@')[0];
        }
      }
      return session;
    },
  },
  
  session: {
    strategy: "jwt", // Para Credentials funcionar, o trem que deu dor de cabeça pra mim
  },

  pages: {
    signIn: "/Login",
  },

  debug: process.env.NODE_ENV === "development",
  secret: env.AUTH_SECRET,
} satisfies NextAuthConfig;

//export const getServerAuthSession = () => getServerAuthSession(authOptions);
