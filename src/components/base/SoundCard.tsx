import Image from "next/image";
import { PlayerPlay } from "tabler-icons-react";

interface SoundCardProps {
  onClick: () => void;
  name: string;
  author?: string;
  duration?: number;
  auditions?: number;
  image?: string;
}

export const SoundCard = ({
  auditions,
  author,
  duration,
  name,
  onClick,
  image,
}: SoundCardProps) => {
  return (
    <div className="group flex h-20 items-center overflow-hidden rounded-lg shadow-md">
      <button
        className="duration 250 relative h-full w-20 overflow-hidden transition-transform ease-in active:scale-50 active:rounded-full"
        onClick={onClick}
      >
        <div
          className="absolute left-0 bottom-0 top-0 right-0 flex
        items-center justify-center bg-primary opacity-0
        transition-opacity duration-300 ease-in
        group-hover:opacity-100"
        >
          <PlayerPlay width={45} height={45} fill="white" color="transparent" />
        </div>
        <Image
          src={image || "/images/audio_placeholder.png"}
          className="transition-opacity duration-300 ease-in group-hover:opacity-0"
          alt="audio"
          width={80}
          height={80}
        />
      </button>
      <div className="flex p-2">
        <div>
          {author && <h5>{author}</h5>}

          {name && <p> {name}</p>}
        </div>
        <div>
          {duration && <div> {duration}</div>}
          {auditions && <div> {auditions} auditions</div>}
        </div>
      </div>
    </div>
  );
};
