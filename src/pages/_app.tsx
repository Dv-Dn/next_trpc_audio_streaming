// src/pages/_app.tsx
import { withTRPC } from "@trpc/next";
import type { AppRouter } from "../server/router";
import type { AppType } from "next/dist/shared/lib/utils";
import superjson from "superjson";

import {
  getSession,
  SessionProvider,
  signIn,
  useSession,
} from "next-auth/react";
import "../styles/globals.css";
import { GetServerSideProps } from "next";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { DefaultLayout } from "@/layouts/DefaultLayout";

const MyApp: AppType = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const router = useRouter();

  if (router.asPath === "/sign-in")
    return (
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    );

  return (
    <SessionProvider session={session}>
      <DefaultLayout>
        <Component {...pageProps} />
      </DefaultLayout>
    </SessionProvider>
  );
};

const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    return "";
  }
  if (process.browser) return ""; // Browser should use current path
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url

  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

export default withTRPC<AppRouter>({
  config({ ctx }) {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    const url = `${getBaseUrl()}/api/trpc`;

    return {
      url,
      transformer: superjson,
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */

      queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: false,
})(MyApp);
