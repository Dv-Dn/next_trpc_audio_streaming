import { FormText, FormDropZone, FormSelect } from "@/components/base";
import { useInput } from "@/hooks";
import { DefaultLayout } from "@/layouts/DefaultLayout";
import { ReactElement, useState } from "react";
import { trpc } from "@/utils/trpc";
import { Genre } from "@prisma/client";
import { getAuthSession } from "@/server/common/getServerSession";
import { GetServerSidePropsContext } from "next";

import { useSession } from "next-auth/react";
import { useLoader } from "@/store/loading";

// TODO: add validation
// add error handling

const Add = () => {
  const { data: session } = useSession();

  const setLoading = useLoader((state) => state.setLoading);

  const trackName = useInput("");

  const trackYear = useInput("");

  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);

  const genres = trpc.useQuery(["genre.get-all"], {
    onSuccess(data) {
      data[0] && setSelectedGenre(data[0]);
    },
  });

  const addTrack = trpc.useMutation(["track.add-track"]);

  async function submit() {
    if (!session?.user || !audioFile) {
      return;
    }
    //
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", audioFile);

      const fileRes = await fetch("/api/file/upload", {
        method: "POST",
        body: formData,
      });
      const { fileUrl } = await fileRes.json();

      await addTrack.mutateAsync({
        name: trackName.value,
        url: fileUrl,
        genreId: selectedGenre?.id,
        year: Number(trackYear.value),
      });

      setLoading(false);
    } catch (error) {
      // TODO: add error handling
      console.log(error);
    }
  }

  return (
    <div className="container flex h-full w-full flex-col items-center justify-center">
      <div
        className="w-full max-w-2xl space-y-4 rounded-md p-4 shadow-lg"
        role="form"
      >
        <h2 className="text-center text-xl">Add track</h2>

        <FormText {...trackName} label="Track name" />

        <FormText {...trackYear} label="Track year" />

        {selectedGenre && (
          <FormSelect value={selectedGenre?.name}>
            {genres.data &&
              genres.data.map((genre, index) => (
                <li
                  value={genre.id}
                  key={genre.id}
                  onClick={() => setSelectedGenre(genre)}
                >
                  {genre.name}
                </li>
              ))}
          </FormSelect>
        )}
        <FormDropZone setFile={setAudioFile} />

        <button onClick={submit} className="w-full border border-black p-2">
          Submit
        </button>
      </div>
    </div>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getAuthSession(ctx);

  if (!session?.user)
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

export default Add;
