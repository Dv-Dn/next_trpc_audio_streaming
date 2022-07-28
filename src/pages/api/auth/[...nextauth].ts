import NextAuth, { type NextAuthOptions } from "next-auth";

import Auth0Provider from "next-auth/providers/auth0";
import GoogleProvider from "next-auth/providers/google";

import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../server/db/client";

const THIRTY_DAYS = 30 * 24 * 60 * 60;
const THIRTY_MINUTES = 30 * 60;

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),

  secret: process.env.SECRET,
  session: {
    strategy: "jwt",
    maxAge: THIRTY_DAYS,
    updateAge: THIRTY_MINUTES,
  },
  providers: [
    Auth0Provider({
      clientId: String(process.env.AUTH0_CLIENT_ID),
      clientSecret: String(process.env.AUTH0_CLIENT_SECRET),
      issuer: String(process.env.AUTH0_ISSUER),
    }),
    GoogleProvider({
      clientId: String(process.env.GOOGLE_CLIENT_ID),
      clientSecret: String(process.env.GOOGLE_CLIENT_SECRET),
    }),
    // GithubProvider({
    //   clientId: process.env.GITHUB_ID,
    //   clientSecret: process.env.GITHUB_SECRET,
    // }),
    // ...add more providers here
    // EmailProvider({
    //   server: {
    //     host: process.env.EMAIL_SERVER_HOST,
    //     port: Number(process.env.EMAIL_SERVER_PORT),
    //     // secure: true,
    //     auth: {
    //       user: process.env.EMAIL_SERVER_USER,
    //       pass: process.env.EMAIL_SERVER_PASSWORD,
    //     },
    //     // tls: { rejectUnauthorized: true },
    //   },
    //   from: process.env.EMAIL_FROM,
    //   // async sendVerificationRequest({
    //   //   identifier: email,
    //   //   url,
    //   //   provider: { server, from },
    //   // }) {
    //   //   const { host } = new URL(url);
    //   //   const transport = nodemailer.createTransport(server);
    //   //   await transport.sendMail({
    //   //     to: email,
    //   //     from,
    //   //     subject: `Sign in to ${host}`,
    //   //     text: { url, host },
    //   //     html: { url, host, email },
    //   // });
    //   // },
    // }),
  ],
  pages: {
    signIn: "/sign-in",
    // verifyRequest: "/verify-request",
  },
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.uid;
      }
      return session;
    },

    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
  },
};
export default NextAuth(authOptions);
