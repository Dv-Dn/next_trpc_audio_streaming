import {
  signIn,
  getProviders,
  useSession,
  ClientSafeProvider,
} from "next-auth/react";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { useEffect, useState } from "react";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/router";
import { getAuthSession } from "@/server/common/getServerSession";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getAuthSession(ctx);
  const providers = await getProviders();

  if (session?.user)
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };

  return {
    props: {
      session,
      providers,
    },
  };
};
const SignIn = ({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  // const { data: session, status } = useSession();

  return (
    <div className="h-screen">
      <div className="h-full px-6 text-gray-800">
        <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between xl:justify-center">
          <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="w-full"
              alt="Phone image"
            />
          </div>
          <div className="mb-12 max-w-md md:mb-0 md:w-8/12 lg:w-5/12 xl:ml-20 xl:w-5/12">
            <div className="flex flex-col items-center justify-center lg:justify-start">
              <p className="mb-6 text-xl">Choose prefer provider</p>
              {Object.values(providers as ClientSafeProvider[]).map(
                (provider) => (
                  <button
                    onClick={() => signIn(provider.id)}
                    key={provider.name}
                    className="mb-3 flex w-full items-center justify-center rounded bg-primary px-7 py-3 text-sm font-medium uppercase leading-snug text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
                  >
                    Sign in with {provider.name}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
