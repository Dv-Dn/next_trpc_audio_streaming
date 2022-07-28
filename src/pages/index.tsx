import { DefaultLayout } from "@/layouts/DefaultLayout";
import { FileMusic } from "tabler-icons-react";

import { SoundCard } from "@/components/base/SoundCard";
import Link from "next/link";
import { getAuthSession } from "@/server/common/getServerSession";
import { GetServerSidePropsContext } from "next";
import { trpc } from "@/utils/trpc";
import { usePlayerStore } from "@/store/playerStore";
import { ReactElement, useEffect } from "react";

const Index = () => {
  const tracks = trpc.useQuery(["track.get-all"]);

  const setTrack = usePlayerStore((store) => store.setTrack);

  return (
    <div className="container">
      <div className="mb-12 flex items-center justify-between text-2xl">
        <div>Track List</div>
        <Link href="/add-track">
          <a className="uration-250 flex  items-center  gap-2  text-lg uppercase  transition-[colors,transform] hover:text-primary active:scale-90">
            <FileMusic />
            add track
          </a>
        </Link>
      </div>
      {tracks.data?.length && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {tracks.data.map((track) => (
            <SoundCard
              key={track.id}
              onClick={() => setTrack(track)}
              name={track.name}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getAuthSession(ctx);

  if (!session)
    return {
      redirect: {
        destination: "/sign-in",
        permanent: false,
      },
    };

  return {
    props: {
      session,
    },
  };
};

export default Index;
